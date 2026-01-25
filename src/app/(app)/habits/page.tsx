"use client";

import { AllHabits } from "@/components/app/all-habits";
import { useHabits } from "@/components/app/habit-provider";

export default function HabitsPage() {
  const { habits, deleteHabit } = useHabits();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-headline">All Habits</h1>
      </div>
      <AllHabits
        habits={habits}
        onDelete={deleteHabit}
      />
    </div>
  );
}
