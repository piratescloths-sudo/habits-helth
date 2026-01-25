export type Habit = {
  id: string;
  name: string;
  icon: string; // lucide-react icon name
  details: string;
  category: "HEALTH & WELLNESS" | "MINDFULNESS" | "FITNESS" | "GROWTH";
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
    details: "HEALTH & WELLNESS",
    category: "HEALTH & WELLNESS",
    frequency: "Daily",
    priority: "High",
    streak: 12,
    status: "completed",
  },
  {
    id: "2",
    name: "10 Min Meditation",
    icon: "BrainCircuit",
    details: "MINDFULNESS",
    category: "MINDFULNESS",
    frequency: "Daily",
    priority: "Medium",
    streak: 5,
    status: "pending",
  },
  {
    id: "3",
    name: "Evening Gym Session",
    icon: "Dumbbell",
    details: "FITNESS",
    category: "FITNESS",
    frequency: "Weekly",
    priority: "High",
    streak: 8,
    status: "pending",
  },
  {
    id: "4",
    name: "Read 10 Pages",
    icon: "BookOpen",
    details: "GROWTH",
    category: "GROWTH",
    frequency: "Daily",
    priority: "Medium",
    streak: 23,
    status: "completed",
  },
];

export const userProfile = {
  name: "Alex Johnson",
  email: "alex.doe@example.com",
  age: 28,
  goals: "Fitness, Productivity",
  preferredTime: "Morning",
  levelTitle: "Level 12 Habit Master",
};
