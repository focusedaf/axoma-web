"use client";

import { useEffect, useState } from "react";
import {
  ReviewExam,
  type ReviewExams,
} from "@/components/ui-elements/professorDash/reviewExams";
import { getMyExamsApi } from "@/lib/api";

export default function ReviewExamPage() {
  const [exams, setExams] = useState<ReviewExams[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await getMyExamsApi();

        const mapped = res.data.map((exam: any) => ({
          id: exam.id,
          title: exam.title,
          course: "General",
          conductedOn: new Date(exam.scheduledOn),
          submissions: {
            submitted: 0,
            total: 0,
          },
          status: "Pending Grading",
        }));

        setExams(mapped);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <ReviewExam exams={exams} />
    </div>
  );
}
