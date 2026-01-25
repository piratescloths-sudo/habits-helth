"use client";

import { AppHeader } from "@/components/app/app-header";
import { BottomNav } from "@/components/app/bottom-nav";
import { DesktopNav } from "@/components/app/desktop-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Mobile view */}
      <div className="relative flex min-h-dvh w-full flex-col bg-background md:hidden">
        <AppHeader />
        <main className="flex-1 px-4 py-6 pb-24">{children}</main>
        <BottomNav />
      </div>

      {/* Desktop view */}
      <div className="hidden min-h-dvh w-full bg-muted/40 md:flex">
        <DesktopNav />
        <main className="w-full flex-1 bg-background">
          <div className="h-full overflow-y-auto p-8">
            <div className="mx-auto max-w-6xl">{children}</div>
          </div>
        </main>
      </div>
    </>
  );
}
