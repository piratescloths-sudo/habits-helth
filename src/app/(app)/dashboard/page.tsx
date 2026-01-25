import { TodaysHabits } from "@/components/app/todays-habits";
import { WeekView } from "@/components/app/week-view";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { habits } from "@/lib/data";
import { Calendar, Settings } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
    const completedHabits = habits.filter(h => h.status === 'completed').length;
    const totalHabits = habits.length;

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Calendar className="h-6 w-6 text-foreground" />
                    <h1 className="font-headline text-2xl font-bold">Daily Checklist</h1>
                </div>
                <Link href="/settings">
                    <Button variant="ghost" size="icon">
                        <Settings className="h-6 w-6" />
                    </Button>
                </Link>
            </div>

            <WeekView />

            {/* Today's Goals */}
            <Card className="bg-transparent border-t border-b border-border/50 rounded-none -mx-4 px-4 py-3">
                <div className="flex justify-between items-center font-semibold text-sm mb-2">
                    <h2 className="text-foreground">Today's Goals</h2>
                    <span className="text-primary">{completedHabits} of {totalHabits} completed</span>
                </div>
                <Progress value={(completedHabits / totalHabits) * 100} className="h-1.5" />
            </Card>
            
            <TodaysHabits />
        </div>
    );
}
