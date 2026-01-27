"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Zap } from "lucide-react";

export function HabitStreakCard() {
    return (
        <Card className="bg-card p-6 text-center">
            <CardContent className="p-0">
                <p className="text-xs font-semibold uppercase text-primary tracking-widest">Current Streak</p>
                <p className="text-6xl font-bold my-2">12 <span className="text-4xl font-semibold text-muted-foreground">Days</span></p>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Zap className="h-4 w-4 text-yellow-400" />
                    <span>Personal Best: 24 Days</span>
                </div>
            </CardContent>
        </Card>
    );
}
