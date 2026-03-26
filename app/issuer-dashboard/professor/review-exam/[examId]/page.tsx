"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getExamResults } from "@/lib/api";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function GradeExamPage() {
  const params = useParams();
  const examId = params.examId as string;

  const [results, setResults] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;

  useEffect(() => {
    async function loadResults() {
      try {
        const res = await getExamResults(examId);
        setResults(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    loadResults();
  }, [examId]);

  const totalPages = Math.ceil(results.length / PAGE_SIZE);
  const paginated = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Submissions</h1>

      {paginated.length === 0 ? (
        <p>No submissions yet</p>
      ) : (
        paginated.map((r) => (
          <Card key={r.id} className="mb-4">
            <CardHeader>
              <CardTitle>Candidate: {r.candidate.email}</CardTitle>
            </CardHeader>
            <CardContent>
              <pre>{JSON.stringify(r.answers, null, 2)}</pre>
              <p>Score: {r.score}</p>
            </CardContent>
          </Card>
        ))
      )}

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
