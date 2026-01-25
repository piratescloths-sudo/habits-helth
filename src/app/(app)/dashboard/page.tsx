import { MotivationalPrompt } from "@/components/app/motivational-prompt";
import { TodaysHabits } from "@/components/app/todays-habits";
import { Suspense } from "react";
import { CurrentProgress } from "@/components/app/current-progress";
import { WeekView } from "@/components/app/week-view";
import { Skeleton } from "@/components/ui/skeleton";
import { ProgressCalendar } from "@/components/app/progress-calendar";
import { WeeklyChart } from "@/components/app/weekly-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <CurrentProgress />
        <WeekView />
        <TodaysHabits />
      </div>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-lg">Monthly View</CardTitle>
          </CardHeader>
          <CardContent>
            <ProgressCalendar />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-lg">Weekly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <WeeklyChart />
          </CardContent>
        </Card>
        <Suspense fallback={<MotivationalPromptSkeleton />}>
          <MotivationalPrompt />
        </Suspense>
      </div>
    </div>
  );
}

function MotivationalPromptSkeleton() {
  return (
    <div className="text-center py-8 px-4 space-y-4 rounded-lg bg-card">
      <Skeleton className="h-1 w-1/4 mx-auto" />
      <Skeleton className="h-5 w-3/4 mx-auto" />
      <Skeleton className="h-5 w-full max-w-md mx-auto" />
      <Skeleton className="h-4 w-1/3 mx-auto" />
    </div>
  );
}
