"use client";

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

const issuers = [
  { id: "1", name: "Harvard", type: "Institution", status: "approved" },
  { id: "2", name: "John Doe", type: "Professor", status: "pending" },
  { id: "3", name: "Tech Recruit", type: "Recruiter", status: "suspended" },
];

export default function AllIssuersPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">All Issuers</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issuers.map((issuer) => (
            <TableRow key={issuer.id}>
              <TableCell>{issuer.name}</TableCell>
              <TableCell>{issuer.type}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    issuer.status === "approved"
                      ? "default"
                      : issuer.status === "pending"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {issuer.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Link href={`/admin-dashboard/issuers/${issuer.id}`}>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
