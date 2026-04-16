"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getExamResults, gradeResultApi } from "@/lib/api";
import { Button } from "@/components/ui/button";

export default function InstitutionResultsPage() {
  const { examId } = useParams();
  const [results, setResults] = useState<any[]>([]);

  const load = async () => {
    const res = await getExamResults(examId as string);
    setResults(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const grade = async (id: string) => {
    await gradeResultApi(id, 80);
    load();
  };

  return (
    <div>
      <h1 className="text-xl mb-4">Results</h1>

      {results.map((r) => (
        <div key={r.id} className="border p-3 mb-2">
          <p>{r.candidate.email}</p>
          <p>Score: {r.score}</p>

          <Button onClick={() => grade(r.id)}>Grade 80</Button>
        </div>
      ))}
    </div>
  );
}
