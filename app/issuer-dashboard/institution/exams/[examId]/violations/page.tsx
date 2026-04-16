"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getViolationsByExamApi } from "@/lib/api";

export default function InstitutionViolationsPage() {
  const { examId } = useParams();
  const [violations, setViolations] = useState<any[]>([]);

  useEffect(() => {
    getViolationsByExamApi(examId as string).then((res) =>
      setViolations(res.data),
    );
  }, []);

  return (
    <div>
      <h1 className="text-xl mb-4">Violations</h1>

      {violations.map((v) => (
        <div key={v.id} className="border p-3 mb-2">
          <p>{v.type}</p>
          <p>{v.severity}</p>
          <p>{new Date(v.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
