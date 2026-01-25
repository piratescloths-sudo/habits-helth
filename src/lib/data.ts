export type HabitHistory = {
  date: string;
  status: "completed" | "missed" | "logged";
  details: string;
};

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
  goal?: string;
  streak?: {
    current: number;
    personalBest: number;
  };
  stats?: {
    total: string;
    rate: string;
    avg: string;
  };
  weeklyCompletion?: {
    percentage: number;
    change: string;
    data: { day: string; value: number }[];
  };
  history?: HabitHistory[];
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
