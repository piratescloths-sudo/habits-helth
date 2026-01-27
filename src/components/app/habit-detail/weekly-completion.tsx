"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

const chartData = [
  { day: "M", value: 40 },
  { day: "T", value: 60 },
  { day: "W", value: 90 },
  { day: "T", value: 80 },
  { day: "F", value: 30 },
  { day: "S", value: 75 },
  { day: "S", value: 20 },
];

const chartConfig = {
  value: {
    color: "hsl(var(--primary))",
  },
};

export function HabitWeeklyCompletion() {
  return (
    <Card className="bg-card">
      <CardHeader className="flex-row items-center justify-between pb-2">
        <div>
            <CardTitle className="font-headline text-xl">Weekly Completion</CardTitle>
            <p className="text-sm text-muted-foreground">Last 7 days performance</p>
        </div>
        <div className="text-right">
            <p className="text-2xl font-bold text-primary">85%</p>
            <p className="text-xs font-semibold text-primary">+15% WEEK</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-32">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart accessibilityLayer data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <XAxis
                  dataKey="day"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis hide={true} domain={[0, 100]} />
                <Bar dataKey="value" fill="var(--color-value)" radius={[8, 8, 8, 8]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
