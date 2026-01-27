"use client";

import { Card, CardContent } from "@/components/ui/card";
import type { HabitRecord } from "@/lib/data";
import { differenceInWeeks, startOfDay, differenceInCalendarDays } from "date-fns";

function calculateStats(records: HabitRecord[]): { total: number; rate: number; avg: string } {
    const validRecords = (records || []).filter(r => r.date?.toDate);
    
    if (validRecords.length === 0) {
        return { total: 0, rate: 0, avg: "0/wk" };
    }

    const completions = validRecords.filter(r => r.status === 'Completed').length;
    
    const sortedDates = validRecords.map(r => r.date.toDate()).sort((a,b) => a.getTime() - b.getTime());
    const firstRecordDate = sortedDates[0];
    const totalDays = differenceInCalendarDays(new Date(), firstRecordDate) + 1;
    const rate = totalDays > 0 ? Math.round((completions / totalDays) * 100) : 0;
    
    const weeks = Math.max(differenceInWeeks(startOfDay(new Date()), startOfDay(firstRecordDate)), 1);
    const avgPerWeek = (completions / weeks).toFixed(1);

    return {
        total: completions,
        rate: rate,
        avg: `${avgPerWeek}/wk`
    };
}


export function HabitStatsGrid({ habitRecords }: { habitRecords: HabitRecord[] }) {
    const statsData = calculateStats(habitRecords);

    const stats = [
        { label: "TOTAL", value: String(statsData.total) },
        { label: "RATE", value: `${statsData.rate}%` },
        { label: "AVG", value: statsData.avg },
    ];

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
