export type Habit = {
  id: string;
  name: string;
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
    category: "Health",
    frequency: "Daily",
    priority: "High",
    streak: 12,
    status: "completed",
  },
  {
    id: "2",
    name: "Exercise for 30 minutes",
    category: "Health",
    frequency: "Daily",
    priority: "Medium",
    streak: 5,
    status: "pending",
  },
  {
    id: "3",
    name: "Read 10 pages of a book",
    category: "Study",
    frequency: "Daily",
    priority: "Medium",
    streak: 23,
    status: "pending",
  },
  {
    id: "4",
    name: "Weekly project review",
    category: "Work",
    frequency: "Weekly",
    priority: "High",
    streak: 8,
    status: "skipped",
  },
  {
    id: "5",
    name: "Meditate for 10 minutes",
    category: "Personal",
    frequency: "Daily",
    priority: "Low",
    streak: 2,
    status: "completed",
  },
  {
    id: "6",
    name: "Learn a new German word",
    category: "Study",
    frequency: "Daily",
    priority: "Low",
    streak: 130,
    status: "missed",
  },
];

export const userProfile = {
  name: "Alex Doe",
  email: "alex.doe@example.com",
  age: 28,
  goals: "Fitness, Productivity",
  preferredTime: "Morning",
};
