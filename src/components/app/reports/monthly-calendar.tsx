"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";

export function MonthlyCalendar() {
  const [month, setMonth] = React.useState(new Date("2023-10-05"));

  // Mock data for dots to match screenshot
  const successDays = [1, 2, 5, 6, 8, 9, 10, 12, 14, 15, 16];
  const partialDays = [3, 7, 13];
  const missedDays = [4, 11];

  const DayWithDot = ({ date, displayMonth }: { date: Date, displayMonth: Date }) => {
    if (!date) {
      return <></>;
    }
    const day = date.getDate();
    const isCurrentMonth = date.getMonth() === displayMonth.getMonth();
    const isSuccess = isCurrentMonth && successDays.includes(day);
    const isPartial = isCurrentMonth && partialDays.includes(day);
    const isMissed = isCurrentMonth && missedDays.includes(day);
    
    return (
      <div className="relative flex h-full w-full items-center justify-center">
        <span>{format(date, "d")}</span>
        <div className="absolute bottom-1.5 flex gap-0.5">
          {isSuccess && <div className="h-1.5 w-1.5 rounded-full bg-primary" />}
          {isPartial && <div className="h-1.5 w-1.5 rounded-full bg-warning" />}
          {isMissed && <div className="h-1.5 w-1.5 rounded-full bg-destructive" />}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-card rounded-xl p-4">
       <DayPicker
        month={month}
        onMonthChange={setMonth}
        showOutsideDays
        className="w-full"
        classNames={{
            months: "w-full",
            month: "w-full space-y-4",
            caption: "flex items-center justify-center relative mb-2",
            caption_label: "text-lg font-bold font-headline",
            nav: "flex items-center",
            nav_button: cn(
              buttonVariants({ variant: "ghost" }),
              "h-8 w-8 bg-transparent p-0"
            ),
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            table: "w-full border-collapse",
            head_row: "flex justify-around",
            head_cell: "text-muted-foreground rounded-md w-9 text-xs font-normal uppercase",
            row: "flex w-full mt-2 justify-around",
            cell: "h-10 w-10 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
            day: cn(
              buttonVariants({ variant: "ghost" }),
              "h-10 w-10 p-0 font-normal aria-selected:opacity-100 rounded-lg"
            ),
            day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-lg",
            day_today: "text-primary font-bold",
            day_outside: "day-outside text-muted-foreground/50 opacity-0",
            day_disabled: "text-muted-foreground opacity-50",
        }}
        components={{
            Day: DayWithDot,
            IconLeft: () => <ChevronLeft className="h-5 w-5" />,
            IconRight: () => <ChevronRight className="h-5 w-5" />,
        }}
        selected={new Date("2023-10-05")}
       />
       <div className="mt-4 flex justify-center items-center gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-primary" /> Success</span>
          <span className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-warning" /> Partial</span>
          <span className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-destructive" /> Missed</span>
       </div>
    </div>
  );
}
