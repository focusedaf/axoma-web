import { Badge } from "@/components/ui/badge";

export function StatusBadge({ status }: { status: string }) {
  if (status === "Active") {
    return <Badge>Active</Badge>;
  }

  if (status === "Draft") {
    return <Badge variant="secondary">Draft</Badge>;
  }

  if (status === "Closed") {
    return <Badge variant="outline">Closed</Badge>;
  }

  return null;
}
