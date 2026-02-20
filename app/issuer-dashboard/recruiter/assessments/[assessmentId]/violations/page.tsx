"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ViolationsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Violations</h2>

      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="flex justify-between">
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-muted-foreground">
                Multiple faces detected
              </p>
            </div>
            <Badge variant="destructive">High</Badge>
          </div>

          <div className="flex justify-between">
            <div>
              <p className="font-medium">Jane Smith</p>
              <p className="text-sm text-muted-foreground">
                Tab switching detected
              </p>
            </div>
            <Badge variant="outline">Medium</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
