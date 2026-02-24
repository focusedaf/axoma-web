"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  fetchIssuersAdmin,
  approveIssuerAdmin,
  suspendIssuerAdmin,
} from "@/lib/api";
import { Spinner } from "@/components/ui/spinner";

interface IssuerDocument {
  id: string;
  fileUrl: string;
  type: string;
}

interface Issuer {
  id: string;
  role: "institution" | "professor" | "recruiter";
  status: string;
  email: string;
  firstName?: string;
  lastName?: string;
  institutionName?: string;
  walletAddress?: string;
  documents: IssuerDocument[];
}

export default function IssuerDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [issuer, setIssuer] = useState<Issuer | null>(null);

  useEffect(() => {
    const loadIssuer = async () => {
      try {
        const res = await fetchIssuersAdmin();
        const found = res.data.data.find((i: Issuer) => i.id === id);
        setIssuer(found || null);
      } catch (error) {
        console.error("Failed to fetch issuer", error);
      }
    };

    if (id) loadIssuer();
  }, [id]);

  if (!issuer) return <Spinner />;

  const displayName =
    issuer.role === "institution"
      ? issuer.institutionName || "—"
      : `${issuer.firstName ?? ""} ${issuer.lastName ?? ""}`.trim();

  const handleApprove = async () => {
    await approveIssuerAdmin(id);
    router.refresh();
  };

  const handleSuspend = async () => {
    await suspendIssuerAdmin(id);
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Issuer Details</h2>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>
            <strong>Name:</strong> {displayName || "—"}
          </p>
          <p>
            <strong>Email:</strong> {issuer.email}
          </p>
          <p>
            <strong>Wallet:</strong> {issuer.walletAddress || "—"}
          </p>
          <p>
            <strong>Status:</strong> <Badge>{issuer.status}</Badge>
          </p>
        </CardContent>

        <Card>
          <CardHeader>
            <CardTitle>Documents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {issuer.documents.length === 0 ? (
              <p>No documents uploaded.</p>
            ) : (
              <ul className="list-disc pl-5 space-y-1">
                {issuer.documents.map((doc) => (
                  <li key={doc.id}>
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {doc.type}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </Card>

      {issuer.status === "pending" && (
        <div className="flex gap-4">
          <Button onClick={handleApprove}>Approve</Button>
          <Button variant="destructive" onClick={handleSuspend}>
            Suspend
          </Button>
        </div>
      )}
    </div>
  );
}
