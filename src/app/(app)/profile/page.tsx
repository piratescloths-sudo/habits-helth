"use client";

import { useState } from "react";
import Link from "next/link";
import { userProfile } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  Maximize,
  Zap,
  Sun,
  Moon,
  CloudSun,
} from "lucide-react";

type TimeOption = "Morning" | "Afternoon" | "Night";

const goals = [
  {
    name: "Fitness",
    icon: Maximize,
    progress: 80,
    activeHabits: 4,
  },
  {
    name: "Productivity",
    icon: Zap,
    progress: 45,
    activeHabits: 2,
  },
];

export default function ProfilePage() {
  const profileImage = PlaceHolderImages.find((p) => p.id === "profile");
  const [preferredTime, setPreferredTime] = useState<TimeOption>("Morning");

  return (
    <div className="space-y-8 pb-8">
      {/* Profile Header */}
      <div className="text-center space-y-4">
        <div className="relative inline-block">
          <Avatar className="h-28 w-28 border-4 border-card">
            <AvatarImage
              src={profileImage?.imageUrl}
              alt={userProfile.name}
              data-ai-hint={profileImage?.imageHint}
            />
            <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <CheckCircle2 className="absolute bottom-1 right-1 h-8 w-8 fill-primary text-background" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{userProfile.name}</h1>
          <p className="text-primary">{userProfile.levelTitle}</p>
        </div>
        <Link href="/profile/edit">
          <Button className="w-full max-w-xs mx-auto rounded-full h-12 text-base font-bold">
            Edit Profile
          </Button>
        </Link>
      </div>

      {/* My Goals */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold font-headline">My Goals</h2>
          <Link href="#" className="text-sm font-medium text-primary">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {goals.map((goal) => (
            <Card key={goal.name} className="p-4 bg-card">
              <CardContent className="p-0 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <goal.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-bold text-primary">{goal.progress}%</span>
                </div>
                <div>
                  <p className="font-bold">{goal.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {goal.activeHabits} Active Habits
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Preferred Habit Time */}
      <div>
        <h2 className="text-xl font-bold font-headline mb-4">Preferred Habit Time</h2>
        <div className="flex justify-between rounded-full bg-card p-1.5">
          {[
            { name: "Morning", icon: Sun },
            { name: "Afternoon", icon: CloudSun },
            { name: "Night", icon: Moon },
          ].map((item) => (
            <Button
              key={item.name}
              onClick={() => setPreferredTime(item.name as TimeOption)}
              variant="ghost"
              className={cn(
                "flex-1 rounded-full h-11 text-muted-foreground hover:bg-muted/50",
                preferredTime === item.name &&
                  "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              <item.icon className="mr-2 h-5 w-5" />
              {item.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div>
        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="grid grid-cols-3 divide-x divide-border">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">24</p>
                <p className="text-xs text-muted-foreground uppercase">
                  Day Streak
                </p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">158</p>
                <p className="text-xs text-muted-foreground uppercase">
                  Completed
                </p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">8</p>
                <p className="text-xs text-muted-foreground uppercase">Badges</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
