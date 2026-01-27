"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, XCircle, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const history = [
    { date: "Today, 8:45 AM", note: "250ml logged", status: "completed" },
    { date: "Yesterday, 9:20 PM", note: "Daily goal met", status: "completed" },
    { date: "Oct 24, 2023", note: "Goal missed by 400ml", status: "missed" },
];

export function HabitHistoryLog() {
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold font-headline">History Log</h3>
                <Link href="#">
                    <Button variant="link" className="text-primary">See All</Button>
                </Link>
            </div>
            <div className="space-y-3">
                {history.map((item, index) => (
                    <Card key={index} className={cn(
                        "bg-card", 
                        item.status === 'completed' ? 'bg-primary/10' : '',
                        item.status === 'missed' ? 'bg-destructive/10' : ''
                    )}>
                        <CardContent className="p-4 flex items-center">
                            {item.status === 'completed' && <CheckCircle2 className="h-6 w-6 text-primary mr-4" />}
                            {item.status === 'missed' && <XCircle className="h-6 w-6 text-destructive mr-4" />}
                            
                            <div className="flex-1">
                                <p className="font-semibold">{item.date}</p>
                                <p className="text-sm text-muted-foreground">{item.note}</p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
