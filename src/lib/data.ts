export type Habit = {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: "completed" | "pending";
  priority?: "Low" | "Medium" | "High";
  category: "Health" | "Study" | "Work" | "Personal";
  frequency: "Daily" | "Weekly" | "Custom";
  userProfileId: string;
  startDate: any; // Can be a server timestamp
};

export type UserProfile = {
    id: string;
    name: string;
    email: string;
    age?: number;
    goals?: string;
    preferredTime?: "Morning" | "Afternoon" | "Night";
    levelTitle?: string;
}

export type HabitRecord = {
  id: string;
  habitId: string;
  date: any; // Firestore timestamp
  status: "Completed" | "Missed" | "Skipped";
  notes?: string;
};
