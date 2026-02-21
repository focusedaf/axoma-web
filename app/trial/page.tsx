import ProfessorProfileForm from "@/components/ui-elements/forms/professorProfileForm";
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
import InstitutionDashboardPage from "../issuer-dashboard/institution/page";
import CreateInstitutionExamPage from "../issuer-dashboard/institution/create-exam/page";
import CreateProfessorExamPage from "../issuer-dashboard/professor/create-exam/page";
import ExamOverviewPage from "../issuer-dashboard/institution/exams/[examId]/page";
import InstitutionExamsPage from "../issuer-dashboard/institution/exams/page";
import InstitutionResultsPage from "../issuer-dashboard/institution/exams/[examId]/results/page";
import InstitutionViolationsPage from "../issuer-dashboard/institution/exams/[examId]/violations/page";
import StudentDetailPage from "../issuer-dashboard/institution/exams/[examId]/candidates/[candidateId]/page";
import StudentsPage from "../issuer-dashboard/institution/exams/[examId]/candidates/page";
import ExamViolationsPage from "../issuer-dashboard/professor/review-exam/[examId]/violations/page";
import GlobalInstitutionViolationsPage from "../issuer-dashboard/institution/violations/page";
import GlobalProfessorViolationsPage from "../issuer-dashboard/professor/violations/page";
import GlobalRecruiterViolationsPage from "../issuer-dashboard/recruiter/violations/page";

export default function Trial() {
  return (
    <div>
      <GlobalInstitutionViolationsPage />
      <GlobalProfessorViolationsPage />
      <GlobalRecruiterViolationsPage />
      <ExamViolationsPage />
      <StudentsPage />
      <StudentDetailPage />
      <InstitutionResultsPage />
      <InstitutionViolationsPage />
      <InstitutionExamsPage />
      <ExamOverviewPage />
      <CreateInstitutionExamPage />
      <CreateProfessorExamPage />
      <InstitutionDashboardPage />
      <ProfessorProfileForm />
      <RecruiterProfileForm />
      <InstitutionProfileForm />
      <VerifyDocsForm />
      <RecruiterDashboardPage />
      <CandidateDetailPage />
      <ViolationsPage />
      <CreateAssessmentPage />
      <SettingsPage />
      <ResultsPage />
      <AssessmentOverviewPage />
      <RecruiterAssessmentsPage />
      <CandidatesPage />
    </div>
  );
}
