"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GradeExamPage() {
  const params = useParams();
  const examId = params.examId as string;

  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get(`/results/exam/${examId}`);
        setResults(res.data);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, [examId]);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Submissions</h1>

      {results.length === 0 ? (
        <p>No submissions yet</p>
      ) : (
        results.map((r) => (
          <Card key={r.id} className="mb-4">
            <CardHeader>
              <CardTitle>Candidate: {r.candidateId}</CardTitle>
            </CardHeader>
            <CardContent>
              <pre>{JSON.stringify(r.answers, null, 2)}</pre>
              <p>Score: {r.score}</p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
