"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, BarChart3, AlertTriangle } from "lucide-react";

export default function RecruiterDashboardPage() {
  return (
    <div className="space-y-8">
  
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Recruiter Dashboard</h1>
          <p className="text-muted-foreground text-sm">
            Manage your hiring assessments and candidates
          </p>
        </div>

        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Assessment
        </Button>
      </div>

     
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex justify-between flex-row items-center">
            <CardTitle>Total Assessments</CardTitle>
            <BarChart3 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="text-3xl font-bold">6</CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between flex-row items-center">
            <CardTitle>Total Candidates</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent className="text-3xl font-bold text-green-500">
            248
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between flex-row items-center">
            <CardTitle>Flagged Violations</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent className="text-3xl font-bold text-yellow-500">
            19
          </CardContent>
        </Card>
      </div>

     
      <Card>
        <CardHeader>
          <CardTitle>Recent Assessments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center border rounded-lg p-4">
            <div>
              <p className="font-medium">Frontend Developer Hiring</p>
              <p className="text-sm text-muted-foreground">
                128 candidates • Active
              </p>
            </div>
            <Badge>Active</Badge>
          </div>

          <div className="flex justify-between items-center border rounded-lg p-4">
            <div>
              <p className="font-medium">Backend Engineer Screening</p>
              <p className="text-sm text-muted-foreground">
                64 candidates • Completed
              </p>
            </div>
            <Badge variant="secondary">Completed</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
