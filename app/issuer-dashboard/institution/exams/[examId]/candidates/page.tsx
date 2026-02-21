"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Plus, Search } from "lucide-react";

type Student = {
  id: string;
  name: string;
  email: string;
  score: number | null;
  status: "completed" | "in-progress" | "pending";
};

const exam = {
  id: "EX1024",
  mode: "bulk", // bulk | manual
};

const students: Student[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    score: 82,
    status: "completed",
  },
];

export default function StudentsPage() {
  const isBulk = exam.mode === "bulk";

  const getStatusBadge = (status: Student["status"]) => {
    switch (status) {
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
      case "in-progress":
        return <Badge variant="outline">In Progress</Badge>;
      case "pending":
        return <Badge variant="destructive">Pending</Badge>;
    }
  };

  const hasStudents = useMemo(() => students.length > 0, []);

  return (
    <div className="space-y-6">
    
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Students</h2>
          <p className="text-muted-foreground text-sm">
            Manage and monitor students appearing for this exam
          </p>
        </div>

        <div className="flex gap-2">
          {isBulk ? (
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Import Students
            </Button>
          ) : (
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
          )}
        </div>
      </div>

   
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search students..." className="pl-9" />
      </div>

    
      <div className="rounded-2xl border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {hasStudents ? (
              students.map((student) => (
                <TableRow
                  key={student.id}
                  className="hover:bg-muted/50 transition"
                >
                  <TableCell className="font-medium">{student.name}</TableCell>

                  <TableCell>{student.email}</TableCell>

                  <TableCell>
                    {student.score !== null ? `${student.score}%` : "-"}
                  </TableCell>

                  <TableCell>{getStatusBadge(student.status)}</TableCell>

                  <TableCell className="text-right">
                    <Link
                      href={`/issuer-dashboard/institution/exams/${exam.id}/candidates/${student.id}`}
                    >
                      <Button size="sm" variant="ghost">
                        View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-12 text-muted-foreground"
                >
                  No students added yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
