
import { Card, CardContent } from "@/components/ui/card";

export function StreakOverview() {
    return (
        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="grid grid-cols-3 divide-x divide-border">
              <div className="text-center px-2">
                <p className="text-3xl font-bold text-primary">24</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Day Streak
                </p>
              </div>
              <div className="text-center px-2">
                <p className="text-3xl font-bold text-primary">158</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Completed
                </p>
              </div>
              <div className="text-center px-2">
                <p className="text-3xl font-bold text-primary">8</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Badges</p>
              </div>
            </div>
          </CardContent>
        </Card>
    )
}
