"use client";

import { Card, CardContent } from "@/components/ui/card";

const stats = [
    { label: "TOTAL", value: "142" },
    { label: "RATE", value: "92%" },
    { label: "AVG", value: "2.1L" },
];

export function HabitStatsGrid() {
    return (
        <div className="grid grid-cols-3 gap-4">
            {stats.map((stat) => (
                <Card key={stat.label} className="bg-card text-center">
                    <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground uppercase">{stat.label}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
