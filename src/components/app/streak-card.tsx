import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame } from "lucide-react";
import Link from "next/link";

export function StreakCard() {
    return (
        <Card className="bg-card p-6">
            <CardContent className="p-0 flex items-center justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase text-primary">Current Progress</p>
                    <div className="flex items-center gap-2 mt-2">
                        <Flame className="h-8 w-8 text-orange-400" />
                        <p className="text-3xl font-bold">0 Day Streak</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">Keep it up to build a new streak!</p>
                </div>
                <Link href="/progress">
                    <Button className="bg-primary/80 hover:bg-primary text-primary-foreground font-bold">View Stats</Button>
                </Link>
            </CardContent>
        </Card>
    );
}
