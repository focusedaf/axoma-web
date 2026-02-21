"use client";
import React from "react";
import { ExamStepper } from "../ui-elements/exam-builder/examStepper";
import { ExamHeader } from "../ui-elements/exam-builder/examHeader";
import { Button } from "@/components/ui/button";

interface WizardLayoutProps {
  role: "professor" | "institution";
  currentStep: number;
  steps: { id: number; name: string }[];
  onNext: () => void;
  onBack: () => void;
  onPublish?: () => void;
  onCancel?: () => void;
  onSaveDraft?: () => void;
  children: React.ReactNode;
  isNextDisabled?: boolean;
  isPrevDisabled?: boolean;
  nextButtonLabel?: string;
  prevButtonLabel?: string;
}

export function WizardLayout({
  role,
  currentStep,
  steps,
  onNext,
  onBack,
  onPublish,
  onCancel,
  onSaveDraft,
  children,
  isNextDisabled = false,
  isPrevDisabled = false,
  nextButtonLabel,
  prevButtonLabel,
}: WizardLayoutProps) {
  return (
    <div className="container mx-auto max-w-7xl p-8 space-y-6">
      <ExamHeader
        role={role}
        currentStep={currentStep}
        onBack={onBack}
        onCancel={onCancel}
        onSaveDraft={onSaveDraft}
        onPublish={onPublish}
      />

      <ExamStepper currentStep={currentStep} />

      <div className="mt-8">{children}</div>

      <div className="flex justify-end gap-2 mt-4">
        {currentStep > 1 && (
          <Button onClick={onBack} disabled={isPrevDisabled}>
            {prevButtonLabel || "Prev"}
          </Button>
        )}

        {currentStep < steps.length && (
          <Button onClick={onNext} disabled={isNextDisabled}>
            {nextButtonLabel || "Next"}
          </Button>
        )}
      </div>
    </div>
  );
}
