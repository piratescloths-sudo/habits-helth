"use client";
import { Pie, PieChart, ResponsiveContainer, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const achieved = 80;
const partial = 5;
const totalAchieved = achieved + partial;

const data = [
  { name: "Achieved", value: achieved, color: "hsl(var(--primary))" },
  { name: "Partial", value: partial, color: "hsl(var(--warning))" },
  { name: "Remaining", value: 100 - achieved - partial, color: "transparent" },
];

export function OverallCompletionChart() {
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Overall Completion</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative h-48 w-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              {/* Background ring */}
              <Pie
                data={[{ value: 100 }]}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={80}
                startAngle={90}
                endAngle={450}
                stroke="none"
                fill="hsl(var(--muted))"
              />
              {/* Data rings */}
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={80}
                startAngle={90}
                endAngle={450}
                stroke="none"
                cornerRadius={20}
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold text-primary">{totalAchieved}%</span>
            <span className="text-xs font-semibold text-muted-foreground tracking-widest">
              GOAL ACHIEVED
            </span>
          </div>
        </div>

        <div className="mt-6 grid w-full grid-cols-2 gap-4 text-center">
          <div className="rounded-lg bg-background/50 p-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase">Total Habits</p>
            <p className="text-3xl font-bold">128</p>
          </div>
          <div className="rounded-lg bg-background/50 p-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase">Active Streak</p>
            <div className="flex items-center justify-center gap-2">
              <p className="text-3xl font-bold">12</p>
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
