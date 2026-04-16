import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ActivityItem } from "@/lib/data";

interface RecentActivityCardProps {
  activities: ActivityItem[];
}

export function RecentActivityCard({ activities }: RecentActivityCardProps) {
  const normalized = activities.map((activity) => ({
    ...activity,
    time: activity.time ? new Date(activity.time) : null,
  }));

  function formatDate(date: Date | null) {
    if (!date || isNaN(date.getTime())) return "—";

    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {normalized.map((activity) => (
          <div key={activity.id} className="flex justify-between">
            <p className="text-sm text-muted-foreground">
              {activity.description}
            </p>

            <p className="text-sm text-muted-foreground whitespace-nowrap pl-4">
              {formatDate(activity.time)}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
