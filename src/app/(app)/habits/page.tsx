"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AllHabits } from "@/components/app/all-habits";
import { AddHabitForm } from "@/components/app/add-habit-form";
import { habits as initialHabits, Habit } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>(initialHabits);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

  const addHabit = (newHabitData: Omit<Habit, "id" | "streak" | "status" | "icon" | "details" | "customDays" >) => {
    
    const categoryIcons: { [key in Habit['category']]: string } = {
      Health: "Heart",
      Study: "Book",
      Work: "Briefcase",
      Personal: "User",
    };

    const newHabit: Habit = {
      ...newHabitData,
      id: `habit-${Date.now()}`,
      streak: 0,
      status: "pending",
      icon: categoryIcons[newHabitData.category] || 'Activity',
      details: `${newHabitData.frequency} • ${newHabitData.priority} Priority`,
    };

    setHabits((prev) => [newHabit, ...prev]);
    setIsAddDialogOpen(false);
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
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Habit
            </Button>
          </DialogTrigger>
          <DialogContent className="h-full w-full max-h-dvh max-w-full p-0 sm:max-w-md sm:h-[90dvh] rounded-none sm:rounded-lg overflow-hidden">
            <DialogHeader className="sr-only">
              <DialogTitle>New Habit</DialogTitle>
              <DialogDescription>
                Use this form to add a new habit to your tracking list.
              </DialogDescription>
            </DialogHeader>
            <AddHabitForm 
                onFormSubmit={addHabit} 
                onClose={() => setIsAddDialogOpen(false)} 
            />
          </DialogContent>
        </Dialog>
      </div>
      <AllHabits
        habits={habits}
        onUpdate={updateHabit}
        onDelete={deleteHabit}
      />
    </div>
  );
}
