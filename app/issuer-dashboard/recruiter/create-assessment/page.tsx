"use client";

import { ExamBuilder } from "@/components/ui-elements/exam-builder/examBuilder";

export default function CreateAssessmentPage() {
  return (
    <ExamBuilder
      role="recruiter"
      redirectPath="/issuer-dashboard/recruiter/assessments"
    />
  );
}
