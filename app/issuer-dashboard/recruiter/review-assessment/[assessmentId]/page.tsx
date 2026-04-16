"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { getExamResults, gradeResultApi } from "@/lib/api";

export default function AssessmentResultsPage() {
  const { examId } = useParams();

  const [results, setResults] = useState<any[]>([]);
  const [scores, setScores] = useState<Record<string, number>>({});

  const load = async () => {
    const res = await getExamResults(String(examId));
    setResults(res.data);
  };

  useEffect(() => {
    if (examId) load();
  }, [examId]);

  const handleSubmitScore = async (resultId: string) => {
    await gradeResultApi(resultId, scores[resultId] || 0);
    await load();
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Assessment Review</h1>

      {results.map((r) => (
        <Card key={r.id}>
          <CardHeader>
            <CardTitle>
              {r.candidate?.firstName} {r.candidate?.lastName}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {r.candidate?.email}
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Lightweight view (NOT full grading) */}
            <div className="text-xs bg-muted p-3 rounded overflow-auto max-h-40">
              {JSON.stringify(r.answers, null, 2)}
            </div>

            <div className="flex items-center gap-3">
              <Input
                type="number"
                placeholder="Score"
                value={scores[r.id] ?? ""}
                onChange={(e) =>
                  setScores((prev) => ({
                    ...prev,
                    [r.id]: Number(e.target.value),
                  }))
                }
              />

              <Button onClick={() => handleSubmitScore(r.id)}>
                Submit Assessment
              </Button>
            </div>

            {r.score !== null && r.score !== undefined && (
              <p className="text-sm text-green-600">Current Score: {r.score}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
