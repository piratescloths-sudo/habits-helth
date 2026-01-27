"use client";
import { Pie, PieChart, ResponsiveContainer, Cell } from "recharts";
import { Card, CardContent } from "@/components/ui/card";

const consumed = 1350;
const total = 1800;
const remaining = total - consumed;
const percentage = Math.round((consumed / total) * 100);

const data = [
  { name: "Consumed", value: consumed, color: "hsl(var(--primary))" },
  { name: "Remaining", value: remaining, color: "transparent" },
];

export function CalorieProgress() {
  return (
    <Card className="bg-card">
      <CardContent className="p-6 flex flex-col items-center">
        <div className="relative h-48 w-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
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
              >
                 {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold">{consumed}</span>
            <span className="text-xs font-semibold text-muted-foreground tracking-widest">
              CONSUMED
            </span>
          </div>
        </div>
        <div className="text-center mt-4">
            <p className="font-bold text-lg text-primary">{remaining} kcal remaining</p>
            <p className="text-sm text-muted-foreground">{percentage}% of your daily goal achieved</p>
        </div>
      </CardContent>
    </Card>
  );
}
