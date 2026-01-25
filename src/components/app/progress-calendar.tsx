"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";

export function ProgressCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const completedDays = [2, 15, 25];
  const missedDays = [5, 18];
  const skippedDays = [10, 22];

  const today = new Date();

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md"
      modifiers={{
        completed: (day) => {
          if (day.getMonth() !== today.getMonth()) return false;
          return completedDays.includes(day.getDate());
        },
        missed: (day) => {
          if (day.getMonth() !== today.getMonth()) return false;
          return missedDays.includes(day.getDate());
        },
        skipped: (day) => {
          if (day.getMonth() !== today.getMonth()) return false;
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
