
"use client";

import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  Settings,
  Sun,
  Moon,
} from "lucide-react";
import { StreakOverview } from "@/components/app/streak-overview";
import { cn } from "@/lib/utils";
import { useUser, useFirestore, useDoc, useMemoFirebase, setDocumentNonBlocking } from "@/firebase";
import { UserProfile } from "@/lib/data";
import { doc } from 'firebase/firestore';
import { Skeleton } from "@/components/ui/skeleton";

type TimePreference = "Morning" | "Afternoon" | "Night";

export default function ProfilePage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const userProfileRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const { data: userProfile, isLoading } = useDoc<UserProfile>(userProfileRef);

  const profileImage = PlaceHolderImages.find((p) => p.id === "profile");
  
  const handlePreferredTimeChange = (time: TimePreference) => {
    if (userProfileRef) {
      setDocumentNonBlocking(userProfileRef, { preferredTime: time }, { merge: true });
    }
  };

  if (isLoading || !userProfile) {
    return (
        <div className="space-y-6 -mx-4 md:-mx-8 -mt-6 md:-mt-8">
            <div className="flex items-center justify-between p-4 pt-8 bg-background relative">
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-10 w-10" />
            </div>
            <div className="flex flex-col items-center text-center space-y-4 px-4">
                <Skeleton className="h-28 w-28 rounded-full" />
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-12 w-full max-w-xs" />
            </div>
        </div>
    )
  }
  
  const preferredTime = userProfile.preferredTime || "Morning";

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

      {/* Preferred Habit Time */}
      <div className="space-y-4 px-4">
        <h3 className="text-lg font-bold font-headline">Preferred Habit Time</h3>
        <div className="grid grid-cols-3 gap-1 bg-card p-1 rounded-xl">
          <Button
            onClick={() => handlePreferredTimeChange("Morning")}
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
            onClick={() => handlePreferredTimeChange("Afternoon")}
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
            onClick={() => handlePreferredTimeChange("Night")}
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
