"use client";

import { ProgressCalendar } from "@/components/app/progress-calendar";
import { WeeklyChart } from "@/components/app/weekly-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useHabits } from "@/components/app/habit-provider";
import { AllHabits } from "@/components/app/all-habits";

export default function ProgressPage() {
  const { habits } = useHabits();
  return (
    <div className="space-y-6">
      <h1 className="font-headline text-2xl font-bold">Your Progress</h1>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">All Habits</CardTitle>
        </CardHeader>
        <CardContent>
          <AllHabits habits={habits} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Monthly View</CardTitle>
        </CardHeader>
        <CardContent>
          <ProgressCalendar />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Weekly Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <WeeklyChart />
        </CardContent>
      </Card>
    </div>
  );
}
