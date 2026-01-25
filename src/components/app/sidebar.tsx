"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BarChart2,
  Trophy,
  Users,
  User,
  Settings,
  Target,
  Plus,
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHabits } from "@/components/app/habit-provider";

const mainNavItems = [
  { href: "/dashboard", label: "Today", icon: Home },
  { href: "/progress", label: "Progress", icon: BarChart2 },
  { href: "/habits", label: "Habits", icon: Compass },
  { href: "/awards", label: "Awards", icon: Trophy },
  { href: "/social", label: "Social", icon: Users },
];

const secondaryNavItems = [
    { href: "/profile", label: "Profile", icon: User },
    { href: "/settings", label: "Settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname();
  const { setIsAddDialogOpen } = useHabits();

  return (
    <aside className="hidden md:flex flex-col w-64 border-r bg-card">
      <div className="flex items-center justify-center h-20 border-b px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
            <Target className="h-7 w-7 text-primary" />
            <h1 className="text-xl font-bold font-headline">Habitualize</h1>
        </Link>
      </div>
      <div className="flex-1 flex flex-col justify-between p-4">
        <div className="space-y-4">
            <Button className="w-full h-12 text-lg" onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="mr-2 h-5 w-5" />
                New Habit
            </Button>
            <nav className="mt-4 space-y-1">
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
        </div>
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
