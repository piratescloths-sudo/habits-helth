"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const data = [
  { name: "Mon", completed: 8, missed: 2 },
  { name: "Tue", completed: 7, missed: 3 },
  { name: "Wed", completed: 9, missed: 1 },
  { name: "Thu", completed: 10, missed: 0 },
  { name: "Fri", completed: 8, missed: 2 },
  { name: "Sat", completed: 5, missed: 1 },
  { name: "Sun", completed: 6, missed: 0 },
]

const chartConfig = {
  completed: {
    label: "Completed",
    color: "hsl(var(--success))",
  },
} satisfies ChartConfig

export function WeeklyChart() {
  return (
    <div className="h-[200px]">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart accessibilityLayer data={data}>
            <XAxis
              dataKey="name"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar
              dataKey="completed"
              fill="var(--color-completed)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
