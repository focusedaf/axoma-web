"use client";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Eye, History, NotebookPen } from "lucide-react";
import { UploadCsvDialog } from "@/components/ui-elements/upload-csv-dialog";

const toTitleCase = (str: string) =>
  str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export function SiteHeader() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  if (loading || !isAuthenticated || !user) return null;

  const userRole = user.role;

  const userName =
    userRole === "institution"
      ? toTitleCase(user.institutionName ?? "")
      : toTitleCase(`${user.firstName ?? ""} ${user.lastName ?? ""}`.trim());

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="flex w-full items-center gap-4 px-4 py-4">
        {/* Sidebar trigger */}
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

            <Button
              variant="outline"
              onClick={() => router.push("/issuer-dashboard/professor/history")}
            >
              <Eye className="mr-2 h-4 w-4" />
              View History
            </Button>

            <Button
              variant="outline"
              onClick={() =>
                router.push("/issuer-dashboard/professor/review-exam")
              }
            >
              <History className="mr-2 h-4 w-4" />
              Review Exam
            </Button>
          </div>
        )}

        {userRole === "recruiter" && (
          <Button onClick={() => router.push("/issuer-dashboard/recruiter")}>
            Recruiter Panel
          </Button>
        )}

        {userRole === "institution" && (
          <Button onClick={() => router.push("/issuer-dashboard/institution")}>
            Institution Panel
          </Button>
        )}
      </div>
    </header>
  );
}
