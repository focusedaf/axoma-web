"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type Violation = {
  id: string;
  student: string;
  warnings: number;
  issues: string[];
  status: "completed" | "terminated";
};

const violations: Violation[] = [
  {
    id: "1",
    student: "John Doe",
    warnings: 3,
    issues: ["Multiple faces detected", "Looking away repeatedly"],
    status: "terminated",
  },
  {
    id: "2",
    student: "Jane Smith",
    warnings: 2,
    issues: ["Tab switching", "Window focus lost"],
    status: "completed",
  },
];

const getStatusBadge = (status: Violation["status"]) => {
  return status === "terminated" ? (
    <Badge variant="destructive">Session Terminated</Badge>
  ) : (
    <Badge variant="secondary">Completed</Badge>
  );
};

export default function InstitutionViolationsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Exam Integrity Log</h1>
        <p className="text-sm text-muted-foreground">
          Auto-enforced proctor events
        </p>
      </div>

      {violations.map((item) => (
        <Card key={item.id}>
          <CardHeader className="flex justify-between items-center">
            <CardTitle>{item.student}</CardTitle>
            {getStatusBadge(item.status)}
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Total Warnings</span>
              <span className="font-medium">{item.warnings}/3</span>
            </div>

            <Separator />

            <div className="space-y-2 text-sm">
              <p className="font-medium">Detected Events</p>
              {item.issues.map((issue, idx) => (
                <p key={idx} className="text-muted-foreground">
                  • {issue}
                </p>
              ))}
            </div>

            <div className="text-xs text-muted-foreground pt-2">
              Enforcement handled automatically by proctor engine.
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
