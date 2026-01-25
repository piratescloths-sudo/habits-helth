"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { userProfile } from "@/lib/data";
import { Bell, Flag } from "lucide-react";
import Link from "next/link";

export function DashboardHeader() {
  const profileImage = PlaceHolderImages.find((p) => p.id === "profile");
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 border-2 border-primary">
          <AvatarImage
            src={profileImage?.imageUrl}
            alt={userProfile.name}
            data-ai-hint={profileImage?.imageHint}
          />
          <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-xs font-medium text-muted-foreground">
            GOOD MORNING
          </p>
          <p className="font-bold text-lg">Hello, {userProfile.name}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Link href="/reports">
            <Button variant="ghost" size="icon" className="bg-card rounded-full">
            <Flag className="h-5 w-5" />
            </Button>
        </Link>
        <Button variant="ghost" size="icon" className="bg-card rounded-full">
          <Bell className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
