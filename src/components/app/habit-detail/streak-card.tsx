"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Zap } from "lucide-react";
import type { HabitRecord } from "@/lib/data";
import { isToday, isYesterday, differenceInCalendarDays, startOfDay } from "date-fns";
import { useEffect, useState } from "react";

function calculateStreaks(records: HabitRecord[]): { currentStreak: number; bestStreak: number } {
  if (!records || records.length === 0) {
    return { currentStreak: 0, bestStreak: 0 };
  }

  const completedDates = [
    ...new Set(
      records
        .filter((r) => r.status === 'Completed' && r.date)
        .map((r) => startOfDay(r.date.toDate()).getTime())
    ),
  ].sort((a, b) => b - a).map(t => new Date(t));

  if (completedDates.length === 0) {
    return { currentStreak: 0, bestStreak: 0 };
  }

  // Calculate best streak
  let bestStreak = 0;
  if (completedDates.length > 0) {
    let currentTempStreak = 1;
    bestStreak = 1;
    for (let i = 0; i < completedDates.length - 1; i++) {
      const diff = differenceInCalendarDays(completedDates[i], completedDates[i + 1]);
      if (diff === 1) {
        currentTempStreak++;
      } else {
        bestStreak = Math.max(bestStreak, currentTempStreak);
        currentTempStreak = 1;
      }
    }
    bestStreak = Math.max(bestStreak, currentTempStreak);
  }

  // Calculate current streak
  let currentStreak = 0;
  const mostRecentCompletion = completedDates[0];
  if (isToday(mostRecentCompletion) || isYesterday(mostRecentCompletion)) {
    currentStreak = 1;
    for (let i = 0; i < completedDates.length - 1; i++) {
      const diff = differenceInCalendarDays(completedDates[i], completedDates[i + 1]);
      if (diff === 1) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  return { currentStreak, bestStreak };
}

export function HabitStreakCard({ habitRecords }: { habitRecords: HabitRecord[] }) {
    const [streaks, setStreaks] = useState({ currentStreak: 0, bestStreak: 0 });

    useEffect(() => {
        if (habitRecords) {
            setStreaks(calculateStreaks(habitRecords));
        }
    }, [habitRecords]);

    return (
        <Card className="bg-card p-6 text-center">
            <CardContent className="p-0">
                <p className="text-xs font-semibold uppercase text-primary tracking-widest">Current Streak</p>
                <p className="text-6xl font-bold my-2">{streaks.currentStreak} <span className="text-4xl font-semibold text-muted-foreground">Days</span></p>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Zap className="h-4 w-4 text-yellow-400" />
                    <span>Personal Best: {streaks.bestStreak} Days</span>
                </div>
            </CardContent>
        </Card>
    );
}
