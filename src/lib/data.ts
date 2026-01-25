export type Habit = {
  id: string;
  name: string;
  time: string;
  icon: string; // lucide-react icon name
  status: "completed" | "pending";
};

export const habits: Habit[] = [
  {
    id: "1",
    name: "Drink Water",
    time: "8:00 AM",
    icon: "GlassWater",
    status: "completed",
  },
  {
    id: "2",
    name: "Workout for 30 minutes",
    time: "9:00 AM",
    icon: "Dumbbell",
    status: "pending",
  },
  {
    id: "3",
    name: "Read a book",
    time: "9:30 PM",
    icon: "BookOpen",
    status: "pending",
  },
   {
    id: "4",
    name: "Write journal",
    time: "10:00 PM",
    icon: "PenSquare",
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
