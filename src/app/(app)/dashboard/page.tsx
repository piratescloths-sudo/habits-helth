"use client";

import { useState, useEffect } from "react";
import { WeekView } from "@/components/app/week-view";
import { HabitItem } from "@/components/app/habit-item";
import { AnimatePresence, motion } from "framer-motion";
import { MotivationalPrompt } from "@/components/app/motivational-prompt";
import { DashboardHeader } from "@/components/app/dashboard-header";
import { StreakCard } from "@/components/app/streak-card";
import { useHabits } from "@/components/app/habit-provider";
import { Button } from "@/components/ui/button";
import { useUser, useFirestore } from "@/firebase";
import { isToday, format, startOfDay, endOfDay } from "date-fns";
import { collection, query, where, getDocs } from "firebase/firestore";
import type { Habit, HabitRecord } from "@/lib/data";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { habits: habitsFromProvider, handleStatusChange, isLoadingHabits } = useHabits();
  const { user } = useUser();
  const firestore = useFirestore();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [displayedHabits, setDisplayedHabits] = useState<Habit[]>([]);
  const [isLoadingDate, setIsLoadingDate] = useState(true);

  useEffect(() => {
    if (!user || !firestore || isLoadingHabits) {
      if (isLoadingHabits) setIsLoadingDate(true);
      return;
    };

    const fetchHabitDataForDate = async () => {
      setIsLoadingDate(true);

      if (isToday(selectedDate)) {
        setDisplayedHabits(habitsFromProvider || []);
        setIsLoadingDate(false);
        return;
      }

      // For past or future dates, fetch from HabitRecords
      const start = startOfDay(selectedDate);
      const end = endOfDay(selectedDate);

      const habitsWithStatus = await Promise.all(
        (habitsFromProvider || []).map(async (habit) => {
          const recordsRef = collection(firestore, 'users', user.uid, 'habits', habit.id, 'records');
          const q = query(recordsRef, where('date', '>=', start), where('date', '<=', end));
          const snapshot = await getDocs(q);

          let status: 'completed' | 'pending' = 'pending';
          if (!snapshot.empty) {
            const record = snapshot.docs[0].data() as HabitRecord;
            if (record.status === 'Completed') {
              status = 'completed';
            }
          }
          return { ...habit, status };
        })
      );
      setDisplayedHabits(habitsWithStatus);
      setIsLoadingDate(false);
    };

    fetchHabitDataForDate();
  }, [selectedDate, habitsFromProvider, user, firestore, isLoadingHabits]);

  const dateIsToday = isToday(selectedDate);
  const headingText = dateIsToday
    ? "Today's Habits"
    : `Habits for ${format(selectedDate, "MMM d")}`;

  return (
    <div className="space-y-8 pt-6">
      <DashboardHeader />
      <StreakCard />
      <WeekView selectedDate={selectedDate} onDateSelect={setSelectedDate} />
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
            <h3 className="font-headline text-2xl font-bold">{headingText}</h3>
            {dateIsToday && <Button variant="link" className="text-primary">Edit</Button>}
        </div>
        <div className="space-y-3">
          {isLoadingDate ? (
            <div className="space-y-3">
              <Skeleton className="h-[76px] w-full rounded-xl" />
              <Skeleton className="h-[76px] w-full rounded-xl" />
              <Skeleton className="h-[76px] w-full rounded-xl" />
            </div>
          ) : (
            <AnimatePresence>
                {displayedHabits.map((habit) => (
                <motion.div
                    key={habit.id}
                    layout
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <HabitItem 
                      habit={habit} 
                      onStatusChange={() => dateIsToday && handleStatusChange(habit.id)} 
                    />
                </motion.div>
                ))}
            </AnimatePresence>
          )}
        </div>
      </div>
      <MotivationalPrompt />
    </div>
  );
}
