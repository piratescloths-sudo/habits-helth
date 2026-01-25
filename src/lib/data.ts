export type Habit = {
  id: string;
  name: string;
  icon: string; // lucide-react icon name
  details: string;
  category: "Health" | "Study" | "Work" | "Personal";
  frequency: "Daily" | "Weekly" | "Custom";
  customDays?: number[]; // 0 for Sunday, 1 for Monday, etc.
  priority: "Low" | "Medium" | "High";
  streak: number;
  status: "completed" | "missed" | "skipped" | "pending";
};

export const habits: Habit[] = [
  {
    id: "1",
    name: "Drink 2L Water",
    icon: "Droplet",
    details: "Done at 08:32 AM",
    category: "Health",
    frequency: "Daily",
    priority: "High",
    streak: 12,
    status: "completed",
  },
  {
    id: "2",
    name: "Meditation",
    icon: "BrainCircuit",
    details: "Daily • 15 Minutes",
    category: "Personal",
    frequency: "Daily",
    priority: "Medium",
    streak: 5,
    status: "pending",
  },
  {
    id: "3",
    name: "Read 10 Pages",
    icon: "Book",
    details: "Evening • Goal: 300 pgs",
    category: "Study",
    frequency: "Daily",
    priority: "Medium",
    streak: 23,
    status: "pending",
  },
  {
    id: "4",
    name: "Gym Session",
    icon: "Dumbbell",
    details: "3x Weekly • 05:00 PM",
    category: "Health",
    frequency: "Weekly",
    priority: "High",
    streak: 8,
    status: "pending",
  },
];

export const userProfile = {
  name: "Alex Doe",
  email: "alex.doe@example.com",
  age: 28,
  goals: "Fitness, Productivity",
  preferredTime: "Morning",
};
