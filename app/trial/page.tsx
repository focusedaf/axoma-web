import ProfessorProfileForm from "@/components/ui-elements/forms/professorProfileForm"
import RecruiterProfileForm from "@/components/ui-elements/forms/recruiterProfileForm";
import InstitutionProfileForm from "@/components/ui-elements/forms/institutionProfileForm";
import VerifyDocsForm from "@/components/ui-elements/forms/verifyDocs-form";

export default function Trial() {
  return (
    <div>
      <ProfessorProfileForm />
      <RecruiterProfileForm/>
      <InstitutionProfileForm/>
      <VerifyDocsForm/>
    </div>
  );
}
