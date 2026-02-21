"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function InstitutionResultsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Exam Results Summary</h2>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Passed Students</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-green-500">
            72
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Failed Students</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-red-500">
            28
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Evaluation</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">8</CardContent>
        </Card>
      </div>
    </div>
  );
}
