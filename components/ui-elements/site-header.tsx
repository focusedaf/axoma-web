"use client";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Eye, History, NotebookPen } from "lucide-react";

export function SiteHeader() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  if (loading) return null;
  if (!isAuthenticated || !user) return null;

  const userRole = user.role;

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="flex w-full items-center gap-4 px-4 py-4">
        <SidebarTrigger />
        <Separator orientation="vertical" className="hidden h-6 sm:block" />

        <h1
          className={cn(
            "font-semibold tracking-tight mr-auto text-black",
            "text-lg sm:text-xl md:text-3xl",
          )}
        >
          Dashboard
        </h1>

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
          <div className="flex gap-2">
            <Button onClick={() => router.push("/issuer-dashboard/recruiter")}>
              Recruiter Panel
            </Button>
          </div>
        )}

        {userRole === "institution" && (
          <div className="flex gap-2">
            <Button
              onClick={() => router.push("/issuer-dashboard/institution")}
            >
              Institution Panel
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
