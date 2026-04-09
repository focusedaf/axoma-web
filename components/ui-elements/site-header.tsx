"use client";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Eye, History, NotebookPen, Bell } from "lucide-react";
import { UploadCsvDialog } from "@/components/ui-elements/upload-csv-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

type Notification = {
  message: string;
  type: string;
  time: number;
};

const toTitleCase = (str: string) =>
  str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export function SiteHeader() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

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

    window.addEventListener("issuer-notification", handler);
    return () => window.removeEventListener("issuer-notification", handler);
  }, []);

  if (loading || !isAuthenticated || !user) return null;

  const userRole = user.role;

  const userName =
    userRole === "institution"
      ? toTitleCase(user.institutionName ?? "")
      : toTitleCase(`${user.firstName ?? ""} ${user.lastName ?? ""}`.trim());

  const unreadCount = notifications.length;

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="flex w-full items-center gap-4 px-4 py-4">
        <SidebarTrigger />
        <Separator orientation="vertical" className="hidden h-6 sm:block" />

        <h1
          className={cn(
            "font-semibold tracking-tight mr-auto",
            "text-lg sm:text-xl md:text-2xl",
          )}
        >
          Welcome, {userName}
        </h1>

        <div className="flex-1" />

        {/*  ISSUER NOTIFICATIONS */}
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

        {/* EXISTING ACTIONS */}
        {["professor", "institution", "recruiter"].includes(userRole) && (
          <UploadCsvDialog />
        )}

        {userRole === "professor" && (
          <div className="flex gap-2">
            <Button
              onClick={() =>
                router.push("/issuer-dashboard/professor/create-exam")
              }
            >
              <NotebookPen className="mr-2 h-4 w-4" />
              Create Exam
            </Button>
          </div>
        )}

        {userRole === "recruiter" && (
          <Button onClick={() => router.push("/issuer-dashboard/recruiter")}>
           Create Assessment
          </Button>
        )}

        {userRole === "institution" && (
          <Button onClick={() => router.push("/issuer-dashboard/institution")}>
            Create Exam
          </Button>
        )}
      </div>
    </header>
  );
}
