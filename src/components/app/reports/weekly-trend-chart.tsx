"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

const data = [
  { week: "W1", value: 65 },
  { week: "W2", value: 72 },
  { week: "W3", value: 80 },
  { week: "W4", value: 85 },
];

const chartConfig = {
  value: {
    color: "hsl(var(--primary))",
  },
};

export function WeeklyTrendChart() {
  return (
    <Card className="bg-card">
      <CardHeader className="flex-row items-center justify-between pb-2">
        <CardTitle className="font-headline text-xl">Weekly Trend</CardTitle>
        <p className="text-sm font-semibold text-primary">+12% vs last month</p>
      </CardHeader>
      <CardContent>
        <div className="h-24">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart accessibilityLayer data={data} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                <XAxis
                  dataKey="week"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Bar dataKey="value" fill="var(--color-value)" radius={4} barSize={10} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
