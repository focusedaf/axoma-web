"use client";

import { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getMyExamsApi } from "@/lib/api";

export type ReviewExams = {
  id: string;
  title: string;
  course: string;
  conductedOn: Date;
  submissions: { submitted: number; total: number };
  status: "Grading Complete" | "Pending Grading";
};

const PAGE_SIZE = 5;

export function ReviewExamTable() {
  const [exams, setExams] = useState<ReviewExams[]>([]);
  const [page, setPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    async function loadExams() {
      try {
        const res = await getMyExamsApi();
        const examList = res?.data?.exams ?? [];

        // ⚡ Show ALL exams, no filtering on published
        setExams(
          examList.map((exam: any) => ({
            id: exam.id,
            title: exam.title,
            course: exam.course || "General",
            conductedOn: new Date(exam.scheduledOn),
            submissions: {
              submitted: exam.submissions?.submitted ?? 0,
              total: exam.submissions?.total ?? 0,
            },
            status:
              exam.status === "Completed"
                ? "Grading Complete"
                : "Pending Grading",
          })),
        );
      } catch (err) {
        console.error(err);
        setExams([]);
      }
    }
    loadExams();
  }, []);

  const totalPages = Math.max(1, Math.ceil(exams.length / PAGE_SIZE));
  const paginated = exams.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function formatConductedOn(date: Date) {
    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  function getStatusVariant(status: ReviewExams["status"]) {
    return status === "Grading Complete" ? "default" : "secondary";
  }

  return (
    <div className="w-full px-8 py-6">
      <h1 className="text-2xl font-semibold mb-6">Review Exams</h1>
      <div className="border rounded-lg overflow-hidden">
        <Table className="text-center">
          <TableHeader>
            <TableRow>
              <TableHead>Exam Title</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Conducted On</TableHead>
              <TableHead>Submissions</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-muted-foreground"
                >
                  No exams found.
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((exam) => (
                <TableRow key={exam.id}>
                  <TableCell>{exam.title}</TableCell>
                  <TableCell>{exam.course}</TableCell>
                  <TableCell>{formatConductedOn(exam.conductedOn)}</TableCell>
                  <TableCell>
                    {exam.submissions.submitted} / {exam.submissions.total}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(exam.status)}>
                      {exam.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex justify-center gap-2">
                    {exam.status === "Pending Grading" ? (
                      <Button
                        size="sm"
                        onClick={() =>
                          router.push(
                            `/issuer-dashboard/professor/review-exam/${exam.id}`,
                          )
                        }
                      >
                        Grade
                      </Button>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            router.push(
                              `/dashboard/professor/review-exam/${exam.id}`,
                            )
                          }
                        >
                          View
                        </Button>
                        <Button
                          size="sm"
                          onClick={() =>
                            toast.success(`Results shared for ${exam.title}`)
                          }
                        >
                          Share Results
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={page === i + 1}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
