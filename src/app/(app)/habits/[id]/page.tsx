"use client";

import { useParams, useRouter } from "next/navigation";
import { Habit } from "@/lib/data";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  MoreHorizontal,
} from "lucide-react";
import * as icons from "lucide-react";
import { useUser, useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";

export default function HabitDetailPage() {
  const router = useRouter();
  const params = useParams();
  const habitId = params.id as string;
  
  const { user } = useUser();
  const firestore = useFirestore();

  const habitRef = useMemoFirebase(() => {
    if (!user || !habitId) return null;
    return doc(firestore, 'users', user.uid, 'habits', habitId);
  }, [firestore, user, habitId]);
  
  const { data: habit, isLoading } = useDoc<Habit>(habitRef);

  if (isLoading) {
    return <div className="space-y-6">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-64 w-full" />
    </div>
  }

  if (!habit) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Habit not found.</p>
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
