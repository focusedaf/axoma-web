"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FilePlus, Users, ShieldAlert, BarChart } from "lucide-react";
import { useRouter } from "next/navigation";

export function InstitutionQuickActions() {
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
          onClick={() =>
            router.push("/issuer-dashboard/institution/create-exam")
          }
        >
          <FilePlus className="h-4 w-4" />
          Create New Exam
        </Button>

        <Button variant="outline" className="w-full justify-start gap-2">
          <Users className="h-4 w-4" />
          Upload Candidates
        </Button>

        <Button variant="outline" className="w-full justify-start gap-2">
          <ShieldAlert className="h-4 w-4" />
          Review Violations
        </Button>

        <Button variant="outline" className="w-full justify-start gap-2">
          <BarChart className="h-4 w-4" />
          View Reports
        </Button>
      </CardContent>
    </Card>
  );
}
