"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
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
  const [loading, setLoading] = useState(false);

  const loadIssuer = async () => {
    try {
      setLoading(true);
      const res = await fetchIssuersAdmin();
      const found = res.data.data.find((i: Issuer) => i.id === id);
      setIssuer(found || null);
    } catch (error) {
      console.error("Failed to fetch issuer", error);
      toast.error("Failed to load issuer data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) loadIssuer();
  }, [id]);

  if (!issuer || loading) return <Spinner />;

  const displayName =
    issuer.role === "institution"
      ? issuer.institutionName || "—"
      : `${issuer.firstName ?? ""} ${issuer.lastName ?? ""}`.trim();

  const handleApprove = async () => {
    try {
      setLoading(true);
      await approveIssuerAdmin(id);
      toast.success("Issuer approved!");
      router.back(); 
    } catch (error) {
      console.error(error);
      toast.error("Failed to approve issuer");
    } finally {
      setLoading(false);
    }
  };

  const handleSuspend = async () => {
    try {
      setLoading(true);
      await suspendIssuerAdmin(id);
      toast.success("Issuer suspended!");
      router.back();
    } catch (error) {
      console.error(error);
      toast.error("Failed to suspend issuer");
    } finally {
      setLoading(false);
    }
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
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {issuer.documents.length === 0 ? (
            <p>No documents uploaded.</p>
          ) : (
            issuer.documents.map((doc) => (
              <Button
                key={doc.id}
                size="sm"
                variant="outline"
                onClick={() => window.open(doc.fileUrl, "_blank")}
              >
                {doc.type}
              </Button>
            ))
          )}
        </CardContent>
      </Card>

      {issuer.status === "pending" && (
        <div className="flex gap-4">
          <Button onClick={handleApprove} disabled={loading}>
            Approve
          </Button>
          <Button
            variant="destructive"
            onClick={handleSuspend}
            disabled={loading}
          >
            Suspend
          </Button>
        </div>
      )}
    </div>
  );
}
