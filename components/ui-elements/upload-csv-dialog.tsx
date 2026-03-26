"use client";

import { useState, useEffect } from "react";
import { uploadCandidatesApi, getMyExamsApi } from "@/lib/api";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export function UploadCsvDialog() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [examId, setExamId] = useState("");
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  /**
   * Load issuer exams
   */
  useEffect(() => {
    if (!open) return;

    getMyExamsApi()
      .then((res) => setExams(res.data))
      .catch(() => toast.error("Failed to load exams"));
  }, [open]);

  /**
   * Upload handler
   */
  const handleUpload = async () => {
    if (!file || !examId) {
      toast.error("Select exam and CSV");
      return;
    }

    try {
      setLoading(true);

      const res = await uploadCandidatesApi(examId, file);

      toast.success(`Uploaded ${res.data.count} candidates`);

      setOpen(false);
      setFile(null);
      setExamId("");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">Upload CSV</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Candidates CSV</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Exam dropdown */}
          <select
            className="w-full border rounded px-3 py-2"
            value={examId}
            onChange={(e) => setExamId(e.target.value)}
          >
            <option value="">Select Exam</option>

            {exams.map((exam) => (
              <option key={exam.id} value={exam.id}>
                {exam.title}
              </option>
            ))}
          </select>

          {/* File upload */}
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          {/* Upload button */}
          <Button onClick={handleUpload} disabled={loading}>
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
