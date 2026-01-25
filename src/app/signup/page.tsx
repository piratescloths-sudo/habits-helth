import Link from "next/link";
import { SignupForm } from "@/components/auth/signup-form";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const authHeroImage = PlaceHolderImages.find((p) => p.id === "auth-hero");

  return (
    <div className="flex min-h-dvh w-full flex-col items-center bg-background">
      <div className="flex w-full max-w-md flex-1 flex-col">
        <header className="relative flex h-20 items-center justify-center p-4">
          <Link href="/" className="absolute left-4 top-1/2 -translate-y-1/2">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="font-headline text-xl font-semibold">
            Join the Community
          </h1>
        </header>
        <main className="flex flex-1 flex-col p-6 pt-0">
          <div className="relative mb-6 aspect-[4/3] w-full overflow-hidden rounded-lg">
            {authHeroImage && (
              <Image
                src={authHeroImage.imageUrl}
                alt={authHeroImage.description}
                data-ai-hint={authHeroImage.imageHint}
                fill
                className="object-cover"
                priority
              />
            )}
          </div>
          <SignupForm />
        </main>
      </div>
    </div>
  );
}
