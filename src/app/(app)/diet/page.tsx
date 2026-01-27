"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronLeft, Scale, Dumbbell, Timer, Leaf } from "lucide-react";

const dietGoals = [
  {
    name: "Weight Loss",
    description: "Focus on calorie deficit and healthy shedding of fat.",
    icon: Scale,
  },
  {
    name: "Muscle Gain",
    description: "Prioritize protein intake and caloric surplus for strength.",
    icon: Dumbbell,
  },
  {
    name: "Intermittent Fasting",
    description: "Manage eating windows and optimize metabolic health.",
    icon: Timer,
  },
  {
    name: "Maintenance",
    description:
      "Keep your current weight while optimizing nutritional balance.",
    icon: Leaf,
  },
];

export default function DietPage() {
  const router = useRouter();
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold font-headline">Select Your Goal</h1>
        <div className="w-10" />
      </header>

      <div className="text-left space-y-2">
        <h2 className="text-3xl font-bold font-headline">
          What's your diet goal?
        </h2>
        <p className="text-muted-foreground">
          Choose the plan that best fits your lifestyle and health objectives.
        </p>
      </div>

      <div className="space-y-4">
        {dietGoals.map((goal) => {
          const isSelected = selectedGoal === goal.name;
          const Icon = goal.icon;
          return (
            <Card
              key={goal.name}
              onClick={() => setSelectedGoal(goal.name)}
              className={cn(
                "p-4 flex items-center gap-4 transition-colors cursor-pointer",
                isSelected
                  ? "bg-primary/10 border-primary"
                  : "hover:bg-accent"
              )}
            >
              <div className="flex-1 space-y-1">
                <h3 className="font-semibold text-lg">{goal.name}</h3>
                <p className="text-muted-foreground text-sm">
                  {goal.description}
                </p>
                <Button
                  variant={isSelected ? "default" : "secondary"}
                  size="sm"
                  className="mt-2"
                >
                  Select
                </Button>
              </div>
              <div
                className={cn(
                  "p-4 rounded-lg",
                  isSelected ? "bg-primary/20" : "bg-card-foreground/5"
                )}
              >
                <Icon
                  className={cn(
                    "h-8 w-8",
                    isSelected ? "text-primary" : "text-muted-foreground"
                  )}
                />
              </div>
            </Card>
          );
        })}
      </div>

      <div className="fixed bottom-24 left-0 right-0 px-4 md:static md:px-0">
        <Button
          className="w-full h-14 text-lg font-bold"
          disabled={!selectedGoal}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
