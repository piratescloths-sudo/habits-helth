import { generateMotivationalPrompt } from "@/ai/flows/motivational-prompts";
import { Separator } from "@/components/ui/separator";

export async function MotivationalPrompt() {
  const { quote, author } = await generateMotivationalPrompt();

  return (
    <div className="text-center py-8 px-4 space-y-4">
        <Separator className="w-1/4 mx-auto bg-primary/50" />
        <blockquote className="text-lg italic text-foreground/90">
            "{quote}"
        </blockquote>
        <p className="text-sm text-muted-foreground">- {author}</p>
    </div>
  );
}
