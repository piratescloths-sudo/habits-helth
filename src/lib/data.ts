export type Habit = {
  id: string;
  name: string;
  description: string;
  icon: string; // lucide-react icon name
  status: "completed" | "pending";
};

export const habits: Habit[] = [
  {
    id: "1",
    name: "Drink 2L Water",
    description: "Done at 08:32 AM",
    icon: "Droplet",
    status: "completed",
  },
  {
    id: "2",
    name: "Meditation",
    description: "Daily • 15 Minutes",
    icon: "Wind",
    status: "pending",
  },
  {
    id: "3",
    name: "Read 10 Pages",
    description: "Evening • Goal: 300 pgs",
    icon: "BookOpen",
    status: "pending",
  },
   {
    id: "4",
    name: "Gym Session",
    description: "3x Weekly • 05:00 PM",
    icon: "Dumbbell",
    status: "pending",
  },
];

export const userProfile = {
  name: "Alex",
  email: "alex.doe@example.com",
  age: 28,
  goals: "Fitness, Productivity",
  preferredTime: "Morning",
  levelTitle: "Level 12 Habit Master",
};
