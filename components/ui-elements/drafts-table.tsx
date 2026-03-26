"use client";

import { useEffect, useState } from "react";
import { getMyDraftsApi } from "@/lib/api";
import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PAGE_SIZE = 5;

export default function DraftsTable({ basePath }: { basePath: string }) {
  const [drafts, setDrafts] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  const router = useRouter();

  useEffect(() => {
    getMyDraftsApi().then((res) => setDrafts(res.data));
  }, []);

  const totalPages = Math.ceil(drafts.length / PAGE_SIZE);

  const paginated = drafts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="w-full px-8 py-6">
      <h1 className="text-2xl font-semibold mb-6">Draft Exams</h1>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Scheduled</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginated.map((d) => (
              <TableRow key={d.id}>
                <TableCell>{d.title}</TableCell>
                <TableCell>{d.duration} mins</TableCell>
                <TableCell>
                  {new Date(d.scheduledOn).toLocaleString()}
                </TableCell>
                <TableCell>{new Date(d.createdAt).toLocaleString()}</TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    onClick={() => router.push(`${basePath}?draftId=${d.id}`)}
                  >
                    Resume
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6 flex justify-end">
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
