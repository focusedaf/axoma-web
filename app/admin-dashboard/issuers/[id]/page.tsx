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

export default function IssuerDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [issuer, setIssuer] = useState<Issuer | null>(null);
  const [loading, setLoading] = useState(true);

  const loadIssuer = async () => {
    try {
      const res = await fetchIssuersAdmin();
      const found = res.data.data.find((i: Issuer) => i.id === id);
      setIssuer(found || null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) loadIssuer();
  }, [id]);

  if (loading || !issuer) return <Spinner />;

  const displayName =
    issuer.role === "institution"
      ? issuer.institutionName
      : `${issuer.firstName ?? ""} ${issuer.lastName ?? ""}`;

  const isPDF = (url: string) =>
    url.toLowerCase().endsWith(".pdf") || url.includes("/raw/upload/");

  const getPdfUrl = (url: string) =>
    url.replace("/upload/", "/upload/fl_inline/");

  const getImageUrl = (url: string) =>
    url.replace("/upload/", "/upload/fl_attachment:false/");

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Issuer Details</h2>

      {/* PROFILE */}
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Name:</strong> {displayName}
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

      {/* DOCUMENTS */}
      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {issuer.documents.length === 0 ? (
            <p>No documents uploaded</p>
          ) : (
            issuer.documents.map((doc, index) => {
              const pdfUrl = getPdfUrl(doc.fileUrl);
              const imageUrl = getImageUrl(doc.fileUrl);

              return (
                <div key={doc.id} className="border rounded-lg p-4 space-y-3">
                  {/* HEADER ROW */}
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Document {index + 1}</p>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        window.open(
                          isPDF(doc.fileUrl) ? pdfUrl : imageUrl,
                          "_blank",
                        )
                      }
                    >
                      Open in new tab
                    </Button>
                  </div>

                  {/* PREVIEW */}
                  {!isPDF(doc.fileUrl) && (
                    <img
                      src={imageUrl}
                      alt="doc"
                      className="w-full max-h-[500px] object-contain rounded"
                    />
                  )}

                  {isPDF(doc.fileUrl) && (
                    <iframe
                      src={pdfUrl}
                      className="w-full h-[600px] border rounded"
                    />
                  )}
                </div>
              );
            })
          )}
        </CardContent>
      </Card>

      {/* ACTION BUTTONS */}
      {issuer.status === "pending" && (
        <div className="flex gap-4 justify-end">
          <Button
            onClick={async () => {
              try {
                await approveIssuerAdmin(id);
                router.push("/admin-dashboard/issuers");
              } catch (err) {
                console.error(err);
              }
            }}
          >
            Approve
          </Button>

          <Button
            variant="destructive"
            onClick={async () => {
              try {
                await suspendIssuerAdmin(id);
                router.push("/admin-dashboard/issuers");
              } catch (err) {
                console.error(err);
              }
            }}
          >
            Suspend
          </Button>
        </div>
      )}
    </div>
  );
}
