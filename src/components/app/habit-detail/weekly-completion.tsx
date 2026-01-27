"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import type { HabitRecord } from "@/lib/data";
import { subDays, format, isWithinInterval, startOfDay, endOfDay, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";

function getWeeklyCompletionData(records: HabitRecord[]): { chartData: { day: string; value: number }[]; completionRate: number; change: number } {
    const today = startOfDay(new Date());
    
    const last7DaysInterval = { start: subDays(today, 6), end: endOfDay(today) };
    const prev7DaysInterval = { start: subDays(today, 13), end: endOfDay(subDays(today, 7)) };

    const recordsLast7Days = records.filter(r => r.date?.toDate && isWithinInterval(r.date.toDate(), last7DaysInterval));
    const recordsPrev7Days = records.filter(r => r.date?.toDate && isWithinInterval(r.date.toDate(), prev7DaysInterval));

    const completionsLast7Days = recordsLast7Days.filter(r => r.status === 'Completed').length;
    const completionsPrev7Days = recordsPrev7Days.filter(r => r.status === 'Completed').length;
    
    // Assuming a daily habit for rate calculation for this component
    const completionRate = Math.round((completionsLast7Days / 7) * 100);
    const prevCompletionRate = Math.round((completionsPrev7Days / 7) * 100);
    const change = completionRate - prevCompletionRate;

    const chartData = Array.from({ length: 7 }).map((_, i) => {
        const date = subDays(today, 6 - i);
        const isCompleted = recordsLast7Days.some(r => r.status === 'Completed' && r.date?.toDate && isSameDay(r.date.toDate(), date));
        return {
            day: format(date, 'E'),
            value: isCompleted ? 100 : 0, // 100 for completed, 0 otherwise
        };
    });

    return { chartData, completionRate, change };
}

export function HabitWeeklyCompletion({ habitRecords }: { habitRecords: HabitRecord[] }) {
  const { chartData, completionRate, change } = getWeeklyCompletionData(habitRecords || []);

  const chartConfig = {
    value: {
      color: "hsl(var(--primary))",
    },
  };

  const changeText = `${change >= 0 ? '+' : ''}${change}% WEEK`;

  return (
    <Card className="bg-card">
      <CardHeader className="flex-row items-center justify-between pb-2">
        <div>
            <CardTitle className="font-headline text-xl">Weekly Completion</CardTitle>
            <p className="text-sm text-muted-foreground">Last 7 days performance</p>
        </div>
        <div className="text-right">
            <p className="text-2xl font-bold text-primary">{completionRate}%</p>
            <p className={cn("text-xs font-semibold", change >= 0 ? "text-primary" : "text-destructive")}>{changeText}</p>
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
