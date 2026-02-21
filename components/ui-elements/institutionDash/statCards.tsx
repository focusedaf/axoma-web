import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InstitutionStatCard } from "@/lib/data";

interface Props {
  items: InstitutionStatCard[];
}

export function InstitutionStatCards({ items }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      {items.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            {card.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
