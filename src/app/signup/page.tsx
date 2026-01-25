import Link from "next/link";
import { Target } from "lucide-react";
import { SignupForm } from "@/components/auth/signup-form";

export default function SignupPage() {
  return (
    <div className="flex min-h-dvh w-full flex-col items-center bg-muted/40">
      <div className="flex w-full max-w-md flex-1 flex-col bg-background">
        <header className="flex justify-center p-4 py-8">
          <Link href="/" className="flex items-center gap-2 text-primary">
            <Target className="h-6 w-6" />
            <h1 className="font-headline text-2xl font-bold">Habitualize</h1>
          </Link>
        </header>
        <main className="flex flex-1 flex-col justify-center p-6 pt-0">
          <SignupForm />
        </main>
      </div>
    </div>
  );
}
