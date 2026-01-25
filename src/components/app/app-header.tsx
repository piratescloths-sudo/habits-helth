import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { userProfile } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ThemeToggle } from "../theme-toggle";

export function AppHeader() {
  const profileImage = PlaceHolderImages.find((p) => p.id === "profile");
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4">
        <Link href="/app/profile" className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={profileImage?.imageUrl}
              alt={userProfile.name}
              data-ai-hint={profileImage?.imageHint}
            />
            <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xs text-muted-foreground">Welcome back,</p>
            <p className="text-sm font-medium">{userProfile.name}</p>
          </div>
        </Link>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
