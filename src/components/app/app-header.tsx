"use client";

import { Button } from "@/components/ui/button";
import { Menu, Plus } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DesktopNav } from "./desktop-nav";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-sm">
      <div className="flex h-20 items-center justify-between px-4">
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72 bg-card border-r-0">
                <DesktopNav />
            </SheetContent>
        </Sheet>

        <h1 className="font-headline text-2xl font-bold text-center">Today</h1>

        <Button variant="ghost" size="icon">
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </header>
  );
}
