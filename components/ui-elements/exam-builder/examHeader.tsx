"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface ExamHeaderProps {
  currentStep: number;
  role: "professor" | "institution";
  onBack: () => void;
  onCancel?: () => void;
  onSaveDraft?: () => void;
  onPublish?: () => void;
}

export function ExamHeader({
  currentStep,
  role,
  onBack,
  onCancel,
  onSaveDraft,
  onPublish,
}: ExamHeaderProps) {
  const title =
    role === "institution" ? "Create Institutional Exam" : "Create Manual Exam";

  const subtitle =
    role === "institution"
      ? "Create a centralized institutional-level assessment"
      : "Craft a new exam with a modern and intuitive interface";

  return (
    <div className="flex items-center justify-between pb-4 border-b">
      <div className="flex items-center gap-3">
        {currentStep > 1 && (
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      <div className="flex gap-2">
        {onCancel && (
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        {onSaveDraft && (
          <Button variant="secondary" onClick={onSaveDraft}>
            Save Draft
          </Button>
        )}
        {currentStep === 4 && onPublish && (
          <Button onClick={onPublish}>Publish Exam</Button>
        )}
      </div>
    </div>
  );
}
