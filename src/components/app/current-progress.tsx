"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { habits } from "@/lib/data";
import { useState, useEffect } from "react";


export function CurrentProgress() {
    const [completed, setCompleted] = useState(0);
    const [total, setTotal] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const completedHabits = habits.filter(h => h.status === 'completed').length;
        const totalHabits = habits.length;
        setCompleted(completedHabits);
        setTotal(totalHabits);
        setProgress(totalHabits > 0 ? (completedHabits / totalHabits) * 100 : 0);
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Today's Progress</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <Progress value={progress} />
                    <p className="text-sm text-muted-foreground">{completed} of {total} habits completed today.</p>
                </div>
            </CardContent>
        </Card>
    );
}
