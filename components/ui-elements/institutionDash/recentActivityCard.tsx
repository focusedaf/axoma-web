import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ActivityItem } from "@/lib/data";

interface Props {
  activities: ActivityItem[];
}

export function InstitutionRecentActivityCard({ activities }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-[260px] pr-4">
          <div className="flex flex-col gap-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex flex-col border-b pb-3 last:border-none"
              >
                <span className="text-sm font-medium">
                  {activity.description}
                </span>
                <span className="text-xs text-muted-foreground">
                  {activity.time}
                </span>
              </div>
            ))}

            {activities.length === 0 && (
              <div className="text-sm text-muted-foreground">
                No recent activity.
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
