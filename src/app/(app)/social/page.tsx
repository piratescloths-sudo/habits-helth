'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function SocialPage() {
  const { toast } = useToast();

  const handleShare = async () => {
    const shareData = {
      title: 'Habitualize',
      text: 'Check out Habitualize and start building better habits today!',
      url: window.location.origin,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      try {
        await navigator.clipboard.writeText(shareData.url);
        toast({
          title: 'Link Copied!',
          description: 'The website link has been copied to your clipboard.',
        });
      } catch (error) {
        console.error('Error copying to clipboard:', error);
        toast({
          variant: 'destructive',
          title: 'Oops!',
          description: 'Could not copy the link to your clipboard.',
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="font-headline text-2xl font-bold">Social</h1>

      <Card>
        <CardHeader>
          <CardTitle>Share with Friends</CardTitle>
          <CardDescription>
            Invite your friends to join you on Habitualize and build habits
            together.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleShare} className="w-full">
            <Share2 className="mr-2 h-4 w-4" />
            Share App Link
          </Button>
        </CardContent>
      </Card>

      <Card className="text-center p-8 border-dashed">
        <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">
          Your social feed will appear here.
        </p>
        <p className="text-muted-foreground text-sm">
          Connect with friends to see their progress!
        </p>
      </Card>
    </div>
  );
}
