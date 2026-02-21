"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ViolationRecord = {
  id: string;
  student: string;
  exam: string;
  warnings: number;
  status: "completed" | "terminated";
};

const records: ViolationRecord[] = [
  {
    id: "1",
    student: "John Doe",
    exam: "Chemistry Mid Term",
    warnings: 3,
    status: "terminated",
  },
  {
    id: "2",
    student: "Jane Smith",
    exam: "Physics Quiz",
    warnings: 1,
    status: "completed",
  },
];

const getStatusBadge = (status: ViolationRecord["status"]) => {
  return status === "terminated" ? (
    <Badge variant="destructive">Terminated</Badge>
  ) : (
    <Badge variant="secondary">Completed</Badge>
  );
};

export default function GlobalInstitutionViolationsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Integrity Overview</h1>
      <p className="text-sm text-muted-foreground">
        Auto-enforced proctor logs across all assessments
      </p>

      {records.map((item) => (
        <Card key={item.id}>
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="font-medium">{item.student}</p>
              <p className="text-sm text-muted-foreground">{item.exam}</p>
              <p className="text-xs text-muted-foreground">
                {item.warnings}/3 warnings issued
              </p>
            </div>
            {getStatusBadge(item.status)}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
