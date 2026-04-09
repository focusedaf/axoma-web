"use client";

import { toast } from "sonner";
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
import { deleteDraftApi } from "@/lib/api";

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

  const handleDelete = async (id: string) => {
    try {
      await deleteDraftApi(id);

      setDrafts((prev) => prev.filter((d) => d.id !== id));

      toast.success("Draft deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete draft");
    }
  };

  return (
    <div className="w-full px-8 py-6">
      <h1 className="text-2xl font-semibold mb-6">Draft Exams</h1>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Scheduled</TableHead>
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
                  {new Date(d.createdAt).toLocaleString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TableCell>
                <TableCell>
                  {d.scheduledOnDraft
                    ? new Date(d.scheduledOnDraft).toLocaleString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Not scheduled"}
                </TableCell>

                <TableCell className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => router.push(`${basePath}?draftId=${d.id}`)}
                  >
                    Resume
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(d.id)}
                  >
                    Delete
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
