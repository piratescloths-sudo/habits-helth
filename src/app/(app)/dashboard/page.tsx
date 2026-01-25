import { MotivationalPrompt } from "@/components/app/motivational-prompt";
import { StreakOverview } from "@/components/app/streak-overview";
import { TodaysHabits } from "@/components/app/todays-habits";
import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <StreakOverview />
      <Suspense fallback={<MotivationalPromptSkeleton />}>
        <MotivationalPrompt />
      </Suspense>
      <TodaysHabits />
    </div>
  );
}

function MotivationalPromptSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
        </div>
      </CardContent>
    </Card>
  );
}
