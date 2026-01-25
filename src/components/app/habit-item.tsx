"use client";

import type { Habit } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import * as icons from "lucide-react";
import { Check, Circle } from "lucide-react";

export function HabitItem({
  habit,
  onStatusChange,
}: {
  habit: Habit;
  onStatusChange: (id: string, status: Habit["status"]) => void;
}) {

  const Icon = icons[habit.icon as keyof typeof icons] as React.ElementType || icons['Activity'];

  const handleCheck = () => {
    onStatusChange(habit.id, habit.status === "completed" ? "pending" : "completed");
  };

  const isCompleted = habit.status === "completed";

  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-xl p-4 transition-colors",
        isCompleted ? "bg-primary/20 border-primary/30" : "bg-card"
      )}
    >
        <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", isCompleted ? "bg-primary/30" : "bg-primary/10")}>
            <Icon className={cn("w-6 h-6", isCompleted ? "text-primary-foreground" : "text-primary")} />
        </div>
      
      <div className="flex-1">
        <p className="font-bold text-card-foreground">{habit.name}</p>
        <p className="text-sm text-muted-foreground">{habit.details}</p>
      </div>
      
      <Button variant="ghost" size="icon" onClick={handleCheck} className="w-10 h-10 rounded-full">
        {isCompleted ? (
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Check className="w-5 h-5 text-primary-foreground" />
          </div>
        ) : (
          <Circle className="w-7 h-7 text-border" />
        )}
      </Button>
    </div>
  );
}
