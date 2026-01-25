export type HabitHistory = {
  date: string;
  status: "completed" | "missed" | "logged";
  details: string;
};

export type Habit = {
  id: string;
  name: string;
  description: string;
  icon: string; // lucide-react icon name
  status: "completed" | "pending";
  priority?: "Low" | "Medium" | "High";
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

export const habits: Habit[] = [
  {
    id: "1",
    name: "Drink Water",
    description: "Daily goal: 2.5L",
    icon: "Droplet",
    status: "completed",
    priority: "Medium",
    goal: "2.5L daily",
    streak: {
      current: 12,
      personalBest: 24,
    },
    stats: {
      total: "142",
      rate: "92%",
      avg: "2.1L",
    },
    weeklyCompletion: {
      percentage: 85,
      change: "+15% WEEK",
      data: [
        { day: "M", value: 40 },
        { day: "T", value: 60 },
        { day: "W", value: 90 },
        { day: "T", value: 70 },
        { day: "F", value: 45 },
        { day: "S", value: 80 },
        { day: "S", value: 30 },
      ],
    },
    history: [
      {
        date: "Today, 8:45 AM",
        status: "logged",
        details: "250ml logged",
      },
      {
        date: "Yesterday, 9:20 PM",
        status: "completed",
        details: "Daily goal met",
      },
      {
        date: "Oct 24, 2023",
        status: "missed",
        details: "Goal missed by 400ml",
      },
    ],
  },
  {
    id: "2",
    name: "Meditation",
    description: "Daily • 15 Minutes",
    icon: "Wind",
    status: "pending",
    priority: "Low",
  },
  {
    id: "3",
    name: "Read 10 Pages",
    description: "Evening • Goal: 300 pgs",
    icon: "BookOpen",
    status: "pending",
    priority: "High",
  },
   {
    id: "4",
    name: "Gym Session",
    description: "3x Weekly • 05:00 PM",
    icon: "Dumbbell",
    status: "pending",
    priority: "Medium",
  },
];

export const userProfile = {
  name: "Alex Johnson",
  email: "alex.doe@example.com",
  age: 28,
  goals: "Fitness, Productivity",
  preferredTime: "Morning",
  levelTitle: "Pro Member • Level 24",
};
