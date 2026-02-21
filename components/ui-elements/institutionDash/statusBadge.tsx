import { Badge } from "@/components/ui/badge";


export function StatusBadge({
  status,
}: {
  status: "Ongoing" | "Upcoming" | "Completed";
}) {
  switch (status) {
    case "Ongoing":
      return <Badge variant="default">{status}</Badge>;

    case "Upcoming":
      return <Badge variant="secondary">{status}</Badge>;

    case "Completed":
      return <Badge variant="outline">{status}</Badge>;

    default:
      return <Badge>{status}</Badge>;
  }
}
