import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, CheckCircle, Flame } from "lucide-react";

const stats = [
  {
    name: "Total Habits",
    value: "6",
    icon: Target,
    color: "text-primary",
  },
  {
    name: "Completion",
    value: "83%",
    icon: CheckCircle,
    color: "text-success",
  },
  {
    name: "Longest Streak",
    value: "23 days",
    icon: Flame,
    color: "text-orange-500",
  },
];

export function StreakOverview() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat) => (
        <Card key={stat.name} className="flex flex-col items-center justify-center p-4 text-center">
          <CardHeader className="p-0">
            <stat.icon className={`h-6 w-6 ${stat.color}`} />
          </CardHeader>
          <CardContent className="p-0 mt-2">
            <p className="text-lg font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.name}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
