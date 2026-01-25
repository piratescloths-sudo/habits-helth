"use client";

import { useState } from "react";
import { format } from "date-fns";
import { WeekView } from "@/components/app/week-view";
import { HabitItem } from "@/components/app/habit-item";
import { habits as initialHabits, Habit } from "@/lib/data";
import { AnimatePresence, motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

export default function DashboardPage() {
  const [habits, setHabits] = useState(initialHabits);
  const [date, setDate] = useState(new Date());

  const handleStatusChange = (id: string, status: Habit["status"]) => {
    setHabits((prevHabits) =>
      prevHabits.map((h) => (h.id === id ? { ...h, status } : h))
    );
  };

  const completedCount = habits.filter((h) => h.status === "completed").length;
  const totalCount = habits.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="px-4">
        <h2 className="text-lg font-medium text-muted-foreground">
          {format(date, "MMMM d, yyyy")}
        </h2>
        <h1 className="text-4xl font-bold font-headline">Your Checklist</h1>
      </div>
      <WeekView />

      <div className="px-4 space-y-4">
        <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-muted-foreground">Daily Target</span>
                <span>{completedCount}/{totalCount}</span>
            </div>
            <Progress value={progress} className="h-2" />
        </div>

        <div className="space-y-3">
            <h3 className="font-headline text-2xl font-bold">Today</h3>
            <AnimatePresence>
                {habits.map((habit) => (
                <motion.div
                    key={habit.id}
                    layout
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <HabitItem habit={habit} onStatusChange={handleStatusChange} />
                </motion.div>
                ))}
            </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
