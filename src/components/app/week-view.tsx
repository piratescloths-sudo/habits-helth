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
        short: format(day, 'E'),
        date: format(day, 'd'),
        current: isToday(day),
      });
    }
    setDays(weekDays);
  }, []);

  if (!isClient) {
    return (
        <div className="flex justify-between items-center px-4 py-2">
            {Array.from({ length: 7 }).map((_, index) => (
                <div key={index} className="flex-1 text-center space-y-2">
                    <Skeleton className="h-8 w-8 mx-auto rounded-full" />
                    <Skeleton className="h-4 w-6 mx-auto" />
                </div>
            ))}
        </div>
    );
  }

  return (
    <div className="flex justify-between items-center px-4 py-2">
      {days.map((day) => (
        <div
          key={day.short}
          className="flex-1 text-center space-y-2"
        >
          <div className={cn(
            "w-9 h-9 mx-auto rounded-full flex items-center justify-center font-bold",
            day.current ? "bg-primary text-primary-foreground" : "text-foreground"
          )}>
            {day.date}
          </div>
          <p className={cn(
              "text-xs font-semibold",
              day.current ? "text-primary" : "text-muted-foreground"
          )}>
              {day.short}
          </p>
        </div>
      ))}
    </div>
  );
}
