import { Button } from "@/components/ui/button";
import { ChevronLeft, Calendar as CalendarIcon, FileText } from "lucide-react";
import Link from "next/link";
import { MonthlyCalendar } from "@/components/app/reports/monthly-calendar";
import { OverallCompletionChart } from "@/components/app/reports/completion-chart";
import { WeeklyTrendChart } from "@/components/app/reports/weekly-trend-chart";

export default function ReportsPage() {
  return (
    <div className="space-y-6 pb-28 md:pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold font-headline">Monthly Reports</h1>
        <Button variant="ghost" size="icon">
          <CalendarIcon className="h-6 w-6" />
        </Button>
      </div>
      
      <MonthlyCalendar />
      <OverallCompletionChart />
      <WeeklyTrendChart />
      
      <div className="text-center space-y-2 fixed bottom-[85px] left-0 right-0 px-4 md:static">
        <Button className="w-full max-w-md mx-auto h-14 text-lg font-bold rounded-xl">
          <FileText className="mr-2 h-5 w-5" />
          Download PDF Report
        </Button>
        <p className="text-xs text-muted-foreground max-w-md mx-auto hidden md:block">
          Report includes detailed breakdown of all 12 tracked habits for October 2023.
        </p>
      </div>
    </div>
  );
}
