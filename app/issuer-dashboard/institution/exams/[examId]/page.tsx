"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getExamResults, getViolationsByExamApi } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ExamOverviewPage() {
  const { examId } = useParams();
  const [stats, setStats] = useState({
    total: 0,
    avg: 0,
    violations: 0,
  });

  useEffect(() => {
    const load = async () => {
      const resultsRes = await getExamResults(examId as string);
      const violationsRes = await getViolationsByExamApi(examId as string);

      const results = resultsRes.data;
      const violations = violationsRes.data;

      const avg =
        results.reduce((acc: number, r: any) => acc + r.score, 0) /
        (results.length || 1);

      setStats({
        total: results.length,
        avg: Math.round(avg),
        violations: violations.length,
      });
    };

    load();
  }, [examId]);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Total Submissions</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl">{stats.total}</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Violations</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl text-yellow-500">
          {stats.violations}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Avg Score</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl text-green-500">
          {stats.avg}%
        </CardContent>
      </Card>
    </div>
  );
}
