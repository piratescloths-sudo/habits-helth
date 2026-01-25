"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BarChart2, Trophy, User, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/progress", label: "Stats", icon: BarChart2 },
  { href: "/awards", label: "Awards", icon: Trophy },
  { href: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 z-50 w-full md:hidden">
      <div className="relative mx-auto h-16 max-w-md border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="grid h-full grid-cols-4">
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
                <item.icon className="h-6 w-6" />
                <span className={cn("text-xs", isActive && "font-bold")}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
      <Link href="/habits" className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-lg ring-4 ring-background">
          <Plus className="h-8 w-8 text-primary-foreground" />
        </div>
        <span className="sr-only">Add Habit</span>
      </Link>
    </div>
  );
}
