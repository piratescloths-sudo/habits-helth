import { generateMotivationalPrompt } from "@/ai/flows/motivational-prompts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sparkles } from "lucide-react";

export async function MotivationalPrompt() {
  const { quote, habitTip } = await generateMotivationalPrompt();

  return (
    <Card className="border-accent/50 bg-accent/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-lg text-accent-foreground/80">
          <Sparkles className="text-accent" />
          Daily Spark
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Quote of the day
          </p>
          <p className="italic">"{quote}"</p>
        </div>
        <Separator />
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Habit tip
          </p>
          <p>{habitTip}</p>
        </div>
      </CardContent>
    </Card>
  );
}
