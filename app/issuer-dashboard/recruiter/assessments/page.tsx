"use client";

import Link from "next/link";
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

const assessments = [
  {
    id: "A1024",
    title: "Frontend Developer Hiring",
    candidates: 128,
    status: "Active",
    createdAt: "Jan 10, 2026",
  },
  {
    id: "A1025",
    title: "Backend Engineer Screening",
    candidates: 86,
    status: "Draft",
    createdAt: "Jan 14, 2026",
  },
  {
    id: "A1026",
    title: "UI/UX Designer Test",
    candidates: 54,
    status: "Closed",
    createdAt: "Jan 02, 2026",
  },
];

export default function AssessmentsPage() {
  return (
    <div className="space-y-8">
     
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Assessments</h1>
          <p className="text-muted-foreground text-sm">
            Manage and monitor all your hiring assessments
          </p>
        </div>

        <Button asChild>
          <Link href="/issuer-dashboard/recruiter/create-assessment">
            <Plus className="h-4 w-4 mr-2" />
            Create Assessment
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Assessments</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Assessment ID</TableHead>
                <TableHead>Candidates</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {assessments.map((assessment) => (
                <TableRow key={assessment.id}>
                  <TableCell className="font-medium">
                    {assessment.title}
                  </TableCell>

                  <TableCell>#{assessment.id}</TableCell>

                  <TableCell>{assessment.candidates}</TableCell>

                  <TableCell>
                    <StatusBadge status={assessment.status} />
                  </TableCell>

                  <TableCell>{assessment.createdAt}</TableCell>

                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link
                        href={`/issuer-dashboard/recruiter/assessments/${assessment.id}`}
                      >
                        Open
                        <ArrowRight className="h-4 w-4 ml-2" />
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

