"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function CandidateDetailPage() {
  return (
    <div className="space-y-8">
     
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">John Doe</h1>
          <p className="text-muted-foreground text-sm">john@example.com</p>
        </div>
        <Badge variant="secondary">Completed</Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Score</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-green-500">
            82%
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Violation Risk</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-yellow-500">
            Medium
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Duration</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">58 mins</CardContent>
        </Card>
      </div>

   
      <Card>
        <CardHeader>
          <CardTitle>Violation Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="flex justify-between">
            <span>Tab switching detected</span>
            <Badge variant="outline">2 times</Badge>
          </div>

          <Separator />

          <div className="flex justify-between">
            <span>Multiple faces detected</span>
            <Badge variant="destructive">1 time</Badge>
          </div>
        </CardContent>
      </Card>

    
      <div className="flex gap-4">
        <Button>Approve</Button>
        <Button variant="destructive">Disqualify</Button>
      </div>
    </div>
  );
}
