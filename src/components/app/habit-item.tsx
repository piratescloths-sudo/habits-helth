"use client";

import type { Habit } from "@/lib/data";
import { cn } from "@/lib/utils";
import * as icons from "lucide-react";
import { Check } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export function HabitItem({
  habit,
  onStatusChange,
}: {
  habit: Habit;
  onStatusChange: (id: string, status: Habit["status"]) => void;
}) {
  const Icon = (icons as any)[habit.icon] || icons.Activity;
  const isCompleted = habit.status === "completed";

  const handleCheckedChange = (checked: boolean) => {
    onStatusChange(habit.id, checked ? "completed" : "pending");
  };

  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-xl p-4 transition-colors",
        isCompleted ? "bg-primary/10" : "bg-card"
      )}
    >
      <div className={cn("flex h-12 w-12 items-center justify-center rounded-lg", isCompleted ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary")}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="flex-1">
        <p className={cn("font-semibold", isCompleted && "line-through text-muted-foreground")}>{habit.name}</p>
        <p className="text-sm text-muted-foreground">{habit.time}</p>
      </div>
      <Checkbox
        id={`habit-${habit.id}`}
        checked={isCompleted}
        onCheckedChange={handleCheckedChange}
        className="h-8 w-8 rounded-full data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
      >
         <Check className="h-5 w-5" />
      </Checkbox>
    </div>
  );
}
