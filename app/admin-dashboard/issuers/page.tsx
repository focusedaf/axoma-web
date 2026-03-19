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

interface Issuer {
  id: string;
  role: "institution" | "professor" | "recruiter";
  status: "pending" | "approved" | "suspended";
  email: string;
  firstName?: string;
  lastName?: string;
  institutionName?: string;
  documents: { id: string; fileUrl: string }[];
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
      <h2 className="text-2xl font-semibold">All Issuers</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Docs</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {issuers.map((issuer) => {
            const displayName =
              issuer.role === "institution"
                ? issuer.institutionName || "—"
                : `${issuer.firstName ?? ""} ${issuer.lastName ?? ""}`;

            return (
              <TableRow key={issuer.id}>
                <TableCell className="text-md font-medium">
                  {displayName}
                </TableCell>
                <TableCell className="text-md font-medium">
                  {issuer.email}
                </TableCell>

                <TableCell>
                  <Badge>{issuer.status}</Badge>
                </TableCell>

                <TableCell className="text-md font-medium">
                  {issuer.documents.length}
                </TableCell>

                <TableCell>
                  <Link href={`/admin-dashboard/issuers/${issuer.id}`}>
                    <Button size="sm">View</Button>
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
