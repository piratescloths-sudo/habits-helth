"use client";

import type { Habit } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Flame, MoreVertical, SkipForward, XCircle } from "lucide-react";

export function HabitItem({
  habit,
  onStatusChange,
}: {
  habit: Habit;
  onStatusChange: (id: string, status: Habit["status"]) => void;
}) {
  const handleCheck = (checked: boolean) => {
    onStatusChange(habit.id, checked ? "completed" : "pending");
  };

  const statusConfig = {
    completed: {
      bg: "bg-success/10 border-success/20",
      text: "text-success-foreground",
    },
    missed: {
      bg: "bg-destructive/10 border-destructive/20",
      text: "text-destructive-foreground",
    },
    skipped: {
      bg: "bg-warning/10 border-warning/20",
      text: "text-warning-foreground",
    },
    pending: {
      bg: "bg-muted/50 border-transparent",
      text: "",
    },
  };

  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-lg border p-3 transition-colors",
        statusConfig[habit.status].bg
      )}
    >
      <Checkbox
        id={`habit-${habit.id}`}
        checked={habit.status === "completed"}
        onCheckedChange={handleCheck}
        className="h-6 w-6 rounded-full data-[state=checked]:bg-success data-[state=checked]:border-success-foreground border-2"
      />
      <div className="flex-1">
        <label htmlFor={`habit-${habit.id}`} className="font-medium">
          {habit.name}
        </label>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Flame className="h-4 w-4 text-orange-500" />
          <span>{habit.streak} days</span>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onStatusChange(habit.id, "skipped")}>
            <SkipForward className="mr-2 h-4 w-4" />
            Mark Skipped
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onStatusChange(habit.id, "missed")}>
            <XCircle className="mr-2 h-4 w-4" />
            Mark Missed
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Edit Habit</DropdownMenuItem>
          <DropdownMenuItem className="text-destructive focus:text-destructive">Delete Habit</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
