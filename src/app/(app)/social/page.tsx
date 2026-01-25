import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function SocialPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-headline text-2xl font-bold">Social</h1>
      <Card className="text-center p-8 border-dashed">
        <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">Your social feed will appear here.</p>
        <p className="text-muted-foreground text-sm">Connect with friends to see their progress!</p>
      </Card>
    </div>
  );
}
