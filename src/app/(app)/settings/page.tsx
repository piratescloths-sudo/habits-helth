import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ChevronRight } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-headline">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize the look and feel of your app.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="font-medium">Theme</span>
            <ThemeToggle />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Manage how you receive reminders and updates.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="daily-reminders" className="font-medium">Daily Reminders</label>
            <Switch id="daily-reminders" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="missed-alerts" className="font-medium">Missed Habit Alerts</label>
            <Switch id="missed-alerts" />
          </div>
           <div className="flex items-center justify-between">
            <label htmlFor="weekly-summary" className="font-medium">Weekly Summary Email</label>
            <Switch id="weekly-summary" defaultChecked/>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>
            Manage your account and data.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
            <Button variant="ghost" className="w-full justify-between">
                <span>Export Data</span>
                <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="ghost" className="w-full justify-between text-destructive hover:text-destructive">
                <span>Delete Account</span>
                <ChevronRight className="h-4 w-4" />
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
