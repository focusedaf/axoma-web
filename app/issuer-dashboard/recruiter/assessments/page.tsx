"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getMyExamsApi } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function AssessmentsPage() {
  const [exams, setExams] = useState<any[]>([]);

  useEffect(() => {
    getMyExamsApi().then((res) => setExams(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Assessments</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {exams.map((exam) => (
            <TableRow key={exam.id}>
              <TableCell>{exam.title}</TableCell>
              <TableCell>{exam.id}</TableCell>
              <TableCell>{exam.status}</TableCell>

              <TableCell>
                <Link
                  href={`/issuer-dashboard/recruiter/assessments/${exam.id}`}
                >
                  <Button size="sm">Open</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
