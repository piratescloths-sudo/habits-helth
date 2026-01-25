"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  BarChart2,
  Compass,
  Settings,
  Target,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { userProfile } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useToast } from "@/hooks/use-toast";

const navItems = [
  { href: "/dashboard", label: "Today", icon: Home },
  { href: "/progress", label: "Stats", icon: BarChart2 },
  { href: "/habits", label: "Habits", icon: Compass },
];

export function DesktopNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const profileImage = PlaceHolderImages.find((p) => p.id === "profile");

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    router.push("/");
  };

  return (
    <aside className="hidden md:flex w-72 flex-col justify-between border-r bg-card p-6">
      <div>
        <div className="flex items-center gap-3">
          <Target className="h-8 w-8 text-primary" />
          <h1 className="font-headline text-2xl font-bold">Habitualize</h1>
        </div>
        <nav className="mt-10 flex flex-col gap-2">
          <p className="px-4 text-xs font-semibold uppercase text-muted-foreground">
            Menu
          </p>
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-2.5 text-muted-foreground transition-colors hover:bg-muted/50",
                  isActive &&
                    "bg-primary font-semibold text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-2">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 rounded-lg px-4 py-2.5 text-muted-foreground transition-colors hover:bg-muted/50",
            pathname.startsWith("/settings") && "bg-muted text-foreground"
          )}
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="flex items-center justify-start gap-3 rounded-lg px-4 py-2.5 text-muted-foreground hover:bg-muted/50"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </Button>
        <div className="mt-4 border-t pt-4">
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
              <p className="font-semibold">{userProfile.name}</p>
              <p className="text-xs text-muted-foreground">
                {userProfile.email}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </aside>
  );
}
