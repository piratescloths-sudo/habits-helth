"use client";

import { useState } from "react";
import type { Habit } from "@/lib/data";
import { habits as initialHabits } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HabitItem } from "./habit-item";
import { AnimatePresence, motion } from "framer-motion";

export function TodaysHabits() {
  const [habits, setHabits] = useState(initialHabits);

  const handleStatusChange = (id: string, status: Habit["status"]) => {
    setHabits((prevHabits) =>
      prevHabits.map((h) => (h.id === id ? { ...h, status } : h))
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Today's Habits</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <AnimatePresence>
            {habits.map((habit) => (
              <motion.div
                key={habit.id}
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <HabitItem habit={habit} onStatusChange={handleStatusChange} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
