"use client";

import { useEffect, useState } from "react";
import { getExamResults } from "@/lib/api";
import { useParams } from "next/navigation";

export default function CandidatesPage() {
  const { examId } = useParams();
  const [candidates, setCandidates] = useState<any[]>([]);

  useEffect(() => {
    getExamResults(examId as string).then((res) => {
      setCandidates(res.data);
    });
  }, [examId]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Candidates</h2>

      {candidates.map((c) => (
        <div key={c.id} className="border p-4 rounded mb-2">
          <p>
            {c.candidate.firstName} {c.candidate.lastName}
          </p>
          <p>{c.candidate.email}</p>
          <p>Score: {c.score ?? "Not graded"}</p>
        </div>
      ))}
    </div>
  );
}
