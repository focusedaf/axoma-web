"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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
import { useParams } from "next/navigation";
import { getExamResults } from "@/lib/api";

type Student = {
  id: string;
  name: string;
  email: string;
  score: number | null;
  status: "completed" | "in-progress" | "pending";
};

export default function StudentsPage() {
  const { examId } = useParams();
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await getExamResults(examId as string);

        const mapped = res.data.map((r: any) => ({
          id: r.id,
          name: `${r.candidate?.firstName || ""} ${
            r.candidate?.lastName || ""
          }`,
          email: r.candidate?.email,
          score: r.score,
          status: r.score !== null ? "completed" : "pending",
        }));

        setStudents(mapped);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStudents();
  }, [examId]);

  const filtered = useMemo(() => {
    return students.filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase()),
    );
  }, [students, search]);

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Candidates</h2>
          <p className="text-muted-foreground text-sm">
            Manage candidates appearing for this exam
          </p>
        </div>

        <Button variant="outline">
          <Upload className="h-4 w-4 mr-2" />
          Import Candidates
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search candidates..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
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
            {filtered.length > 0 ? (
              filtered.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>

                  <TableCell>{student.email}</TableCell>

                  <TableCell>
                    {student.score !== null ? `${student.score}%` : "-"}
                  </TableCell>

                  <TableCell>{getStatusBadge(student.status)}</TableCell>

                  <TableCell className="text-right">
                    <Link
                      href={`/issuer-dashboard/institution/exams/${examId}/candidates/${student.id}`}
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
                <TableCell colSpan={5} className="text-center py-10">
                  No candidates found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
