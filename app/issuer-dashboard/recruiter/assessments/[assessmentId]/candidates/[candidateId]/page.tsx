"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getExamResults, getViolationsByExamApi } from "@/lib/api";

export default function CandidateDetailPage() {
  const { examId, candidateId } = useParams();

  const [data, setData] = useState<any>(null);
  const [violations, setViolations] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const results = await getExamResults(examId as string);
      const candidate = results.data.find(
        (r: any) => r.candidateId === candidateId,
      );

      setData(candidate);

      const v = await getViolationsByExamApi(examId as string);
      setViolations(v.data.filter((x: any) => x.candidateId === candidateId));
    };

    fetchData();
  }, [examId, candidateId]);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-xl font-bold">
        {data.candidate.firstName} {data.candidate.lastName}
      </h1>

      <p>{data.candidate.email}</p>
      <p>Score: {data.score ?? "Not graded"}</p>

      <h3 className="mt-4 font-semibold">Violations</h3>
      {violations.map((v) => (
        <div key={v.id}>
          {v.type} ({v.severity})
        </div>
      ))}
    </div>
  );
}
