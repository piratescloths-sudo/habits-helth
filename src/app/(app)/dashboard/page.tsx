import { MotivationalPrompt } from "@/components/app/motivational-prompt";
import { StreakOverview } from "@/components/app/streak-overview";
import { TodaysHabits } from "@/components/app/todays-habits";
import { CurrentProgress } from "@/components/app/current-progress";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <StreakOverview />
      <CurrentProgress />
      <TodaysHabits />
      <MotivationalPrompt />
    </div>
  );
}
