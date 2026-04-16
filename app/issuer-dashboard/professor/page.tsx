"use client";

import { useEffect, useState } from "react";
import { getMyExamsApi, getMyDraftsApi, getExamResults } from "@/lib/api";

import { StatCards } from "@/components/ui-elements/professorDash/statCard";
import { ExamsTabs } from "@/components/ui-elements/professorDash/examTabs";
import { RecentActivityCard } from "@/components/ui-elements/professorDash/recentActivityCard";
import { QuickActionsCard } from "@/components/ui-elements/professorDash/quickActionsCard";

export default function ProfessorDashboardPage() {
  const [activeExams, setActiveExams] = useState<any[]>([]);
  const [draftExams, setDraftExams] = useState<any[]>([]);
  const [gradedExams, setGradedExams] = useState<any[]>([]);
  const [stats, setStats] = useState<any[]>([]);
  const [activity, setActivity] = useState<any[]>([]);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [examsRes, draftsRes] = await Promise.all([
          getMyExamsApi(),
          getMyDraftsApi(),
        ]);

        const exams = examsRes.data || [];
        const drafts = draftsRes.data || [];

        // split exams
        const active = exams.filter((e: any) => e.status === "ACTIVE");
        const graded = exams.filter((e: any) => e.status === "GRADED");

        setActiveExams(active);
        setDraftExams(drafts);
        setGradedExams(graded);

        // stats
        setStats([
          { title: "Active Exams", value: active.length },
          { title: "Drafts", value: drafts.length },
          { title: "Graded", value: graded.length },
          { title: "Total Exams", value: exams.length },
        ]);

        // activity (basic for now)
        setActivity(
          exams.slice(0, 5).map((e: any) => ({
            id: e.id,
            description: `Exam "${e.title}" updated`,
            time: new Date(e.updatedAt).toLocaleDateString(),
          })),
        );
      } catch (err) {
        console.error(err);
      }
    }

    loadDashboard();
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <StatCards items={stats} />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
          <div className="md:col-span-2">
            <ExamsTabs
              activeExams={activeExams}
              draftExams={draftExams}
              gradedExams={gradedExams}
            />
          </div>

          <div className="md:col-span-1 flex flex-col gap-4">
            <RecentActivityCard activities={activity} />
            <QuickActionsCard />
          </div>
        </div>
      </main>
    </div>
  );
}
