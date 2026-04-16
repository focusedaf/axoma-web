"use client";

import { useEffect, useState } from "react";
import { getMyExamsApi } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BarChart3, AlertTriangle } from "lucide-react";

export default function RecruiterDashboardPage() {
  const [stats, setStats] = useState({
    exams: 0,
    candidates: 0,
    violations: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMyExamsApi();
      const exams = res.data;

      let totalCandidates = 0;
      let totalViolations = 0;

      exams.forEach((exam: any) => {
        totalCandidates += exam.candidates?.length || 0;
        totalViolations += exam.violations?.length || 0;
      });

      setStats({
        exams: exams.length,
        candidates: totalCandidates,
        violations: totalViolations,
      });
    };

    fetchData();
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Total Assessments</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">{stats.exams}</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Candidates</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold text-green-500">
          {stats.candidates}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Violations</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold text-yellow-500">
          {stats.violations}
        </CardContent>
      </Card>
    </div>
  );
}
