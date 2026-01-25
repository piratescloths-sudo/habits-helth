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
    name: "Drink 8 glasses of water",
    icon: "Droplet",
    details: "Daily • High Priority",
    category: "Health",
    frequency: "Daily",
    priority: "High",
    streak: 12,
    status: "pending",
  },
  {
    id: "2",
    name: "Read for 30 minutes",
    icon: "Book",
    details: "Daily • Medium Priority",
    category: "Study",
    frequency: "Daily",
    priority: "Medium",
    streak: 5,
    status: "pending",
  },
  {
    id: "3",
    name: "Finish a work report",
    icon: "Briefcase",
    details: "Weekly • High Priority",
    category: "Work",
    frequency: "Weekly",
    priority: "High",
    streak: 8,
    status: "pending",
  },
  {
    id: "4",
    name: "Meditate for 10 minutes",
    icon: "User",
    details: "Daily • Medium Priority",
    category: "Personal",
    frequency: "Daily",
    priority: "Medium",
    streak: 23,
    status: "pending",
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
