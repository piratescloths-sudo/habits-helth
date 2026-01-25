"use client";

import type { Habit } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Card } from "../ui/card";
import * as icons from "lucide-react";

type AllHabitsProps = {
  habits: Habit[];
  onDelete?: (habitId: string) => void;
};

export function AllHabits({ habits, onDelete }: AllHabitsProps) {
  
  if (habits.length === 0) {
    return (
        <Card className="text-center p-8 border-dashed bg-card">
            <p className="text-muted-foreground">You haven't added any habits yet.</p>
            <p className="text-muted-foreground text-sm">Click the "+" button to get started!</p>
        </Card>
    )
  }

  return (
    <div className="space-y-2">
      {habits.map((habit) => {
        const Icon = (icons as any)[habit.icon] || icons.Activity;
        return (
          <div
            key={habit.id}
            className="flex items-center rounded-lg border p-3 bg-card"
          >
            <Icon className="h-5 w-5 mr-4 text-primary" />
            <div className="flex-1">
              <p className="font-medium">{habit.name}</p>
              <p className="text-sm text-muted-foreground">{habit.description}</p>
            </div>
            {onDelete && (
                <Button variant="ghost" size="icon" onClick={() => onDelete(habit.id)} className="h-8 w-8 flex-shrink-0 text-destructive">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete habit</span>
                </Button>
            )}
          </div>
        )
      })}
    </div>
  );
}
