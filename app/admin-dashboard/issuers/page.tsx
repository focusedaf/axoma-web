"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
import { fetchIssuersAdmin } from "@/lib/api";
import { Spinner } from "@/components/ui/spinner";

interface IssuerDocument {
  id: string;
  fileUrl: string;
  type: string;
}

interface Issuer {
  id: string;
  role: "institution" | "professor" | "recruiter";
  status: "pending" | "approved" | "suspended";
  email: string;
  firstName?: string;
  lastName?: string;
  institutionName?: string;
  walletAddress?: string;
  documents: IssuerDocument[];
}

export default function AllIssuersPage({
  filterStatus,
}: {
  filterStatus?: "pending" | "approved" | "suspended";
}) {
  const [issuers, setIssuers] = useState<Issuer[]>([]);
  const [loading, setLoading] = useState(true);

  const loadIssuers = async () => {
    try {
      setLoading(true);
      const res = await fetchIssuersAdmin();

      let data = res.data.data;

      if (filterStatus) {
        data = data.filter((i: Issuer) => i.status === filterStatus);
      }

      setIssuers(data);
    } catch (error) {
      console.error("Failed to fetch issuers", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIssuers();
  }, [filterStatus]);

  if (loading) return <Spinner />;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">
        {filterStatus
          ? `${filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)} Issuers`
          : "All Issuers"}
      </h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Documents</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {issuers.map((issuer) => {
            const displayName =
              issuer.role === "institution"
                ? issuer.institutionName || "—"
                : `${issuer.firstName ?? ""} ${issuer.lastName ?? ""}`.trim();

            return (
              <TableRow key={issuer.id}>
                <TableCell>{displayName || "—"}</TableCell>
                <TableCell>{issuer.email}</TableCell>

                <TableCell>
                  <Badge
                    variant={
                      issuer.status === "pending"
                        ? "secondary"
                        : issuer.status === "approved"
                          ? "default"
                          : "destructive"
                    }
                  >
                    {issuer.status}
                  </Badge>
                </TableCell>

                <TableCell className="flex flex-wrap gap-2">
                  {issuer.documents.length > 0
                    ? issuer.documents.map((doc) => (
                        <Button
                          key={doc.id}
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(doc.fileUrl, "_blank")}
                        >
                          {doc.type}
                        </Button>
                      ))
                    : "—"}
                </TableCell>

                <TableCell>
                  <Link href={`/admin-dashboard/issuers/${issuer.id}`}>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
