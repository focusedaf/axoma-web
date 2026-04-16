"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getExamResults, gradeResultApi } from "@/lib/api";

export default function GradeExamPage() {
  const { examId } = useParams();
  const [results, setResults] = useState<any[]>([]);
  const [scores, setScores] = useState<Record<string, number>>({});

  useEffect(() => {
    async function load() {
      const res = await getExamResults(String(examId));
      setResults(res.data);
    }
    load();
  }, [examId]);

  const handleGrade = async (id: string) => {
    await gradeResultApi(id, scores[id] || 0);
    alert("Graded");
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Submissions</h1>

      {results.map((r) => (
        <Card key={r.id}>
          <CardHeader>
            <CardTitle>
              {r.candidate.firstName} {r.candidate.lastName}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <pre className="text-xs bg-muted p-3 rounded">
              {JSON.stringify(r.answers, null, 2)}
            </pre>

            <div className="flex gap-3">
              <Input
                type="number"
                placeholder="Score"
                value={scores[r.id] || ""}
                onChange={(e) =>
                  setScores((p) => ({
                    ...p,
                    [r.id]: Number(e.target.value),
                  }))
                }
              />

              <Button onClick={() => handleGrade(r.id)}>Submit Score</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
