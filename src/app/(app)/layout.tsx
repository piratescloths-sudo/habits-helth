"use client";

import { BottomNav } from "@/components/app/bottom-nav";
import { AddHabitForm } from "@/components/app/add-habit-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { HabitProvider, useHabits } from "@/components/app/habit-provider";
import { Sidebar } from "@/components/app/sidebar";

function AppLayoutContent({ children }: { children: React.ReactNode }) {
  const { isAddDialogOpen, setIsAddDialogOpen, addHabit } = useHabits();

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
          <DialogDescription className="sr-only">A form to create a new habit to track.</DialogDescription>
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
