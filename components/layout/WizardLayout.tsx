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

  // 🔥 NEW (IMPORTANT)
  isPublishing?: boolean;
  publishStage?: "idle" | "wallet" | "tx";
}

function Spinner({ text }: { text?: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <div className="h-4 w-4 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin" />
      {text || "Processing..."}
    </div>
  );
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

  isPublishing = false,
  publishStage = "idle",
}: WizardLayoutProps) {
  const isLastStep = currentStep === steps.length;

  return (
    <div className="container mx-auto max-w-7xl p-8 space-y-6">
      {/* HEADER */}
      <ExamHeader
        role={role}
        currentStep={currentStep}
        onBack={onBack}
        onCancel={onCancel}
        onSaveDraft={onSaveDraft}
        onPublish={onPublish}
      />

      {/* STEPPER */}
      <ExamStepper currentStep={currentStep} />

      {/* CONTENT */}
      <div className="mt-8">{children}</div>

      {/* FOOTER */}
      <div className="flex justify-between items-center mt-6">
        {/* LEFT STATUS */}
        <div>
          {isPublishing && (
            <Spinner
              text={
                publishStage === "wallet"
                  ? "Waiting for MetaMask..."
                  : publishStage === "tx"
                    ? "Confirming transaction..."
                    : "Publishing..."
              }
            />
          )}
        </div>

        {/* BUTTONS */}
        <div className="flex gap-2">
          {/* BACK */}
          {currentStep > 1 && (
            <Button
              type="button"
              onClick={onBack}
              disabled={isPrevDisabled || isPublishing}
              variant="outline"
            >
              {prevButtonLabel || "Prev"}
            </Button>
          )}

          {/* NEXT */}
          {!isLastStep && (
            <Button
              type="button"
              onClick={onNext}
              disabled={isNextDisabled || isPublishing}
            >
              {nextButtonLabel || "Next"}
            </Button>
          )}

          {/* PUBLISH */}
          {isLastStep && onPublish && (
            <Button
              type="button"
              onClick={onPublish}
              disabled={isPublishing}
              className="min-w-[120px]"
            >
              {isPublishing ? "Publishing..." : "Publish"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
