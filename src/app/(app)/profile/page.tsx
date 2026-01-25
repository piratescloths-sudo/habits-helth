"use client";

import Link from "next/link";
import { userProfile } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";


export default function ProfilePage() {
  const profileImage = PlaceHolderImages.find((p) => p.id === "profile");
  
  return (
    <div className="space-y-8 p-4">
      {/* Profile Header */}
      <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20 border-4 border-card">
            <AvatarImage
              src={profileImage?.imageUrl}
              alt={userProfile.name}
              data-ai-hint={profileImage?.imageHint}
            />
            <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
          </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{userProfile.name}</h1>
          <p className="text-muted-foreground">{userProfile.email}</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <h2 className="font-headline text-lg font-bold">Account</h2>
        <Card>
            <CardContent className="p-2">
                <Link href="/profile/edit">
                    <Button variant="ghost" className="w-full justify-between h-12 px-4">
                        <span>Edit Profile</span>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </Button>
                </Link>
            </CardContent>
        </Card>
      </div>

       <div className="space-y-2">
        <h2 className="font-headline text-lg font-bold">Settings</h2>
        <Card>
            <CardContent className="p-2">
                <Link href="/settings">
                    <Button variant="ghost" className="w-full justify-between h-12 px-4">
                        <span>App Settings</span>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </Button>
                </Link>
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
