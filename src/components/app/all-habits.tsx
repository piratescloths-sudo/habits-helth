"use client";

import { useState } from "react";
import type { Habit } from "@/lib/data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import { AddHabitForm } from "./add-habit-form";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

type AllHabitsProps = {
  habits: Habit[];
  onUpdate: (habit: Habit) => void;
  onDelete: (habitId: string) => void;
};

export function AllHabits({ habits, onUpdate, onDelete }: AllHabitsProps) {
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [deletingHabitId, setDeletingHabitId] = useState<string | null>(null);

  const categories = [...new Set(habits.map((h) => h.category))];

  const handleUpdate = (data: Omit<Habit, 'id' | 'streak' | 'status'>) => {
    if (editingHabit) {
      onUpdate({ ...editingHabit, ...data });
      setEditingHabit(null);
    }
  };

  const handleDeleteConfirm = () => {
    if (deletingHabitId) {
      onDelete(deletingHabitId);
      setDeletingHabitId(null);
    }
  };
  
  if (habits.length === 0) {
    return (
        <Card className="text-center p-8 border-dashed">
            <p className="text-muted-foreground">You haven't added any habits yet.</p>
            <p className="text-muted-foreground text-sm">Click "New Habit" to get started!</p>
        </Card>
    )
  }

  return (
    <>
      <Accordion type="multiple" defaultValue={categories} className="w-full space-y-4">
        {categories.map((category) => (
          <AccordionItem key={category} value={category} className="border-b-0 rounded-lg overflow-hidden">
            <Card>
              <AccordionTrigger className="p-4 font-headline text-lg hover:no-underline [&[data-state=open]]:border-b">
                {category}
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-0">
                <div className="space-y-2">
                  {habits
                    .filter((h) => h.category === category)
                    .map((habit) => (
                      <div
                        key={habit.id}
                        className="flex items-center rounded-lg border p-3"
                      >
                        <div className="flex-1">
                          <p className="font-medium">{habit.name}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{habit.frequency}</span>
                            <Badge variant={habit.priority === 'High' ? 'destructive' : habit.priority === 'Medium' ? 'secondary' : 'outline'} className="capitalize">{habit.priority}</Badge>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">More options</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => setEditingHabit(habit)}>
                              <Edit className="mr-2" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setDeletingHabitId(habit.id)} className="text-destructive focus:text-destructive">
                              <Trash2 className="mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))}
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>
        ))}
      </Accordion>

      <Sheet open={!!editingHabit} onOpenChange={(isOpen) => !isOpen && setEditingHabit(null)}>
        <SheetContent>
          <SheetHeader className="mb-6">
            <SheetTitle>Edit Habit</SheetTitle>
            <SheetDescription>Update the details of your habit.</SheetDescription>
          </SheetHeader>
          {editingHabit && (
            <AddHabitForm
              isEditMode
              defaultValues={editingHabit}
              onFormSubmit={handleUpdate}
            />
          )}
        </SheetContent>
      </Sheet>

      <AlertDialog open={!!deletingHabitId} onOpenChange={(isOpen) => !isOpen && setDeletingHabitId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              habit and all its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
