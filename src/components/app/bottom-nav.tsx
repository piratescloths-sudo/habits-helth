"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BarChart2, Compass, User, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useHabits } from "./habit-provider";

const navItems = [
  { href: "/dashboard", label: "Today", icon: Home },
  { href: "/progress", label: "Stats", icon: BarChart2 },
  { href: "/habits", label: "Explore", icon: Compass },
  { href: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();
  const { setIsAddDialogOpen } = useHabits();

  return (
    <div className="fixed bottom-0 z-50 w-full md:hidden">
      <div className="relative mx-auto h-20 max-w-md border-t border-border/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="grid h-full grid-cols-5 items-center">
          {navItems.slice(0, 2).map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-primary",
                  isActive && "text-primary"
                )}
              >
                <item.icon className={cn("h-6 w-6")} />
                <span className={cn("text-xs font-medium")}>
                  {item.label}
                </span>
              </Link>
            );
          })}

          <div className="flex justify-center">
            <Button size="icon" className="h-16 w-16 rounded-full bg-primary hover:bg-primary/90 -translate-y-6 shadow-lg shadow-primary/50" onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-8 w-8" />
            </Button>
          </div>
          
          {navItems.slice(2, 4).map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-primary",
                  isActive && "text-primary"
                )}
              >
                <item.icon className={cn("h-6 w-6")} />
                <span className={cn("text-xs font-medium")}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
