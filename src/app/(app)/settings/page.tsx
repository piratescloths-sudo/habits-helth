"use client";

import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Pencil,
  Lock,
  ShieldCheck,
  Moon,
  Bell,
  Clock,
  HelpCircle,
  Shield,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { UserProfile } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useTheme } from "@/components/theme-provider";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useUser, useFirestore, useDoc, useMemoFirebase, useAuth } from "@/firebase";
import { doc } from 'firebase/firestore';
import { signOut } from "firebase/auth";
import { Skeleton } from "@/components/ui/skeleton";

const SettingsItem = ({
  icon: Icon,
  label,
  action,
  href,
  target,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  action?: React.ReactNode;
  href?: string;
  target?: string;
  onClick?: () => void;
}) => {
  const content = (
    <div
      className="flex items-center gap-4 p-4 rounded-xl bg-card hover:bg-accent transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="p-2 bg-primary/10 rounded-lg">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <span className="flex-1 font-medium">{label}</span>
      {action}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
      >
        {content}
      </Link>
    );
  }
  return content;
};

export default function SettingsPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const auth = useAuth();

  const userProfileRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const { data: userProfile, isLoading } = useDoc<UserProfile>(userProfileRef);

  const profileImage = PlaceHolderImages.find((p) => p.id === "profile");
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const { toast } = useToast();

  const handleThemeChange = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  const handleLogout = async () => {
    try {
        await signOut(auth);
        toast({
            title: "Logged Out",
            description: "You have been successfully logged out.",
        });
        router.push("/");
    } catch (error) {
        toast({
            variant: "destructive",
            title: "Logout Failed",
            description: "An error occurred while logging out.",
        });
    }
  };

  if (isLoading || !userProfile) {
      return (
          <div className="space-y-8 -mx-4 md:mx-0 -mt-6 md:-mt-8 bg-background pb-28 md:pb-8">
              <main className="px-4 space-y-8">
                <Skeleton className="h-8 w-32 hidden md:block" />
                <div className="flex flex-col items-center text-center space-y-2">
                    <Skeleton className="h-24 w-24 rounded-full" />
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-32" />
                </div>
                <div className="space-y-4">
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-14 w-full" />
                    <Skeleton className="h-14 w-full" />
                </div>
              </main>
          </div>
      )
  }

  return (
    <div className="space-y-8 -mx-4 md:mx-0 -mt-6 md:-mt-8 bg-background pb-28 md:pb-8">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-background z-10 sticky top-0 md:hidden">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold font-headline">Settings</h1>
        <div className="w-10"></div> {/* Spacer */}
      </header>

      <main className="px-4 space-y-8">
        <h1 className="text-2xl font-bold font-headline hidden md:block">
          Settings
        </h1>

        {/* Profile Info */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-card">
              <AvatarImage
                src={profileImage?.imageUrl}
                alt={userProfile.name}
                data-ai-hint={profileImage?.imageHint}
              />
              <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Link href="/profile/edit">
              <Button
                size="icon"
                className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-primary text-primary-foreground"
              >
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit photo</span>
              </Button>
            </Link>
          </div>
          <h2 className="text-2xl font-bold">{userProfile.name}</h2>
          <p className="text-muted-foreground -mt-2">
            {userProfile.levelTitle}
          </p>
        </div>

        {/* Account Management */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase text-muted-foreground tracking-wider px-2">
            Account Management
          </h3>
          <div className="space-y-2">
            <SettingsItem
              icon={Lock}
              label="Change Password"
              href="/profile/edit"
              action={<ChevronRight className="h-5 w-5 text-muted-foreground" />}
            />
            <SettingsItem
              icon={ShieldCheck}
              label="Subscription Status"
              href="#"
              action={
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-primary">Pro</span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              }
            />
          </div>
        </div>

        {/* Appearance */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase text-muted-foreground tracking-wider px-2">
            Appearance
          </h3>
          <SettingsItem
            icon={Moon}
            label="Dark Mode"
            action={
              <Switch
                checked={theme === "dark"}
                onCheckedChange={handleThemeChange}
              />
            }
          />
        </div>

        {/* Preferences */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase text-muted-foreground tracking-wider px-2">
            Preferences
          </h3>
          <div className="space-y-2">
            <SettingsItem
              icon={Bell}
              label="Notifications"
              action={<Switch defaultChecked />}
            />
            <SettingsItem
              icon={Clock}
              label="Time Zone"
              href="#"
              action={
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span>GMT -05:00</span>
                  <ChevronRight className="h-5 w-5" />
                </div>
              }
            />
          </div>
        </div>

        {/* Support */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase text-muted-foreground tracking-wider px-2">
            Support
          </h3>
          <div className="space-y-2">
            <SettingsItem
              icon={HelpCircle}
              label="Help Center"
              href="#"
              target="_blank"
              action={
                <ExternalLink className="h-5 w-5 text-muted-foreground" />
              }
            />
            <SettingsItem
              icon={Shield}
              label="Privacy Policy"
              href="#"
              action={<ChevronRight className="h-5 w-5 text-muted-foreground" />}
            />
          </div>
        </div>

        {/* Log Out */}
        <div className="pt-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                className="w-full h-12 text-lg font-bold bg-destructive/10 text-destructive hover:bg-destructive/20 hover:text-destructive"
              >
                <LogOut className="mr-2 h-5 w-5" />
                Log Out
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to log out?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  You will be returned to the login page.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout}>
                  Log Out
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Version 2.4.1 (Build 108)
        </p>
      </main>
    </div>
  );
}
