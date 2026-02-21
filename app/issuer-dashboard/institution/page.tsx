"use client";

import { InstitutionQuickActions } from "@/components/ui-elements/institutionDash/quickActionsCard";
import { InstitutionRecentActivityCard } from "@/components/ui-elements/institutionDash/recentActivityCard";
import { InstitutionStatCards } from "@/components/ui-elements/institutionDash/statCards";
import { InstitutionExamsTabs } from "@/components/ui-elements/institutionDash/examTabs";

import {
  institutionStatCards,
  ongoingInstitutionExams,
  upcomingInstitutionExams,
  completedInstitutionExams,
  institutionRecentActivity,
} from "@/lib/data";

export default function InstitutionDashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <InstitutionStatCards items={institutionStatCards} />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
      
          <div className="md:col-span-2">
            <InstitutionExamsTabs
              ongoingExams={ongoingInstitutionExams}
              upcomingExams={upcomingInstitutionExams}
              completedExams={completedInstitutionExams}
            />
          </div>

      
          <div className="md:col-span-1 flex flex-col gap-4">
            <InstitutionRecentActivityCard
              activities={institutionRecentActivity}
            />
            <InstitutionQuickActions />
          </div>
        </div>
      </main>
    </div>
  );
}
