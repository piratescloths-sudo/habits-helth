"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/app/bottom-nav";
import { AddHabitForm } from "@/components/app/add-habit-form";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { HabitProvider, useHabits } from "@/components/app/habit-provider";
import { Sidebar } from "@/components/app/sidebar";
import { useUser } from "@/firebase";
import { Skeleton } from "@/components/ui/skeleton";

function AppLayoutContent({ children }: { children: React.ReactNode }) {
  const { isAddDialogOpen, setIsAddDialogOpen, addHabit } = useHabits();
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace("/");
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
      <div className="flex min-h-dvh w-full bg-background">
        <aside className="hidden md:flex flex-col w-64 border-r bg-card p-4 space-y-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
        </aside>
        <main className="flex-1 p-8 space-y-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-64 w-full" />
        </main>
      </div>
    );
  }

  return (
    <>
      <div className="flex min-h-dvh w-full bg-background">
        <Sidebar />
        <main className="flex-1 pb-28 md:pb-8 px-4 md:px-8 pt-6 md:pt-8">
            {children}
        </main>
      </div>
      <BottomNav />
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="p-0 bg-card border-none">
          <DialogTitle className="sr-only">Add New Habit</DialogTitle>
          <AddHabitForm onFormSubmit={addHabit} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <HabitProvider>
      <AppLayoutContent>{children}</AppLayoutContent>
    </HabitProvider>
  );
}
