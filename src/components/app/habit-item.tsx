"use client";

import type { Habit } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import * as icons from "lucide-react";
import { Check, X, Pause, MoreVertical } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function HabitItem({
  habit,
  onStatusChange,
}: {
  habit: Habit;
  onStatusChange: (id: string, status: Habit["status"]) => void;
}) {
  const Icon = (icons as any)[habit.icon] || icons.Activity;

  const handleStatusChange = (newStatus: Habit["status"]) => {
    onStatusChange(habit.id, newStatus);
  };

  const isCompleted = habit.status === "completed";
  const isSkipped = habit.status === "skipped";
  const isMissed = habit.status === "missed";

  return (
    <Card
      className={cn(
        "transition-all",
        isCompleted && "bg-primary/10 border-primary/20",
        (isSkipped || isMissed) && "bg-muted/50"
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-center">
          <div
            className={cn(
              "mr-4 flex h-12 w-12 items-center justify-center rounded-lg",
              isCompleted ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="font-semibold">{habit.name}</p>
            <p className="text-sm text-muted-foreground">{habit.details}</p>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
        {!isCompleted && (
          <div className="mt-4 grid grid-cols-3 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleStatusChange("completed")}
            >
              <Check className="mr-2" /> Mark Done
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleStatusChange("skipped")}
            >
              <Pause className="mr-2" /> Skip
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleStatusChange("missed")}
            >
              <X className="mr-2" /> Miss
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
