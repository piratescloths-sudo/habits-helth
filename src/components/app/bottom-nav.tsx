"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BarChart2,
  Compass,
  Dumbbell,
  Salad,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Today", icon: Home },
  { href: "/progress", label: "Progress", icon: BarChart2 },
  { href: "/habits", label: "Habits", icon: Compass },
  { href: "/workout", label: "Workout", icon: Dumbbell },
  { href: "/diet", label: "Diet", icon: Salad },
  { href: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 z-50 w-full md:hidden">
      <div className="relative mx-auto h-20 max-w-md border-t border-border/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="grid h-full grid-cols-6 items-center">
          {navItems.map((item) => {
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
                <span className={cn("text-xs font-medium")}>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
