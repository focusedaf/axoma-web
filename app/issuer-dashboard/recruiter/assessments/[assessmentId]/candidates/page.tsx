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

type Candidate = {
  id: string;
  name: string;
  email: string;
  score: number | null;
  status: "completed" | "in-progress" | "pending";
};

const assessment = {
  id: "A1024",
  type: "bulk", //interview n bulk
};

const candidates: Candidate[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    score: 82,
    status: "completed",
  },
];

export default function CandidatesPage() {
  const isBulk = assessment.type === "bulk";

  const getStatusBadge = (status: Candidate["status"]) => {
    switch (status) {
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
      case "in-progress":
        return <Badge variant="outline">In Progress</Badge>;
      case "pending":
        return <Badge variant="destructive">Pending</Badge>;
    }
  };

  const hasCandidates = useMemo(() => candidates.length > 0, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Candidates</h2>
          <p className="text-muted-foreground text-sm">
            Manage and monitor candidates for this assessment
          </p>
        </div>

        <div className="flex gap-2">
          {isBulk ? (
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Upload CSV
            </Button>
          ) : (
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Candidate
            </Button>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search candidates..." className="pl-9" />
      </div>

      {/* Table */}
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
            {hasCandidates ? (
              candidates.map((candidate) => (
                <TableRow
                  key={candidate.id}
                  className="hover:bg-muted/50 transition"
                >
                  <TableCell className="font-medium">
                    {candidate.name}
                  </TableCell>

                  <TableCell>{candidate.email}</TableCell>

                  <TableCell>
                    {candidate.score !== null ? `${candidate.score}%` : "-"}
                  </TableCell>

                  <TableCell>{getStatusBadge(candidate.status)}</TableCell>

                  <TableCell className="text-right">
                    <Link
                      href={`/issuer-dashboard/recruiter/assessments/${assessment.id}/candidates/${candidate.id}`}
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
                  No candidates added yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
