'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, Scale, Dumbbell, Timer, Sprout } from 'lucide-react';
import { cn } from '@/lib/utils';

const dietGoals = [
  {
    title: 'Weight Loss',
    description: 'Focus on calorie deficit and healthy shedding of fat.',
    icon: Scale,
  },
  {
    title: 'Muscle Gain',
    description: 'Prioritize protein intake and caloric surplus for strength.',
    icon: Dumbbell,
  },
  {
    title: 'Intermittent Fasting',
    description: 'Manage eating windows and optimize metabolic health.',
    icon: Timer,
  },
  {
    title: 'Maintenance',
    description: 'Keep your current weight while optimizing nutritional balance.',
    icon: Sprout,
  },
];

export default function AddDietGoalPage() {
  const router = useRouter();
  const [selectedGoal, setSelectedGoal] = useState<string | null>('Weight Loss');

  const handleSelect = (title: string) => {
    setSelectedGoal(title);
  };

  return (
    <div className="space-y-8 -mx-4 md:mx-0 -mt-6 md:-mt-8 bg-background pb-28 md:pb-8">
      {/* Header */}
      <header className="flex items-center p-4 bg-background z-10 sticky top-0 border-b md:border-none md:bg-transparent">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-bold font-headline absolute left-1/2 -translate-x-1/2">
            Select Your Goal
        </h1>
      </header>

      <main className="px-4 space-y-6">
        <div className="text-left">
          <h2 className="text-3xl font-bold font-headline">What's your diet goal?</h2>
          <p className="text-muted-foreground mt-1">
            Choose the plan that best fits your lifestyle and health objectives.
          </p>
        </div>

        <div className="space-y-4">
          {dietGoals.map((goal) => (
            <Card
              key={goal.title}
              className={cn(
                'cursor-pointer transition-all bg-card border-2',
                selectedGoal === goal.title
                  ? 'border-primary'
                  : 'border-card'
              )}
              onClick={() => handleSelect(goal.title)}
            >
              <div className="p-4 flex items-center gap-4">
                <div className="flex-1 space-y-2">
                  <h3 className="font-semibold text-lg">{goal.title}</h3>
                  <p className="text-sm text-muted-foreground">{goal.description}</p>
                  <Button
                      variant={selectedGoal === goal.title ? "secondary" : "outline"}
                      size="sm"
                      className={cn(
                          "mt-2 h-8 px-4",
                          selectedGoal === goal.title ? 'bg-primary/20 text-primary border-none' : 'border-border'
                        )}
                      onClick={(e) => {
                          e.stopPropagation();
                          handleSelect(goal.title);
                      }}
                  >
                      Select
                  </Button>
                </div>
                <div className="p-4 bg-accent rounded-lg">
                  <goal.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
      
      <div className="fixed bottom-0 left-0 right-0 px-4 py-4 border-t bg-background md:static md:px-4 md:py-0 md:border-none">
        <Button
          className="w-full h-14 text-lg font-bold"
          disabled={!selectedGoal}
          onClick={() => router.push('/diet')}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
