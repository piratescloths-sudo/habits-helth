"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, ArrowLeft, Settings } from "lucide-react";
import { userProfile } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const profileImage = PlaceHolderImages.find((p) => p.id === "profile");

  const isProfilePage = pathname === "/profile" || pathname === "/profile/edit";

  if (isProfilePage) {
    return (
      <header className="sticky top-0 z-40 w-full bg-background">
        <div className="flex h-20 items-center justify-between px-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold font-headline">Profile</h1>
          <Link href="/settings">
            <Button variant="ghost" size="icon">
              <Settings className="h-6 w-6" />
            </Button>
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-background">
      <div className="flex h-20 items-center justify-between px-4">
        <Link href="/profile" className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={profileImage?.imageUrl}
              alt={userProfile.name}
              data-ai-hint={profileImage?.imageHint}
            />
            <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xs text-muted-foreground">GOOD MORNING</p>
            <p className="text-lg font-medium">Hello, {userProfile.name.split(' ')[0]}</p>
          </div>
        </Link>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-card">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
