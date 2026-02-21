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
import { examStore } from "@/lib/examStore";

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

  const isNextDisabled = currentStep === 1 && !step1Form.formState.isValid;
  const isPublishStep = currentStep === 4;

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
    setTimeout(() => router.push(redirectPath), 800);
  };

  const handleSaveDraft = () => {
    const draftData = {
      ...examData,
      ...step1Form.getValues(),
    };

    examStore.saveDraft(draftData);
    toast.success("Draft saved successfully");

    setTimeout(() => router.push(redirectPath), 800);
  };

  const handlePublish = () => {
    const finalExamData: ExamData = {
      ...step1Form.getValues(),
      questions: examData.questions,
    };

    examStore.publish(finalExamData);
    toast.success(
      role === "institution"
        ? "Institutional exam published"
        : "Exam published successfully",
    );

    setTimeout(() => router.push(redirectPath), 800);
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
      onPublish={isPublishStep ? handlePublish : undefined}
      isNextDisabled={isNextDisabled}
    >
      {currentStep === 1 && <Step1Settings form={step1Form} />}
      {currentStep === 2 && (
        <Step2Questions examData={examData} setExamData={setExamData} />
      )}
      {currentStep === 3 && (
        <Step3Preview
          examData={{
            ...step1Form.getValues(),
            questions: examData.questions,
          }}
        />
      )}
      {currentStep === 4 && <Step4Publish />}
    </WizardLayout>
  );
}
