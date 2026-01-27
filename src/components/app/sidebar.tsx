"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BarChart2,
  Users,
  User,
  Settings,
  Target,
  Compass,
  Flag,
  Salad,
  Dumbbell,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const mainNavItems = [
  { href: "/dashboard", label: "Today", icon: Home },
  { href: "/progress", label: "Progress", icon: BarChart2 },
  { href: "/reports", label: "Reports", icon: Flag },
  { href: "/habits", label: "Habits", icon: Compass },
  { href: "/workout", label: "Workout", icon: Dumbbell },
  { href: "/diet", label: "Diet", icon: Salad },
  { href: "/social", label: "Social", icon: Users },
];

const secondaryNavItems = [
    { href: "/profile", label: "Profile", icon: User },
    { href: "/settings", label: "Settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 border-r bg-card">
      <div className="flex items-center justify-center h-20 border-b px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
            <Target className="h-7 w-7 text-primary" />
            <h1 className="text-xl font-bold font-headline">Habitualize</h1>
        </Link>
      </div>
      <div className="flex-1 flex flex-col justify-between p-4">
        <nav className="space-y-1">
        {mainNavItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
            <Link key={item.label} href={item.href}>
                <Button
                variant={isActive ? "secondary" : "ghost"}
                className="w-full justify-start h-11 text-base"
                >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
                </Button>
            </Link>
            );
        })}
        </nav>
        <nav className="space-y-1">
             {secondaryNavItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                <Link key={item.label} href={item.href}>
                    <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className="w-full justify-start h-11 text-base"
                    >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.label}
                    </Button>
                </Link>
                );
            })}
        </nav>
      </div>
    </aside>
  );
}
