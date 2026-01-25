"use client";

import { AllHabits } from "@/components/app/all-habits";
import { useHabits } from "@/components/app/habit-provider";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function HabitsPage() {
  const { habits, deleteHabit, setIsAddDialogOpen } = useHabits();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-headline">All Habits</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Habit
        </Button>
      </div>
      <AllHabits
        habits={habits}
        onDelete={deleteHabit}
      />
    </div>
  );
}
