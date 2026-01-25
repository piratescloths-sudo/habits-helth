"use client";

import { generateMotivationalPrompt, type MotivationalPromptOutput } from "@/ai/flows/motivational-prompts";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

export function MotivationalPrompt() {
  const [prompt, setPrompt] = useState<MotivationalPromptOutput | null>(null);

  useEffect(() => {
    generateMotivationalPrompt().then(setPrompt);
  }, []);

  if (!prompt) {
    return (
      <div className="text-center py-8 px-4 space-y-4">
        <Separator className="w-1/4 mx-auto bg-primary/50" />
        <div className="space-y-2">
            <Skeleton className="h-5 w-3/4 mx-auto" />
            <Skeleton className="h-4 w-1/4 mx-auto" />
        </div>
      </div>
    );
  }

  const { quote, author } = prompt;

  return (
    <div className="text-center py-8 px-4 space-y-4">
      <Separator className="w-1/4 mx-auto bg-primary/50" />
      <blockquote className="text-lg italic text-foreground/90">
        &quot;{quote}&quot;
      </blockquote>
      <p className="text-sm text-muted-foreground">- {author}</p>
    </div>
  );
}
