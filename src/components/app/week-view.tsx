"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { format, startOfWeek, addDays, isToday } from 'date-fns';
import { Skeleton } from "@/components/ui/skeleton";

type Day = {
  short: string;
  date: string;
  current: boolean;
};

export function WeekView() {
  const [days, setDays] = useState<Day[]>([]);

  useEffect(() => {
    const today = new Date();
    const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // Monday start
    const weekDays: Day[] = [];
    for (let i = 0; i < 7; i++) {
      const day = addDays(weekStart, i);
      weekDays.push({
        short: format(day, 'EEE').toUpperCase(),
        date: format(day, 'dd'),
        current: isToday(day),
      });
    }
    setDays(weekDays);
  }, []);

  if (days.length === 0) {
    return (
        <div className="flex justify-between items-center gap-2">
            {Array.from({ length: 7 }).map((_, index) => (
                <Card key={index} className="flex-1 text-center p-2 rounded-lg bg-card border-card">
                    <CardContent className="p-1 space-y-1">
                        <Skeleton className="h-4 w-8 mx-auto" />
                        <Skeleton className="h-7 w-6 mx-auto" />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
  }

  return (
    <div className="flex justify-between items-center gap-2">
      {days.map((day) => (
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
