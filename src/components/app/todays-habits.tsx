"use client";

import { useHabits } from "./habit-provider";
import { HabitItem } from "./habit-item";
import { AnimatePresence, motion } from "framer-motion";

export function TodaysHabits() {
  const { habits, handleStatusChange } = useHabits();

  return (
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
  );
}
