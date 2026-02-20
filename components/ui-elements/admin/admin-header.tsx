"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Bell, Plus } from "lucide-react";

export const AdminHeader = () => {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-4">
        <div></div>

        <Separator orientation="vertical" className="h-8" />
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon">
          <Bell className="h-4 w-4" />
        </Button>

        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Approve Issuer
        </Button>
      </div>
    </header>
  );
};
