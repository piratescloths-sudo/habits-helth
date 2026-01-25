"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AllHabits } from "@/components/app/all-habits";
import { AddHabitForm } from "@/components/app/add-habit-form";
import { habits as initialHabits, Habit } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>(initialHabits);
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const { toast } = useToast();

  const addHabit = (newHabitData: Omit<Habit, "id" | "streak" | "status">) => {
    const newHabit: Habit = {
      ...newHabitData,
      id: `habit-${Date.now()}`,
      streak: 0,
      status: "pending",
    };
    setHabits((prev) => [newHabit, ...prev]);
    setIsAddSheetOpen(false);
    toast({
      title: "Habit Added",
      description: `"${newHabit.name}" has been added to your list.`,
    });
  };

  const updateHabit = (updatedHabit: Habit) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === updatedHabit.id ? updatedHabit : h))
    );
    toast({
      title: "Habit Updated",
      description: `"${updatedHabit.name}" has been updated.`,
    });
  };

  const deleteHabit = (habitId: string) => {
    const habitToDelete = habits.find(h => h.id === habitId);
    setHabits((prev) => prev.filter((h) => h.id !== habitId));
    if (habitToDelete) {
      toast({
        title: "Habit Deleted",
        description: `"${habitToDelete.name}" has been deleted.`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-headline">All Habits</h1>
        <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
          <SheetTrigger asChild>
            <Button size="sm">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Habit
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="mb-6">
              <SheetTitle>Create a New Habit</SheetTitle>
              <SheetDescription>
                Fill in the details below to add a new habit to your routine.
              </SheetDescription>
            </SheetHeader>
            <AddHabitForm onFormSubmit={addHabit} />
          </SheetContent>
        </Sheet>
      </div>
      <AllHabits
        habits={habits}
        onUpdate={updateHabit}
        onDelete={deleteHabit}
      />
    </div>
  );
}
