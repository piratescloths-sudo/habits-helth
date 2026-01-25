import { AppHeader } from "@/components/app/app-header";
import { BottomNav } from "@/components/app/bottom-nav";
import { Smartphone } from "lucide-react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="relative flex min-h-dvh w-full flex-col bg-background md:hidden">
        <AppHeader />
        <main className="flex-1 px-4 py-6 pb-24">{children}</main>
        <BottomNav />
      </div>
      <div className="hidden min-h-dvh w-full flex-col items-center justify-center bg-muted/40 p-10 text-center md:flex">
        <div className="flex flex-col items-center justify-center rounded-lg border bg-background p-12 shadow-lg">
            <Smartphone className="mb-4 h-16 w-16 text-primary" />
            <h1 className="mb-2 font-headline text-2xl font-bold">
            Habitualize is designed for mobile
            </h1>
            <p className="text-muted-foreground">
            Please open this on your phone or use your browser's developer tools
            <br />
            to view it in a mobile resolution.
            </p>
        </div>
      </div>
    </>
  );
}
