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
    const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // Monday start
    const weekDays: Day[] = [];
    for (let i = 0; i < 7; i++) {
      const day = addDays(weekStart, i);
      weekDays.push({
        short: format(day, 'E').toUpperCase(),
        date: format(day, 'd'),
        current: isToday(day),
      });
    }
    setDays(weekDays);
  }, []);

  if (!isClient) {
    return (
        <div className="flex justify-between items-center py-2">
            {Array.from({ length: 7 }).map((_, index) => (
                <div key={index} className="flex-1 text-center space-y-2">
                    <Skeleton className="h-6 w-8 mx-auto" />
                    <Skeleton className="h-8 w-8 mx-auto rounded-lg" />
                </div>
            ))}
        </div>
    );
  }

  return (
    <div className="flex justify-around items-center">
      {days.map((day) => (
        <div
          key={day.short}
          className={cn("flex-1 text-center space-y-2 p-2 rounded-lg",
            day.current && "border-2 border-primary"
          )}
        >
          <p className={cn(
              "text-sm font-semibold",
              day.current ? "text-primary" : "text-muted-foreground"
          )}>
              {day.short}
          </p>
          <div className={cn(
            "w-9 h-9 mx-auto flex items-center justify-center text-xl font-bold text-foreground"
          )}>
            {day.date}
          </div>
        </div>
      ))}
    </div>
  );
}
