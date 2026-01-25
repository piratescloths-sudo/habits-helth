"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ListChecks, LineChart, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Today", icon: Home },
  { href: "/habits", label: "Habits", icon: ListChecks },
  { href: "/progress", label: "Progress", icon: LineChart },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 z-50 h-16 w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <div className="mx-auto h-full max-w-md">
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
                <span className={cn("text-xs font-medium", isActive && "font-bold")}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
