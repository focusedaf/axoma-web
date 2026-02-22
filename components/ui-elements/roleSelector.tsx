import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Role } from "@/types/auth";

interface RoleSelectorProps {
  value?: Role | null;
  onChange?: (value: Role) => void;
  disabled?: boolean;
}

const RoleSelector = ({ value, onChange, disabled }: RoleSelectorProps) => {
  return (
    <Select
      value={value ?? undefined} 
      onValueChange={(val) => onChange?.(val as Role)}
      disabled={disabled}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select your role" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="professor">Professor</SelectItem>
        <SelectItem value="recruiter">Recruiter</SelectItem>
        <SelectItem value="institution">Institution</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default RoleSelector;
