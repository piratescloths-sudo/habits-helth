import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";

export default function AwardsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-headline text-2xl font-bold">Awards</h1>
      <Card className="text-center p-8 border-dashed">
        <Trophy className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">Your awards will appear here.</p>
        <p className="text-muted-foreground text-sm">Keep up the good work to earn them!</p>
      </Card>
    </div>
  );
}
