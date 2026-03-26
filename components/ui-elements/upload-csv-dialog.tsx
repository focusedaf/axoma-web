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
import { FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Exam {
  id: string;
  title: string;
}

export function UploadCsvDialog() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [examId, setExamId] = useState("");
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(false);

  // Load exams when dialog opens
  useEffect(() => {
    if (!open) return;

    getMyExamsApi()
      .then((res) => setExams(res.data))
      .catch(() => toast.error("Failed to load exams"));
  }, [open]);

  const handleUpload = async () => {
    if (!file || !examId) {
      toast.error("Please select an exam and CSV file");
      return;
    }

    try {
      setLoading(true);
      const res = await uploadCandidatesApi(examId, file);
      toast.success(`Uploaded ${res.data.count} candidates successfully!`);

      // Reset
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
        <Button variant="secondary" className="flex items-center gap-2">
          <FileUp className="h-4 w-4" />
          Upload CSV
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
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

         
          <input
            type="file"
            accept=".csv"
            className="block w-full text-sm text-gray-600"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          
          <Button onClick={handleUpload} disabled={loading || !file || !examId}>
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
