"use client";

import { useState } from "react";
import type { Habit } from "@/lib/data";
import { habits as initialHabits } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HabitItem } from "./habit-item";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";

export function TodaysHabits() {
  const [habits, setHabits] = useState(initialHabits);

  const handleStatusChange = (id: string, status: Habit["status"]) => {
    setHabits((prevHabits) =>
      prevHabits.map((h) => (h.id === id ? { ...h, status } : h))
    );
  };

  return (
    <Card className="bg-transparent border-0 shadow-none">
      <CardHeader className="px-0">
        <div className="flex justify-between items-center">
            <CardTitle className="font-headline text-xl">Today's Habits</CardTitle>
            <Link href="/habits">
              <Button variant="link" className="text-primary">Edit</Button>
            </Link>
        </div>
      </CardHeader>
      <CardContent className="p-0">
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
