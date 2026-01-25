
"use client";

import Link from "next/link";
import { userProfile } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronLeft,
  Settings,
  StretchHorizontal,
  Zap,
  Sun,
  Moon,
} from "lucide-react";
import { StreakOverview } from "@/components/app/streak-overview";
import { cn } from "@/lib/utils";
import { useState } from "react";

const goals = [
  {
    name: "Fitness",
    icon: StretchHorizontal,
    habits: 4,
    progress: 80,
  },
  {
    name: "Productivity",
    icon: Zap,
    habits: 2,
    progress: 45,
  },
];

type TimePreference = "Morning" | "Afternoon" | "Night";

export default function ProfilePage() {
  const profileImage = PlaceHolderImages.find((p) => p.id === "profile");
  const [preferredTime, setPreferredTime] = useState<TimePreference>("Morning");

  return (
    <div className="space-y-6 -mx-4 md:-mx-8 -mt-6 md:-mt-8">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-8 bg-background relative">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold font-headline absolute left-1/2 -translate-x-1/2">
          Profile
        </h1>
        <Link href="/settings">
          <Button variant="ghost" size="icon">
            <Settings className="h-6 w-6" />
          </Button>
        </Link>
      </div>

      {/* Profile Info */}
      <div className="flex flex-col items-center text-center space-y-4 px-4">
        <div className="relative">
          <Avatar className="h-28 w-28 border-4 border-card">
            <AvatarImage
              src={profileImage?.imageUrl}
              alt={userProfile.name}
              data-ai-hint={profileImage?.imageHint}
            />
            <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="absolute bottom-1 right-1 h-6 w-6 bg-primary rounded-full flex items-center justify-center border-2 border-background">
            <svg
              width="12"
              height="10"
              viewBox="0 0 12 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 5.33333L4.33333 8.66667L11 2"
                stroke="hsl(var(--primary-foreground))"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold">{userProfile.name}</h2>
        <p className="text-muted-foreground -mt-2">{userProfile.levelTitle}</p>
        <Link href="/profile/edit" className="w-full max-w-xs pt-2">
          <Button className="w-full h-12 text-lg font-bold">
            Edit Profile
          </Button>
        </Link>
      </div>

      {/* My Goals */}
      <div className="space-y-4 px-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold font-headline">My Goals</h3>
          <Link href="#" className="text-primary font-semibold text-sm">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {goals.map((goal) => {
            const Icon = goal.icon;
            return (
              <Card key={goal.name} className="p-4 bg-card">
                <CardContent className="p-0 flex flex-col justify-between h-full">
                  <div className="flex justify-between items-start">
                    <div className="h-10 w-10 flex items-center justify-center bg-primary/20 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="font-bold text-primary">
                      {goal.progress}%
                    </span>
                  </div>
                  <div className="mt-6">
                    <h4 className="font-bold text-lg">{goal.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {goal.habits} Active Habits
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Preferred Habit Time */}
      <div className="space-y-4 px-4">
        <h3 className="text-lg font-bold font-headline">Preferred Habit Time</h3>
        <div className="grid grid-cols-3 gap-1 bg-card p-1 rounded-xl">
          <Button
            onClick={() => setPreferredTime("Morning")}
            className={cn(
              "flex-1 justify-center gap-2 h-14 text-base font-semibold",
              preferredTime === "Morning"
                ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/30"
                : "bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <Sun className="h-5 w-5" /> Morning
          </Button>
          <Button
            onClick={() => setPreferredTime("Afternoon")}
            className={cn(
              "flex-1 justify-center gap-2 h-14 text-base font-semibold",
              preferredTime === "Afternoon"
                ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/30"
                : "bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <Sun className="h-5 w-5" /> Afternoon
          </Button>
          <Button
            onClick={() => setPreferredTime("Night")}
            className={cn(
              "flex-1 justify-center gap-2 h-14 text-base font-semibold",
              preferredTime === "Night"
                ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/30"
                : "bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <Moon className="h-5 w-5" /> Night
          </Button>
        </div>
      </div>

      {/* Streak Overview */}
      <div className="px-4 pb-28 md:pb-8">
        <StreakOverview />
      </div>
    </div>
  );
}
