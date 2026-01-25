"use client";

import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useRouter } from "next/navigation";
import { useUser } from "@/firebase";
import { useEffect } from "react";

export default function LoginPage() {
  const authHeroImage = PlaceHolderImages.find((p) => p.id === "auth-hero");
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && user) {
      router.replace('/dashboard');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || user) {
    return (
        <div className="flex min-h-dvh w-full flex-col items-center justify-center bg-background">
            <p>Loading...</p>
        </div>
    )
  }

  return (
    <div className="flex min-h-dvh w-full flex-col items-center bg-background">
      <div className="flex w-full max-w-md flex-1 flex-col">
        <header className="relative flex h-20 items-center justify-center p-4">
            <h1 className="font-headline text-xl font-semibold">
                Welcome Back
            </h1>
        </header>
        <main className="flex flex-1 flex-col justify-center p-6 pt-0">
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
          <LoginForm />
        </main>
      </div>
    </div>
  );
}
