import { MotivationalPrompt } from "@/components/app/motivational-prompt";
import { TodaysHabits } from "@/components/app/todays-habits";
import { Suspense } from "react";
import { CurrentProgress } from "@/components/app/current-progress";
import { WeekView } from "@/components/app/week-view";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <CurrentProgress />
      <WeekView />
      <TodaysHabits />
      <Suspense fallback={<MotivationalPromptSkeleton />}>
        <MotivationalPrompt />
      </Suspense>
    </div>
  );
}

function MotivationalPromptSkeleton() {
  return (
    <div className="text-center py-8 px-4 space-y-4">
      <Skeleton className="h-1 w-1/4 mx-auto" />
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/3 mx-auto" />
    </div>
  );
}
