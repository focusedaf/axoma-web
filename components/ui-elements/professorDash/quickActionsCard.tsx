"use client";

import { FileCheck2, Upload, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export function QuickActionsCard() {
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={() => router.push("/issuer-dashboard/professor/review-exam")}
        >
          <FileCheck2 className="h-4 w-4" />
          Review Pending Submissions
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={() => router.push("/issuer-dashboard/professor/drafts")}
        >
          <Upload className="h-4 w-4" />
          Publish Grades
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={() => router.push("/issuer-dashboard/professor/history")}
        >
          <Clock className="h-4 w-4" />
          Exam History
        </Button>
      </CardContent>
    </Card>
  );
}
