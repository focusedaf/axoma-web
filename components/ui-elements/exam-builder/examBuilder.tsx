"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ExamData,
  SettingsData,
  settingsSchema,
  defaultExamData,
} from "@/types/exam";
import { WizardLayout } from "@/components/layout/WizardLayout";
import { Step1Settings } from "@/components/ui-elements/exam-builder/step-1-settings";
import { Step2Questions } from "@/components/ui-elements/exam-builder/step-2-questions";
import { Step3Preview } from "@/components/ui-elements/exam-builder/step-3-preview";
import { Step4Publish } from "@/components/ui-elements/exam-builder/step-4-publish";
import { createExamApi, saveDraftExamApi } from "@/lib/api";
import { uploadToIPFS } from "@/lib/ipfs";
import { ethers } from "ethers";
import ExamRegistryABI from "@/abi/ExamRegistry.json";
interface ExamBuilderProps {
  role: "professor" | "institution";
  redirectPath: string;
}

export function ExamBuilder({ role, redirectPath }: ExamBuilderProps) {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const [examData, setExamData] = useState<ExamData>(defaultExamData);

  const step1Form = useForm<SettingsData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: examData,
    mode: "onBlur",
  });

  const handleNext = async () => {
    if (currentStep === 1) {
      const isValid = await step1Form.trigger();
      if (!isValid) return;

      setExamData((prev) => ({ ...prev, ...step1Form.getValues() }));
    }

    setCurrentStep((s) => s + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const handleCancel = () => {
    toast.info("Exam creation canceled");
    router.push(redirectPath);
  };

  const handleSaveDraft = async () => {
    try {
      const payload = {
        ...step1Form.getValues(),
        questions: examData.questions,
        status: "Draft",
      };

      await saveDraftExamApi(payload);

      toast.success("Draft saved");
      router.push(redirectPath);
    } catch {
      toast.error("Failed to save draft");
    }
  };

  const handlePublish = async () => {
    try {
      if (!(window as any).ethereum) {
        toast.error("MetaMask not found");
        return;
      }

      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_EXAM_REGISTRY_ADDRESS!,
        ExamRegistryABI,
        signer,
      );

      const examPayload = {
        title: examData.title,
        duration: examData.duration,
        scheduledOn: examData.scheduledOn,
        questions: examData.questions,
      };

      toast.loading("Uploading exam...");
      const cid = await uploadToIPFS(examPayload);

      toast.loading("Publishing to blockchain...");
      const tx = await contract.publishExam(cid);
      await tx.wait();

      await createExamApi({
        title: examData.title,
        duration: examData.duration,
        scheduledOn: examData.scheduledOn,
        cid,
      });

      toast.success("Exam published successfully");
      router.push(redirectPath);
    } catch (err) {
      console.error(err);
      toast.error("Publish failed");
    }
  };

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
      onCancel={handleCancel}
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
