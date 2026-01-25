"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import {
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

export function WeeklyChart() {
  return (
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
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
          <Tooltip content={<ChartTooltipContent />} cursor={false} />
          <Bar dataKey="completed" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
