'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { habits as initialHabits, Habit } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

type HabitContextType = {
  habits: Habit[];
  addHabit: (newHabitData: { name: string; description: string; }) => void;
  deleteHabit: (habitId: string) => void;
  handleStatusChange: (id: string) => void;
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (isOpen: boolean) => void;
};

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export function HabitProvider({ children }: { children: ReactNode }) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedHabits = localStorage.getItem('habits');
    if (storedHabits) {
      setHabits(JSON.parse(storedHabits));
    } else {
      setHabits(initialHabits);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('habits', JSON.stringify(habits));
    }
  }, [habits, isClient]);


  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleStatusChange = (id: string) => {
    setHabits((prevHabits) =>
      prevHabits.map((h) => {
        if (h.id === id) {
          const newStatus = h.status === 'completed' ? 'pending' : 'completed';
          return { ...h, status: newStatus };
        }
        return h;
      })
    );
  };
  
  const addHabit = (newHabitData: { name: string; description: string; }) => {
    const newHabit: Habit = {
      id: `habit-${Date.now()}`,
      name: newHabitData.name,
      description: newHabitData.description,
      icon: 'Activity', // default icon
      status: 'pending',
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
    <HabitContext.Provider value={{ habits, addHabit, deleteHabit, handleStatusChange, isAddDialogOpen, setIsAddDialogOpen }}>
      {children}
    </HabitContext.Provider>
  );
}

export function useHabits() {
  const context = useContext(HabitContext);
  if (context === undefined) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
}
