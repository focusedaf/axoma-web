"use client";

import { useEffect, useState } from "react";
import { getExamResults } from "@/lib/api";
import { useParams } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResultsPage() {
  const { examId } = useParams();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (!examId) return;

    getExamResults(examId as string).then((res) => {
      setData(res.data);
    });
  }, [examId]);

  const passed = data.filter((r) => r.score >= 50).length;
  const failed = data.filter((r) => r.score < 50).length;
  const pending = data.length === 0 ? 0 : 0; // you can enhance later

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Passed</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold text-green-500">
          {passed}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Failed</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold text-red-500">
          {failed}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Attempts</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">{data.length}</CardContent>
      </Card>
    </div>
  );
}
