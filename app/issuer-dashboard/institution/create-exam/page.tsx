"use client";

import { ExamBuilder } from "@/components/ui-elements/exam-builder/examBuilder";

export default function CreateInstitutionExamPage() {
  return (
    <ExamBuilder role="institution" redirectPath="/issuer-dashboard/institution" />
  );
}
