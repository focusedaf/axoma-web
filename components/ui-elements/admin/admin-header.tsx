"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Bell, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Notification = {
  message: string;
  type: string;
  time: number;
};

export const AdminHeader = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const handler = (event: any) => {
      const data = event.detail;

      setNotifications((prev) => [
        {
          message: data.message,
          type: data.type,
          time: Date.now(),
        },
        ...prev,
      ]);
    };

    window.addEventListener("admin-notification", handler);
    return () => window.removeEventListener("admin-notification", handler);
  }, []);

  const unreadCount = notifications.length;

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-4">
        <Separator orientation="vertical" className="h-8" />
      </div>

      <div className="flex items-center gap-3">
        {/* Notification Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />

              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-xs text-white">
                  {unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-80">
            {notifications.length === 0 ? (
              <p className="p-4 text-sm text-muted-foreground">
                No notifications
              </p>
            ) : (
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notif, idx) => (
                  <div
                    key={idx}
                    className="border-b p-3 text-sm hover:bg-muted"
                  >
                    {notif.message}
                  </div>
                ))}
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Action button */}
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Approve Issuer
        </Button>
      </div>
    </header>
  );
};
