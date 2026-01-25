"use client";

import { useParams, useRouter } from "next/navigation";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { habits } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ChevronLeft,
  MoreHorizontal,
  TrendingUp,
  Check,
  X,
  Plus,
  ChevronRight,
} from "lucide-react";
import * as icons from "lucide-react";
import { ChartContainer } from "@/components/ui/chart";

const chartConfig = {
  value: {
    color: "hsl(var(--primary))",
  },
};

function WeeklyCompletionChart({ data }: { data: { day: string; value: number }[] }) {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart accessibilityLayer data={data} margin={{ top: 10, right: 0, left: 0, bottom: -10 }}>
          <XAxis
            dataKey="day"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis hide={true} domain={[0, 100]} />
          <Bar
            dataKey="value"
            fill="var(--color-value)"
            radius={[20, 20, 20, 20]}
            barSize={12}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export default function HabitDetailPage() {
  const router = useRouter();
  const params = useParams();
  const habit = habits.find((h) => h.id === params.id);

  if (!habit) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Habit not found.</p>
      </div>
    );
  }

  const Icon = (icons as any)[habit.icon] || icons.Activity;

  const historyIcons = {
    logged: <Check className="h-5 w-5 text-primary-foreground" />,
    completed: <Check className="h-5 w-5 text-primary-foreground" />,
    missed: <X className="h-5 w-5 text-destructive-foreground" />,
  };
  const historyBg = {
    logged: "bg-primary",
    completed: "bg-primary",
    missed: "bg-destructive",
  };


  return (
    <div className="space-y-6 -mx-4 md:-mx-8 -mt-6 md:-mt-8 bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-background z-10 sticky top-0 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-bold font-headline">Habit Details</h1>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-6 w-6" />
        </Button>
      </header>

      <main className="px-4 space-y-6 pb-28 md:pb-8">
        {/* Habit Info */}
        <div className="text-center space-y-2">
          <div className="inline-block p-4 bg-card rounded-2xl mb-2">
            <Icon className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold font-headline">{habit.name}</h2>
          {habit.goal && (
            <p className="text-muted-foreground">Goal: {habit.goal}</p>
          )}
        </div>

        {/* Streak */}
        {habit.streak && (
          <Card className="bg-card text-center p-6 rounded-2xl">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest">
              Current Streak
            </p>
            <p className="text-6xl font-bold my-2">
              {habit.streak.current}{" "}
              <span className="text-4xl font-semibold text-muted-foreground">Days</span>
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              <span>Personal Best: {habit.streak.personalBest} Days</span>
            </div>
          </Card>
        )}

        {/* Stats */}
        {habit.stats && (
            <div className="grid grid-cols-3 gap-4">
                <Card className="text-center p-4 bg-card rounded-2xl">
                    <p className="text-sm font-semibold text-muted-foreground">TOTAL</p>
                    <p className="text-2xl font-bold mt-1">{habit.stats.total}</p>
                </Card>
                 <Card className="text-center p-4 bg-card rounded-2xl">
                    <p className="text-sm font-semibold text-muted-foreground">RATE</p>
                    <p className="text-2xl font-bold mt-1">{habit.stats.rate}</p>
                </Card>
                 <Card className="text-center p-4 bg-card rounded-2xl">
                    <p className="text-sm font-semibold text-muted-foreground">AVG</p>
                    <p className="text-2xl font-bold mt-1">{habit.stats.avg}</p>
                </Card>
            </div>
        )}

        {/* Weekly Completion */}
        {habit.weeklyCompletion && (
            <Card className="bg-card p-6 rounded-2xl">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-lg font-bold font-headline">Weekly Completion</h3>
                        <p className="text-sm text-muted-foreground">Last 7 days performance</p>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{habit.weeklyCompletion.percentage}%</p>
                        <p className="text-xs font-semibold text-green-400">{habit.weeklyCompletion.change}</p>
                    </div>
                </div>
                <div className="h-28">
                  <WeeklyCompletionChart data={habit.weeklyCompletion.data} />
                </div>
            </Card>
        )}

        {/* History Log */}
        {habit.history && (
            <div>
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold font-headline">History Log</h3>
                    <Button variant="link" className="text-primary">See All</Button>
                </div>
                <div className="space-y-2">
                    {habit.history.map((log, index) => (
                        <Card key={index} className="p-4 bg-card rounded-2xl flex items-center gap-4">
                             <div className={`h-10 w-10 rounded-full flex items-center justify-center ${historyBg[log.status]}`}>
                                {historyIcons[log.status]}
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold">{log.date}</p>
                                <p className="text-sm text-muted-foreground">{log.details}</p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </Card>
                    ))}
                </div>
            </div>
        )}
      </main>

      <div className="fixed bottom-[85px] left-0 right-0 px-4 md:static">
          <Button className="w-full max-w-md mx-auto flex h-14 text-lg font-bold rounded-xl">
            <Plus className="mr-2 h-6 w-6"/> Log Intake
        </Button>
      </div>
    </div>
  );
}
