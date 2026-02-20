"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function CreateAssessmentPage() {
  return (
    <Card className="max-w-3xl">
      <CardHeader>
        <CardTitle>Create New Assessment</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Assessment Title</Label>
          <Input placeholder="Frontend Developer Screening" />
        </div>

        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea placeholder="Short description about this assessment..." />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Duration (minutes)</Label>
            <Input type="number" placeholder="60" />
          </div>

          <div className="space-y-2">
            <Label>Passing Score (%)</Label>
            <Input type="number" placeholder="70" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Label>Enable Proctoring</Label>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <Label>Auto Disqualify on High Risk</Label>
          <Switch />
        </div>

        <Button className="w-full">Create Assessment</Button>
      </CardContent>
    </Card>
  );
}
