import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Flame } from "lucide-react";
import Link from "next/link";

export function CurrentProgress() {
  return (
    <Card className="bg-card">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
            <div className="space-y-2">
                <p className="text-sm font-semibold text-primary uppercase">Current Progress</p>
                <div className="flex items-center gap-2">
                    <Flame className="w-8 h-8 text-orange-500" />
                    <span className="text-4xl font-bold">5 Day Streak</span>
                </div>
                <p className="text-muted-foreground">You're on fire! 85% of your weekly goals met.</p>
            </div>
            <Link href="/progress">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-lg">View Stats</Button>
            </Link>
        </div>
      </CardContent>
    </Card>
  );
}
