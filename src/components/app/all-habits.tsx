"use client";

import type { Habit } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Trash2, ChevronRight } from "lucide-react";
import { Card } from "../ui/card";
import * as icons from "lucide-react";
import Link from "next/link";

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
          <Link href={`/habits/${habit.id}`} key={habit.id} className="block group">
            <div
              className="flex items-center rounded-lg border p-3 bg-card group-hover:bg-accent transition-colors"
            >
              <div className={("flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary")}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 ml-4">
                <p className="font-medium">{habit.name}</p>
                <p className="text-sm text-muted-foreground">{habit.description}</p>
              </div>
              {onDelete ? (
                  <Button variant="ghost" size="icon" onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onDelete(habit.id);
                  }} className="h-8 w-8 flex-shrink-0 text-destructive hover:bg-destructive/20 z-10 relative">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete habit</span>
                  </Button>
              ) : (
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
          </Link>
        )
      })}
    </div>
  );
}
