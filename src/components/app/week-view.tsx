"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { Skeleton } from "@/components/ui/skeleton";

type Day = {
  short: string;
  date: string;
  fullDate: Date;
  selected: boolean;
};

type WeekViewProps = {
    selectedDate: Date;
    onDateSelect: (date: Date) => void;
};

export function WeekView({ selectedDate, onDateSelect }: WeekViewProps) {
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
        fullDate: day,
        selected: isSameDay(day, selectedDate),
      });
    }
    setDays(weekDays);
  }, [selectedDate]);

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
          onClick={() => onDateSelect(day.fullDate)}
          className={cn("flex-1 text-center space-y-2 p-2 rounded-lg cursor-pointer transition-colors hover:bg-card",
            day.selected && "border-2 border-primary bg-card"
          )}
        >
          <p className={cn(
              "text-sm font-semibold",
              day.selected ? "text-primary" : "text-muted-foreground"
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
