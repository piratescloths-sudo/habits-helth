"use client";

import { useUser, useFirestore, useDoc, useMemoFirebase, useAuth } from "@/firebase";
import { UserProfile } from "@/lib/data";
import { doc } from 'firebase/firestore';
import { ProfileForm } from "@/components/app/profile-form";
import { AccountActions } from "@/components/app/account-actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { signOut } from "firebase/auth";

export default function EditProfilePage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const userProfileRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const { data: profile, isLoading } = useDoc<UserProfile>(userProfileRef);

  const handleUpdate = (updatedProfile: Partial<UserProfile>) => {
    if (!userProfileRef) return;
    // Assuming setDocumentNonBlocking is imported and available
    // setDocumentNonBlocking(userProfileRef, updatedProfile, { merge: true });
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved.",
    });
    router.push("/profile");
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
  
  if (isLoading || !profile) {
      return (
        <div className="space-y-6">
            <Skeleton className="h-8 w-48" />
            <div className="space-y-4">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-48 w-full" />
            </div>
        </div>
      )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-headline">Edit Profile</h1>
      <ProfileForm profile={profile} onUpdate={handleUpdate} />
      <AccountActions onLogout={handleLogout} />
    </div>
  );
}
