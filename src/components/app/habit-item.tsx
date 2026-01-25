"use client";

import type { Habit } from "@/lib/data";
import { cn } from "@/lib/utils";
import * as icons from "lucide-react";
import { Check } from "lucide-react";

export function HabitItem({
  habit,
  onStatusChange,
}: {
  habit: Habit;
  onStatusChange: (id: string) => void;
}) {
  const Icon = (icons as any)[habit.icon] || icons.Activity;
  const isCompleted = habit.status === "completed";

  return (
    <div
      onClick={() => onStatusChange(habit.id)}
      className={cn(
        "flex items-center gap-4 rounded-xl p-4 transition-colors bg-card cursor-pointer"
      )}
    >
      <div className={cn("flex h-12 w-12 items-center justify-center rounded-lg bg-black/20 text-primary")}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="flex-1">
        <p className={cn("font-semibold", isCompleted && "line-through text-muted-foreground")}>{habit.name}</p>
        <p className="text-sm text-muted-foreground">{habit.description}</p>
      </div>
      <div className={cn(
          "h-8 w-8 rounded-full border-2 flex items-center justify-center transition-colors",
          isCompleted ? "bg-primary border-primary" : "border-muted-foreground"
      )}>
          {isCompleted && <Check className="h-5 w-5 text-card" />}
      </div>
    </div>
  );
}
