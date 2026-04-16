"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  getExamResults,
  getViolationsByExamApi,
  gradeResultApi,
} from "@/lib/api";

export default function StudentDetailPage() {
  const { examId, candidateId } = useParams();

  const [result, setResult] = useState<any>(null);
  const [violations, setViolations] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // get all results
        const res = await getExamResults(examId as string);

        const found = res.data.find((r: any) => r.candidateId === candidateId);

        setResult(found);

        //  get violations
        const vio = await getViolationsByExamApi(examId as string);

        const filtered = vio.data.filter(
          (v: any) => v.candidateId === candidateId,
        );

        setViolations(filtered);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [examId, candidateId]);

  if (!result) return <div className="p-6">Loading...</div>;

  const candidate = result.candidate;

  const handleGrade = async (score: number) => {
    await gradeResultApi(result.id, score);
    setResult({ ...result, score });
  };

  const risk =
    violations.length >= 3
      ? "High"
      : violations.length === 2
        ? "Moderate"
        : "Low";

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            {candidate?.firstName} {candidate?.lastName}
          </h1>
          <p className="text-muted-foreground text-sm">{candidate?.email}</p>
        </div>

        <Badge variant={result.score ? "secondary" : "destructive"}>
          {result.score ? "Completed" : "Pending"}
        </Badge>
      </div>

      {/* STATS */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Score</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-green-500">
            {result.score !== null ? `${result.score}%` : "-"}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Integrity Risk</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-yellow-500">
            {risk}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Violations</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {violations.length}
          </CardContent>
        </Card>
      </div>

      {/* VIOLATIONS */}
      <Card>
        <CardHeader>
          <CardTitle>Academic Integrity Flags</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 text-sm">
          {violations.length === 0 && (
            <p className="text-muted-foreground">No violations</p>
          )}

          {violations.map((v, i) => (
            <div key={i}>
              <div className="flex justify-between">
                <span>{v.type}</span>
                <Badge
                  variant={v.severity === "high" ? "destructive" : "outline"}
                >
                  {v.severity}
                </Badge>
              </div>
              <Separator className="my-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ACTIONS */}
      <div className="flex gap-4">
        <Button onClick={() => handleGrade(100)}>Mark as Valid</Button>

        <Button variant="destructive" onClick={() => handleGrade(0)}>
          Disqualify Attempt
        </Button>
      </div>
    </div>
  );
}
