"use client";

import { useState } from "react";
import { userProfile as initialProfile } from "@/lib/data";
import { ProfileForm } from "@/components/app/profile-form";
import { AccountActions } from "@/components/app/account-actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const router = useRouter();
  const { toast } = useToast();

  const handleUpdate = (updatedProfile: typeof initialProfile) => {
    setProfile(updatedProfile);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved.",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    router.push("/");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-headline">Profile</h1>
      <ProfileForm profile={profile} onUpdate={handleUpdate} />
      <AccountActions onLogout={handleLogout} />
    </div>
  );
}
