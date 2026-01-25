"use client";

import type { Habit } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import * as icons from "lucide-react";
import { Check, X, Pause, MoreVertical, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "../ui/badge";

export function HabitItem({
  habit,
  onStatusChange,
}: {
  habit: Habit;
  onStatusChange: (id: string, status: Habit["status"]) => void;
}) {

  const Icon = icons[habit.icon as keyof typeof icons] as React.ElementType || icons['Activity'];

  const statusButtons: { status: NonNullable<Habit['status']>; label: string; icon: React.ElementType }[] = [
      { status: 'completed', label: 'DONE', icon: Check },
      { status: 'missed', label: 'MISSED', icon: X },
      { status: 'skipped', label: 'SKIPPED', icon: Pause },
  ];
  
  if (habit.id === '4' && habit.status === 'completed') {
    return (
        <Card className="bg-card">
            <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-primary/10">
                        <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <p className="font-bold text-card-foreground">{habit.name}</p>
                        <p className="text-sm uppercase font-semibold text-muted-foreground">{habit.details}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                     <Badge variant="outline" className="border-success text-success bg-transparent">LOGGED: DONE</Badge>
                     <Check className="w-5 h-5 text-success" />
                </div>
            </CardContent>
        </Card>
    )
  }

  return (
    <Card className="bg-card">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
                <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", habit.status === 'completed' ? 'bg-success/20' : 'bg-primary/10')}>
                    <Icon className={cn("w-6 h-6", habit.status === 'completed' ? 'text-success' : 'text-primary')} />
                </div>
                <div>
                    <p className="font-bold text-card-foreground text-lg">{habit.name}</p>
                    <p className="text-sm uppercase font-semibold text-muted-foreground">{habit.details}</p>
                </div>
            </div>
            <Button variant="ghost" size="icon">
                <MoreVertical className="w-5 h-5" />
            </Button>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
            {statusButtons.map(({ status, label, icon: StatusIcon }) => {
                const isActive = habit.status === status;
                return (
                    <Button 
                        key={status}
                        variant="outline"
                        onClick={() => onStatusChange(habit.id, status === habit.status ? 'pending' : status)}
                        className={cn("h-12 flex flex-col gap-1 border", 
                            isActive && status === 'completed' ? "bg-success/20 border-success text-success" : 
                            isActive && status === 'missed' ? "bg-destructive/20 border-destructive text-destructive" : 
                            isActive && status === 'skipped' ? "bg-warning/20 border-warning text-warning" : 
                            "bg-card hover:bg-muted/50 text-muted-foreground"
                        )}
                    >
                        <StatusIcon className="w-5 h-5" />
                        <span className="text-xs font-bold">{label}</span>
                    </Button>
                )
            })}
        </div>
      </CardContent>
    </Card>
  );
}
