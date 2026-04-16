"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getMyExamsApi } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui-elements/recruiterDash/StatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, ArrowRight } from "lucide-react";

export default function InstitutionExamsPage() {
  const [exams, setExams] = useState<any[]>([]);

  useEffect(() => {
    getMyExamsApi().then((res) => setExams(res.data));
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Exams</h1>
          <p className="text-muted-foreground text-sm">
            Manage all exams conducted by your institution
          </p>
        </div>

        <Button asChild>
          <Link href="/issuer-dashboard/institution/create-exam">
            <Plus className="h-4 w-4 mr-2" />
            Create Exam
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Exams</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Exam ID</TableHead>
                <TableHead>Submissions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Scheduled</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {exams.map((exam) => (
                <TableRow key={exam.id}>
                  <TableCell className="font-medium">{exam.title}</TableCell>
                  <TableCell>#{exam.id}</TableCell>

                  <TableCell>
                    {exam.submissions?.submitted}/{exam.submissions?.total}
                  </TableCell>

                  <TableCell>
                    <StatusBadge status={exam.status} />
                  </TableCell>

                  <TableCell>
                    {exam.scheduledOn
                      ? new Date(exam.scheduledOn).toLocaleDateString()
                      : "-"}
                  </TableCell>

                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link
                        href={`/issuer-dashboard/institution/exams/${exam.id}`}
                      >
                        Open <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
