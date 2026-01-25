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

  const addHabit = (newHabitData: Omit<Habit, "id" | "status" | "icon" >) => {
    
    const newHabit: Habit = {
      ...newHabitData,
      id: `habit-${Date.now()}`,
      status: "pending",
      icon: 'Activity' // default icon
    };

    setHabits((prev) => [newHabit, ...prev]);
    setIsAddDialogOpen(false);
    toast({
      title: "Habit Added",
      description: `"${newHabit.name}" has been added to your list.`,
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
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-headline">All Habits</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Habit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Habit</DialogTitle>
              <DialogDescription>
                Add a new habit to your checklist.
              </DialogDescription>
            </DialogHeader>
            <AddHabitForm 
                onFormSubmit={addHabit}
            />
          </DialogContent>
        </Dialog>
      </div>
      <AllHabits
        habits={habits}
        onDelete={deleteHabit}
      />
    </div>
  );
}
