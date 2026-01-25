"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

const days = [
  { short: "MON", date: "12" },
  { short: "TUE", date: "13" },
  { short: "WED", date: "14" },
  { short: "THU", date: "15" },
  { short: "FRI", date: "16", current: true },
  { short: "SAT", date: "17" },
  { short: "SUN", date: "18" },
];

export function WeekView() {
  return (
    <div className="flex justify-between items-center gap-2">
      {days.map((day, index) => (
        <Card
          key={day.short}
          className={cn(
            "flex-1 text-center p-2 rounded-lg transition-colors border-2",
            day.current
              ? "bg-primary border-primary"
              : "bg-card border-card"
          )}
        >
          <CardContent className={cn("p-1", day.current && "text-primary-foreground")}>
            <p className="text-xs font-medium">{day.short}</p>
            <p className="text-xl font-bold">{day.date}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
