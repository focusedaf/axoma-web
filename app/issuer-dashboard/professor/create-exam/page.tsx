"use client";

import { ExamBuilder } from "@/components/ui-elements/exam-builder/examBuilder";

export default function CreateProfessorExamPage() {
  return <ExamBuilder role="professor" redirectPath="/issuer-dashboard/professor" />;
}
