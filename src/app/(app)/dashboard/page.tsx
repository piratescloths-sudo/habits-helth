"use client";

import { WeekView } from "@/components/app/week-view";
import { HabitItem } from "@/components/app/habit-item";
import { AnimatePresence, motion } from "framer-motion";
import { MotivationalPrompt } from "@/components/app/motivational-prompt";
import { DashboardHeader } from "@/components/app/dashboard-header";
import { StreakCard } from "@/components/app/streak-card";
import { useHabits } from "@/components/app/habit-provider";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { habits, handleStatusChange } = useHabits();

  return (
    <div className="space-y-8 pt-6">
      <DashboardHeader />
      <StreakCard />
      <WeekView />
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
            <h3 className="font-headline text-2xl font-bold">Today's Habits</h3>
            <Button variant="link" className="text-primary">Edit</Button>
        </div>
        <div className="space-y-3">
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
                    <HabitItem habit={habit} onStatusChange={() => handleStatusChange(habit.id)} />
                </motion.div>
                ))}
            </AnimatePresence>
        </div>
      </div>
      <MotivationalPrompt />
    </div>
  );
}
