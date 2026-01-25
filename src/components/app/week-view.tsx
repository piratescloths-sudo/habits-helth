"use client";

import { cn } from "@/lib/utils";
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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    const weekStart = startOfWeek(today, { weekStartsOn: 0 }); // Sunday start
    const weekDays: Day[] = [];
    for (let i = 0; i < 5; i++) {
      const day = addDays(weekStart, i);
      weekDays.push({
        short: format(day, 'EEE').toUpperCase(),
        date: format(day, 'dd'),
        current: isToday(day),
      });
    }
    setDays(weekDays);
  }, []);

  if (!isClient) {
    return (
        <div className="flex justify-between items-center py-2">
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex-1 text-center space-y-2">
                    <Skeleton className="h-4 w-8 mx-auto" />
                    <Skeleton className="h-7 w-6 mx-auto" />
                </div>
            ))}
        </div>
    );
  }

  return (
    <div className="flex justify-between items-center py-2">
      {days.map((day) => (
        <div
          key={day.short}
          className={cn(
            "flex-1 text-center space-y-2 relative pt-1 pb-2",
             day.current ? "text-primary" : "text-muted-foreground"
          )}
        >
          <p className="text-sm font-medium">{day.short}</p>
          <p className="text-2xl font-bold">{day.date}</p>
          {day.current && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-8 bg-primary rounded-full" />}
        </div>
      ))}
    </div>
  );
}
