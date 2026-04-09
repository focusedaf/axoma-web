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
import { createExamApi, saveDraftExamApi, getDraftByIdApi } from "@/lib/api";
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

  const step1Form = useForm<SettingsData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: defaultExamData,
    mode: "onChange",
  });

  const switchToSepolia = async () => {
    if (!(window as any).ethereum) return;

    try {
      await (window as any).ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xaa36a7" }], // Sepolia
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
      } else {
        throw err;
      }
    }
  };

  useEffect(() => {
    if (!draftId || hasLoadedDraft.current) return;

    const loadDraft = async () => {
      try {
        hasLoadedDraft.current = true;
        setLoadingDraft(true);

        const res = await getDraftByIdApi(draftId);
        const draft = res.data;

        const parsed: ExamData = {
          title: draft.title || "",
          duration: draft.duration?.toString() || "",
          scheduledOn: draft.scheduledOnDraft || "",
          instructions: draft.instructions || "",
          questions: draft.questions || [],
          examType: draft.examType || "mcq",
        };

        setExamData(parsed);
        step1Form.reset(parsed);

        toast.success("Draft loaded");
      } catch (err) {
        console.error(err);
        toast.error("Failed to load draft");
      } finally {
        setLoadingDraft(false);
      }
    };

    loadDraft();
  }, [draftId]);

  useEffect(() => {
    if (currentStep === 1) {
      step1Form.reset(examData);
    }
  }, [currentStep, examData]);

  const handleNext = async () => {
    if (currentStep === 1) {
      const isValid = await step1Form.trigger();

      if (!isValid) {
        toast.error("Fill required fields");
        return;
      }

      const values = step1Form.getValues();

      setExamData((prev) => ({
        ...prev,
        ...values,
        questions: prev.questions,
      }));
    }

    setCurrentStep((p) => p + 1);
  };

  const handleBack = () => {
    if (currentStep === 2) {
      const values = step1Form.getValues();

      setExamData((prev) => ({
        ...prev,
        ...values,
        questions: prev.questions,
      }));
    }

    setCurrentStep((p) => p - 1);
  };

  const handleSaveDraft = async () => {
    try {
      const values = step1Form.getValues();

      const payload = {
        id: draftId || undefined,
        title: values.title,
        duration: values.duration,
        scheduledOn: values.scheduledOn,
        instructions: values.instructions,
        questions: examData.questions,
        examType: examData.examType,
      };

      await saveDraftExamApi(payload);

      toast.success(draftId ? "Draft updated" : "Draft saved");

      router.push(`${redirectPath}/drafts`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save draft");
    }
  };

  const handlePublish = async () => {
    try {
      if (!(window as any).ethereum) {
        toast.error("MetaMask not found");
        return;
      }

      await switchToSepolia();

      const contractAddress = process.env.NEXT_PUBLIC_EXAM_REGISTRY_ADDRESS;

      if (!contractAddress) {
        toast.error("Contract address missing");
        return;
      }

      const values = step1Form.getValues();

      const finalData = {
        ...examData,
        ...values,
      };

      const provider = new ethers.BrowserProvider((window as any).ethereum);

      const network = await provider.getNetwork();
      if (network.chainId !== 11155111n) {
        toast.error("Please switch to Sepolia network");
        return;
      }

      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        contractAddress,
        ExamRegistryABI,
        signer,
      );

      const res = await createExamApi({
        title: finalData.title,
        duration: Number(finalData.duration),
        scheduledOn: finalData.scheduledOn,
        questions: finalData.questions,
        draftId,
      });

      const { cid } = res.data;

      const tx = await contract.publishExam(cid);
      await tx.wait();

      toast.success("Published successfully");
      router.push(redirectPath);
    } catch (err) {
      console.error(err);
      toast.error("Publish failed");
    }
  };

  if (loadingDraft) {
    return <div className="p-6 text-muted-foreground">Loading draft...</div>;
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
    >
      {currentStep === 1 && <Step1Settings form={step1Form} />}

      {currentStep === 2 && (
        <Step2Questions examData={examData} setExamData={setExamData} />
      )}

      {currentStep === 3 && <Step3Preview examData={examData} />}

      {currentStep === 4 && <Step4Publish />}
    </WizardLayout>
  );
}
