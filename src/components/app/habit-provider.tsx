'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { AddHabitFormValues } from './add-habit-form';
import { useUser, useFirestore, useCollection, useMemoFirebase, addDocumentNonBlocking, deleteDocumentNonBlocking, updateDocumentNonBlocking, setDocumentNonBlocking } from '@/firebase';
import { collection, doc, serverTimestamp, getDoc, writeBatch } from 'firebase/firestore';
import { Habit } from '@/lib/data';
import { format, startOfToday, subDays } from 'date-fns';

type HabitContextType = {
  habits: Habit[];
  isLoadingHabits: boolean;
  addHabit: (newHabitData: AddHabitFormValues) => void;
  deleteHabit: (habitId: string) => void;
  handleStatusChange: (id: string) => void;
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (isOpen: boolean) => void;
};

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export function HabitProvider({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [missedHabitsChecked, setMissedHabitsChecked] = useState(false);

  const habitsQuery = useMemoFirebase(() => {
    if (!user) return null;
    return collection(firestore, 'users', user.uid, 'habits');
  }, [firestore, user]);

  const { data: habits, isLoading: isLoadingHabits } = useCollection<Habit>(habitsQuery);

  useEffect(() => {
    if (isLoadingHabits || !habits || !user || !firestore || missedHabitsChecked) {
      return;
    }
    setMissedHabitsChecked(true); // Run only once per session

    const checkYesterdaysHabits = async () => {
      const yesterday = subDays(startOfToday(), 1);
      const yesterdayStr = format(yesterday, 'yyyy-MM-dd');
      const batch = writeBatch(firestore);
      let hasWrites = false;

      for (const habit of habits) {
        // Only handle daily habits for now.
        if (habit.frequency !== 'Daily') {
          continue;
        }

        // Don't check for habits that started after yesterday
        if (habit.startDate?.toDate && habit.startDate.toDate() > yesterday) {
          continue;
        }

        const recordRef = doc(firestore, 'users', user.uid, 'habits', habit.id, 'records', yesterdayStr);
        
        try {
            const docSnap = await getDoc(recordRef);
            if (!docSnap.exists()) {
                batch.set(recordRef, {
                    habitId: habit.id,
                    date: yesterday,
                    status: 'Missed',
                });
                hasWrites = true;
            }
        } catch (error) {
            console.error("Error checking habit record:", error);
        }
      }

      if (hasWrites) {
        try {
            await batch.commit();
        } catch (error) {
            console.error("Error committing missed habits batch:", error);
        }
      }
    };

    checkYesterdaysHabits();
  }, [habits, isLoadingHabits, user, firestore, missedHabitsChecked]);


  const handleStatusChange = (id: string) => {
    if (!user || !firestore || !habits) return;
    const habit = habits.find((h) => h.id === id);
    if (habit) {
      const newStatus = habit.status === 'completed' ? 'pending' : 'completed';
      
      // Update the habit object for immediate UI refresh on dashboard
      const habitRef = doc(firestore, 'users', user.uid, 'habits', id);
      updateDocumentNonBlocking(habitRef, { status: newStatus });

      // Manage the habit record for today to track history
      const todayStr = format(new Date(), 'yyyy-MM-dd');
      const recordRef = doc(firestore, 'users', user.uid, 'habits', id, 'records', todayStr);

      if (newStatus === 'completed') {
        // Create or overwrite today's record as 'Completed'
        setDocumentNonBlocking(recordRef, {
            habitId: id,
            date: serverTimestamp(),
            status: 'Completed',
        }, {});
      } else {
        // If un-completing, delete the record for today
        deleteDocumentNonBlocking(recordRef);
      }
    }
  };
  
  const addHabit = (data: AddHabitFormValues) => {
    if (!user) return;
    const habitsColRef = collection(firestore, 'users', user.uid, 'habits');

    const iconMap: { [key: string]: string } = {
      Health: 'Heart',
      Study: 'BookOpen',
      Work: 'Briefcase',
      Personal: 'User',
    };

    let description = data.frequency;
    if (data.frequency === 'Weekly' && data.days && data.days.length > 0) {
        description += ` on ${data.days.join(', ')}`;
    } else if (data.frequency === 'Custom') {
        description = 'Custom days';
    }

    if (data.reminder && data.time) {
        description += ` at ${data.time.hour}:${data.time.minute} ${data.time.period}`;
    }

    const newHabitData = {
      userProfileId: user.uid,
      name: data.name,
      description: description,
      icon: iconMap[data.category] || 'Activity',
      status: 'pending' as const,
      priority: data.priority,
      category: data.category,
      frequency: data.frequency,
      startDate: serverTimestamp(),
    };

    addDocumentNonBlocking(habitsColRef, newHabitData).catch(() => {
        toast({
            title: "Error",
            description: "Could not add habit. Please try again.",
            variant: "destructive"
        })
    });
    
    setIsAddDialogOpen(false);
    toast({
      title: "Habit Added",
      description: `"${newHabitData.name}" has been added to your list.`,
    });
  };

  const deleteHabit = (habitId: string) => {
    if (!user || !habits) return;
    const habitToDelete = habits.find(h => h.id === habitId);
    if (habitToDelete) {
      const habitRef = doc(firestore, 'users', user.uid, 'habits', habitId);
      deleteDocumentNonBlocking(habitRef);
      toast({
        title: "Habit Deleted",
        description: `"${habitToDelete.name}" has been deleted.`,
        variant: "destructive",
      });
    }
  };

  return (
    <HabitContext.Provider value={{ habits: habits || [], addHabit, deleteHabit, handleStatusChange, isAddDialogOpen, setIsAddDialogOpen, isLoadingHabits }}>
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
