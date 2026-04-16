"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  getExamResults,
  getViolationsByExamApi,
  getMyExamsApi,
} from "@/lib/api";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, AlertTriangle, BarChart3, Settings } from "lucide-react";

export default function AssessmentOverviewPage() {
  const { examId } = useParams();

  const [results, setResults] = useState<any[]>([]);
  const [violations, setViolations] = useState<any[]>([]);
  const [exam, setExam] = useState<any>(null);

  useEffect(() => {
    if (!examId) return;

    getExamResults(examId as string).then((res) => setResults(res.data));

    getViolationsByExamApi(examId as string).then((res) =>
      setViolations(res.data),
    );

    getMyExamsApi().then((res) => {
      const found = res.data.find((e: any) => e.id === examId);
      setExam(found);
    });
  }, [examId]);

  const avgScore =
    results.length > 0
      ? Math.round(
          results.reduce((sum, r) => sum + r.score, 0) / results.length,
        )
      : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{exam?.title || "Assessment"}</h1>
          <p className="text-muted-foreground text-sm">ID: {examId}</p>
        </div>
        <Button>Edit</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex justify-between flex-row">
            <CardTitle>Total Candidates</CardTitle>
            <Users className="h-4 w-4" />
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {results.length}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between flex-row">
            <CardTitle>Violations</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent className="text-3xl font-bold text-yellow-500">
            {violations.length}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between flex-row">
            <CardTitle>Average Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent className="text-3xl font-bold text-green-500">
            {avgScore}%
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between flex-row">
            <CardTitle>Status</CardTitle>
            <Settings className="h-4 w-4" />
          </CardHeader>
          <CardContent className="text-lg font-medium">
            {exam?.status || "N/A"}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
