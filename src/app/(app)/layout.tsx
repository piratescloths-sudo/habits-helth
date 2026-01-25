"use client";

import { BottomNav } from "@/components/app/bottom-nav";
import { AddHabitForm } from "@/components/app/add-habit-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { HabitProvider, useHabits } from "@/components/app/habit-provider";

function AppLayoutContent({ children }: { children: React.ReactNode }) {
  const { isAddDialogOpen, setIsAddDialogOpen, addHabit } = useHabits();

  return (
    <>
      <div className="relative flex min-h-dvh w-full flex-col bg-background">
        <main className="flex-1 pb-28 px-4">{children}</main>
        <BottomNav />
      </div>
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Habit</DialogTitle>
            <DialogDescription>
              Add a new habit to your checklist.
            </DialogDescription>
          </DialogHeader>
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
