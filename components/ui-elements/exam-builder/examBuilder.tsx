"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  ExamData,
  SettingsData,
  settingsSchema,
  defaultExamData,
} from "@/types/exam";
import { WizardLayout } from "@/components/layout/WizardLayout";
import { Step1Settings } from "./step-1-settings";
import { Step2Questions } from "./step-2-questions";
import { Step3Preview } from "./step-3-preview";
import { Step4Publish } from "./step-4-publish";

import {
  createExamApi,
  saveDraftExamApi,
  getDraftByIdApi,
  markPublishedApi,
} from "@/lib/api";

import { ethers } from "ethers";
import ExamRegistryABI from "@/abi/ExamRegistry.json";

export function ExamBuilder({ role, redirectPath }: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const draftId = searchParams.get("draftId");

  const hasLoadedDraft = useRef(false);

  const [currentStep, setCurrentStep] = useState(1);
  const [examData, setExamData] = useState<ExamData>(defaultExamData);
  const [loadingDraft, setLoadingDraft] = useState(false);

  const [publishing, setPublishing] = useState(false);
  const [walletLoading, setWalletLoading] = useState(false);
  const [txLoading, setTxLoading] = useState(false);

  const step1Form = useForm<SettingsData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: defaultExamData,
    mode: "onChange",
  });

  const canPublish = () => {
    if (!examData.title) return false;
    if (!examData.scheduledOn) return false;

    const start = new Date(examData.scheduledOn).getTime();
    return start > 0;
  };

  const switchToSepolia = async () => {
    if (!(window as any).ethereum) return;

    try {
      await (window as any).ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xaa36a7" }],
      });
    } catch (err: any) {
      if (err.code === 4902) {
        await (window as any).ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0xaa36a7",
              chainName: "Sepolia Testnet",
              nativeCurrency: {
                name: "Sepolia ETH",
                symbol: "ETH",
                decimals: 18,
              },
              rpcUrls: ["https://rpc.sepolia.org"],
              blockExplorerUrls: ["https://sepolia.etherscan.io"],
            },
          ],
        });
      } else throw err;
    }
  };

  useEffect(() => {
    if (!draftId || hasLoadedDraft.current) return;

    const loadDraft = async () => {
      try {
        hasLoadedDraft.current = true;
        setLoadingDraft(true);

        const res = await getDraftByIdApi(draftId);
        const d = res.data;

        const parsed: ExamData = {
          title: d.title || "",
          duration: d.duration?.toString() || "",
          scheduledOn: d.scheduledOnDraft || "",
          instructions: d.instructions || "",
          questions: d.questions || [],
          examType: d.examType || "mcq",
        };

        setExamData(parsed);
        step1Form.reset(parsed);

        toast.success("Draft loaded");
      } catch {
        toast.error("Failed to load draft");
      } finally {
        setLoadingDraft(false);
      }
    };

    loadDraft();
  }, [draftId]);

  const handleNext = async () => {
    if (currentStep === 1) {
      const valid = await step1Form.trigger();
      if (!valid) return toast.error("Fill required fields");

      setExamData((p) => ({ ...p, ...step1Form.getValues() }));
    }

    setCurrentStep((p) => p + 1);
  };

  const handleBack = () => {
    setExamData((p) => ({ ...p, ...step1Form.getValues() }));
    setCurrentStep((p) => p - 1);
  };

  const handleSaveDraft = async () => {
    try {
      const v = step1Form.getValues();

      await saveDraftExamApi({
        id: draftId || undefined,
        title: v.title,
        duration: v.duration,
        scheduledOn: v.scheduledOn,
        instructions: v.instructions,
        questions: examData.questions,
        examType: examData.examType,
      });

      toast.success("Draft saved");
      router.push(`${redirectPath}/drafts`);
    } catch {
      toast.error("Failed to save draft");
    }
  };

  const handlePublish = async () => {
    try {
      if (!canPublish()) {
        toast.error("Invalid exam schedule");
        return;
      }

      if (!(window as any).ethereum) {
        toast.error("MetaMask not found");
        return;
      }

      setPublishing(true);

      setWalletLoading(true);
      await switchToSepolia();
      setWalletLoading(false);

      const contractAddress = process.env.NEXT_PUBLIC_EXAM_REGISTRY_ADDRESS;

      if (!contractAddress) throw new Error("Missing contract");

      const provider = new ethers.BrowserProvider((window as any).ethereum);

      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        contractAddress,
        ExamRegistryABI,
        signer,
      );

      const res = await createExamApi({
        title: examData.title,
        duration: Number(examData.duration),
        scheduledOn: examData.scheduledOn,
        questions: examData.questions,
        draftId,
      });

      const { cid, id } = res.data;

      setTxLoading(true);
      toast.info("Confirm transaction in wallet...");

      const tx = await contract.publishExam(cid);
      await tx.wait();

      setTxLoading(false);

      await markPublishedApi(id, {
        txHash: tx.hash,
        publishedAt: new Date().toISOString(),
      });

      toast.success("Exam published");
      router.push(redirectPath);
    } catch (e) {
      console.error(e);
      toast.error("Publish failed");
    } finally {
      setPublishing(false);
      setWalletLoading(false);
      setTxLoading(false);
    }
  };

  if (loadingDraft) {
    return <div className="p-6">Loading draft...</div>;
  }

  return (
    <WizardLayout
      role={role}
      currentStep={currentStep}
      steps={[
        { id: 1, name: "Settings" },
        { id: 2, name: "Questions" },
        { id: 3, name: "Preview" },
        { id: 4, name: "Publish" },
      ]}
      onNext={handleNext}
      onBack={handleBack}
      onCancel={() => router.push(redirectPath)}
      onSaveDraft={handleSaveDraft}
      onPublish={currentStep === 4 ? handlePublish : undefined}
      isNextDisabled={publishing || walletLoading || txLoading}
    >
      {currentStep === 1 && <Step1Settings form={step1Form} />}
      {currentStep === 2 && (
        <Step2Questions examData={examData} setExamData={setExamData} />
      )}
      {currentStep === 3 && <Step3Preview examData={examData} />}
      {currentStep === 4 && (
        <Step4Publish
          publishing={publishing}
          walletLoading={walletLoading}
          txLoading={txLoading}
        />
      )}
    </WizardLayout>
  );
}
