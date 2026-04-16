"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getViolationsByExamApi } from "@/lib/api";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function RecruiterViolationsPage() {
  const { examId } = useParams();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (!examId) return;

    getViolationsByExamApi(examId as string).then((res) => setData(res.data));
  }, [examId]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Integrity Report</h1>

      {data.map((v) => (
        <Card key={v.id}>
          <CardHeader className="flex justify-between">
            <CardTitle>{v.candidate?.email}</CardTitle>
            <Badge variant="destructive">{v.severity}</Badge>
          </CardHeader>

          <CardContent className="text-sm">
            <p>Type: {v.type}</p>
            <p className="text-muted-foreground">
              {JSON.stringify(v.metadata)}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
