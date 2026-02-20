"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assessment Settings</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <Label>Enable Strict Proctoring</Label>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <Label>Auto Disqualify on High Violation</Label>
          <Switch />
        </div>

        <Button>Save Changes</Button>
      </CardContent>
    </Card>
  );
}
