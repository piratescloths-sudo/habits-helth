"use client";

import { AppHeader } from "@/components/app/app-header";
import { BottomNav } from "@/components/app/bottom-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-dvh w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1 pb-24">{children}</main>
      <BottomNav />
    </div>
  );
}
