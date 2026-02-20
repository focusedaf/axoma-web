import ProfessorProfileForm from "@/components/ui-elements/forms/professorProfileForm"
import RecruiterProfileForm from "@/components/ui-elements/forms/recruiterProfileForm";
import InstitutionProfileForm from "@/components/ui-elements/forms/institutionProfileForm";
import VerifyDocsForm from "@/components/ui-elements/forms/verifyDocs-form";
import RecruiterDashboardPage from "../issuer-dashboard/recruiter/page";
import CandidateDetailPage from "../issuer-dashboard/recruiter/assessments/[assessmentId]/candidates/[candidateId]/page";
import ViolationsPage from "../issuer-dashboard/recruiter/assessments/[assessmentId]/violations/page";
import CreateAssessmentPage from "../issuer-dashboard/recruiter/create-assessment/page";
import SettingsPage from "../issuer-dashboard/recruiter/assessments/[assessmentId]/settings/page";
import ResultsPage from "../issuer-dashboard/recruiter/assessments/[assessmentId]/results/page";
import AssessmentOverviewPage from "../issuer-dashboard/recruiter/assessments/[assessmentId]/page";
import RecruiterAssessmentsPage from "../issuer-dashboard/recruiter/assessments/page";
import CandidatesPage from "../issuer-dashboard/recruiter/assessments/[assessmentId]/candidates/page";

export default function Trial() {
  return (
    <div>
      <ProfessorProfileForm />
      <RecruiterProfileForm/>
      <InstitutionProfileForm/>
      <VerifyDocsForm/>
      <RecruiterDashboardPage/>
      <CandidateDetailPage/>
      <ViolationsPage/>
      <CreateAssessmentPage/>
      <SettingsPage/>
      <ResultsPage/>
      <AssessmentOverviewPage/>
      <RecruiterAssessmentsPage/>
      <CandidatesPage/>
    </div>
  );
}
