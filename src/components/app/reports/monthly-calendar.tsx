"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";

export function MonthlyCalendar() {
  const [month, setMonth] = React.useState(new Date("2023-10-05"));

  // Mock data for dots
  const successDays = [1, 2, 6, 7, 8, 9, 10, 12, 14, 15, 16, 17, 18];
  const partialDays = [13];
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
      <div className="relative flex h-full w-full flex-col items-center justify-center">
        <span>{format(date, "d")}</span>
        <div className="flex gap-0.5 mt-1">
          {(isSuccess || isPartial || isMissed) && (
            <>
              {isSuccess && <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>}
              {isPartial && <div className="h-1.5 w-1.5 rounded-full bg-warning"></div>}
              {isMissed && <div className="h-1.5 w-1.5 rounded-full bg-destructive"></div>}
            </>
          )}
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
            caption: "flex items-center justify-between px-2",
            caption_label: "text-lg font-bold font-headline",
            nav: "space-x-1 flex items-center",
            nav_button: cn(
              buttonVariants({ variant: "outline" }),
              "h-8 w-8 bg-transparent p-0"
            ),
            table: "w-full border-collapse",
            head_row: "flex justify-between",
            head_cell: "text-muted-foreground rounded-md w-9 text-xs font-normal uppercase",
            row: "flex w-full mt-2 justify-between",
            cell: "h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
            day: cn(
              buttonVariants({ variant: "ghost" }),
              "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
            ),
            day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
            day_today: "text-primary font-bold",
            day_outside: "day-outside text-muted-foreground/50",
            day_disabled: "text-muted-foreground opacity-50",
        }}
        components={{
            Day: DayWithDot,
            IconLeft: () => <ChevronLeft className="h-4 w-4" />,
            IconRight: () => <ChevronRight className="h-4 w-4" />,
        }}
        selected={new Date("2023-10-05")}
       />
       <div className="mt-4 flex justify-center items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-primary" /> Success</span>
          <span className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-warning" /> Partial</span>
          <span className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-destructive" /> Missed</span>
       </div>
    </div>
  );
}
