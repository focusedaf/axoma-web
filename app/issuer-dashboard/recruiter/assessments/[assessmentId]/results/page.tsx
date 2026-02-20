"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResultsPage() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Passed</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold text-green-500">
          72
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Failed</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold text-red-500">
          28
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pending Review</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">8</CardContent>
      </Card>
    </div>
  );
}
