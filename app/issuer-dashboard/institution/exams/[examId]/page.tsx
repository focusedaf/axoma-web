"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, AlertTriangle, BarChart3, Settings } from "lucide-react";

export default function ExamOverviewPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Semester 1 - Chemistry Mid Term
          </h1>
          <p className="text-muted-foreground text-sm">Exam ID: #EX1024</p>
        </div>

        <Button>Edit Exam</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex justify-between flex-row items-center">
            <CardTitle>Total Students</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="text-3xl font-bold">128</CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between flex-row items-center">
            <CardTitle>Violations</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent className="text-3xl font-bold text-yellow-500">
            14
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between flex-row items-center">
            <CardTitle>Average Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent className="text-3xl font-bold text-green-500">
            76%
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between flex-row items-center">
            <CardTitle>Status</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="text-lg font-medium">Active</CardContent>
        </Card>
      </div>
    </div>
  );
}
