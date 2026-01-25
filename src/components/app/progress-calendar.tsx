"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Skeleton } from "@/components/ui/skeleton";

export function ProgressCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [month, setMonth] = React.useState<Date | undefined>(undefined);
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
    const today = new Date();
    setDate(today);
    setMonth(today);
  }, []);

  const completedDays: number[] = [];
  const missedDays: number[] = [];
  const skippedDays: number[] = [];

  if (!isClient) {
    return <Skeleton className="h-[350px] w-full rounded-md" />;
  }

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      month={month}
      onMonthChange={setMonth}
      className="rounded-md"
      modifiers={{
        completed: (day) => {
          if (!month || day.getMonth() !== month.getMonth()) return false;
          return completedDays.includes(day.getDate());
        },
        missed: (day) => {
          if (!month || day.getMonth() !== month.getMonth()) return false;
          return missedDays.includes(day.getDate());
        },
        skipped: (day) => {
          if (!month || day.getMonth() !== month.getMonth()) return false;
          return skippedDays.includes(day.getDate());
        },
      }}
      modifiersClassNames={{
        completed: "bg-success/80 text-success-foreground rounded-full",
        missed: "bg-destructive/80 text-destructive-foreground rounded-full",
        skipped: "bg-warning/80 text-warning-foreground rounded-full",
      }}
    />
  );
}
