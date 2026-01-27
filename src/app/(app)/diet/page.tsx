"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CurrentPlan } from "@/components/app/diet/current-plan";
import { CalorieProgress } from "@/components/app/diet/calorie-progress";
import { Macros } from "@/components/app/diet/macros";
import { MealChecklist } from "@/components/app/diet/meal-checklist";
import { Hydration } from "@/components/app/diet/hydration";
import Link from "next/link";

export default function DietPage() {
  return (
    <div className="space-y-6 pb-28 md:pb-8">
      <CurrentPlan />
      <CalorieProgress />
      <Macros />
      <MealChecklist />
      <Hydration />

      <div className="fixed bottom-24 right-4 md:bottom-8 md:right-8">
        <Link href="/diet/add">
          <Button size="icon" className="h-16 w-16 rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/50">
              <Plus className="h-8 w-8" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
