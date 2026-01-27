"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, XCircle, ChevronRight, SkipForward } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { HabitRecord } from "@/lib/data";
import { formatRelative } from 'date-fns';

function formatHistoryDate(date: Date): string {
    const formatted = formatRelative(date, new Date());
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

export function HabitHistoryLog({ habitRecords }: { habitRecords: HabitRecord[] }) {
    const history = (habitRecords || [])
        .filter(r => r.date?.toDate)
        .map(r => ({ ...r, date: r.date.toDate() }))
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .slice(0, 3);

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold font-headline">History Log</h3>
                <Link href="#">
                    <Button variant="link" className="text-primary">See All</Button>
                </Link>
            </div>
             {history.length === 0 ? (
                 <Card className="bg-card text-center p-8 border-dashed">
                    <p className="text-muted-foreground">No history yet.</p>
                    <p className="text-muted-foreground text-sm">Complete your habit to see the log.</p>
                </Card>
            ) : (
            <div className="space-y-3">
                {history.map((item, index) => (
                    <Card key={index} className={cn(
                        "bg-card", 
                        item.status === 'Completed' ? 'bg-primary/10' : '',
                        item.status === 'Missed' ? 'bg-destructive/10' : ''
                    )}>
                        <CardContent className="p-4 flex items-center">
                            {item.status === 'Completed' && <CheckCircle2 className="h-6 w-6 text-primary mr-4" />}
                            {item.status === 'Missed' && <XCircle className="h-6 w-6 text-destructive mr-4" />}
                            {item.status === 'Skipped' && <SkipForward className="h-6 w-6 text-muted-foreground mr-4" />}
                            
                            <div className="flex-1">
                                <p className="font-semibold">{formatHistoryDate(item.date)}</p>
                                <p className="text-sm text-muted-foreground">{item.notes || (item.status === "Completed" ? "Daily goal met" : "No notes")}</p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </CardContent>
                    </Card>
                ))}
            </div>
            )}
        </div>
    );
}
