"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, MoreHorizontal } from "lucide-react";
import * as icons from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useHabits } from "@/components/app/habit-provider";

export default function HabitDetailPage() {
  const router = useRouter();
  const params = useParams();
  const habitId = params.id as string;

  const { habits, isLoadingHabits } = useHabits();
  
  const habit = habits.find(h => h.id === habitId);

  if (isLoadingHabits) {
    return (
      <div className="space-y-6 -mx-4 md:-mx-8 -mt-6 md:-mt-8">
        <header className="flex items-center justify-between p-4 bg-background z-10 sticky top-0 border-b">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <Skeleton className="h-6 w-32 rounded-md" />
            <Skeleton className="h-10 w-10 rounded-lg" />
        </header>
        <main className="px-4 space-y-6 pb-28 md:pb-8">
            <div className="text-center space-y-2">
                <Skeleton className="h-20 w-20 rounded-2xl mx-auto" />
                <Skeleton className="h-8 w-48 mx-auto mt-4" />
                <Skeleton className="h-5 w-64 mx-auto" />
            </div>
        </main>
      </div>
    );
  }

  if (!habit) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h2 className="text-2xl font-bold">Habit Not Found</h2>
        <p className="text-muted-foreground">This habit may have been deleted.</p>
        <Button onClick={() => router.push('/habits')} className="mt-4">
            Go to All Habits
        </Button>
      </div>
    );
  }

  const Icon = (icons as any)[habit.icon] || icons.Activity;

  return (
    <div className="space-y-6 -mx-4 md:-mx-8 -mt-6 md:-mt-8 bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-background z-10 sticky top-0 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-bold font-headline">Habit Details</h1>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-6 w-6" />
        </Button>
      </header>

      <main className="px-4 space-y-6 pb-28 md:pb-8">
        {/* Habit Info */}
        <div className="text-center space-y-2">
          <div className="inline-block p-4 bg-card rounded-2xl mb-2">
            <Icon className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold font-headline">{habit.name}</h2>
          <p className="text-muted-foreground">{habit.description}</p>
        </div>
      </main>
    </div>
  );
}
