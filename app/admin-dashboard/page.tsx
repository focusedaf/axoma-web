"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Clock, ShieldBan, ArrowRight } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const growthData = [
  { name: "Mon", issuers: 30 },
  { name: "Tue", issuers: 34 },
  { name: "Wed", issuers: 28 },
  { name: "Thu", issuers: 40 },
  { name: "Fri", issuers: 42 },
];

const statusData = [
  { name: "Active", value: 42 },
  { name: "Pending", value: 8 },
  { name: "Suspended", value: 3 },
];

export default function AdminDashboardPage() {
  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden">
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total Issuers</CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">42</div>
            <p className="text-xs text-muted-foreground mt-1">+3 this week</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Pending Approval</CardTitle>
            <Clock className="h-5 w-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-yellow-500">8</div>
            <p className="text-xs text-muted-foreground mt-1">Needs review</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Suspended</CardTitle>
            <ShieldBan className="h-5 w-5 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-red-500">3</div>
            <p className="text-xs text-muted-foreground mt-1">
              Under moderation
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid flex-1 gap-6 md:grid-cols-3 overflow-hidden">
        <Card className="col-span-2 flex flex-col">
          <CardHeader>
            <CardTitle>Issuer Growth</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="issuers"
                  strokeWidth={3}
                  stroke="hsl(var(--primary))"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="value"
                  fill="hsl(var(--primary))"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button>
              Review Pending
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>

            <Button variant="secondary">View All Issuers</Button>

            <Button variant="destructive">Manage Suspensions</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span>Mumbai University approved</span>
              <span className="text-muted-foreground">2h ago</span>
            </div>
            <div className="flex justify-between">
              <span>John Doe submitted documents</span>
              <span className="text-muted-foreground">5h ago</span>
            </div>
            <div className="flex justify-between">
              <span>Tech Recruiter suspended</span>
              <span className="text-muted-foreground">1d ago</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
