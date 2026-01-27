'use client';

import {
  ChevronLeft,
  Bell,
  Search,
  ChevronDown,
  Clock,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const categories = [
  { name: 'Strength', count: 24, imageId: 'workout-strength' },
  { name: 'Yoga', count: 18, imageId: 'workout-yoga' },
  { name: 'Cardio', count: 12, imageId: 'workout-cardio' },
  { name: 'HIIT', count: 31, imageId: 'workout-hiit' },
];

export default function WorkoutLibraryPage() {
  const router = useRouter();
  const recommendedImage = PlaceHolderImages.find(
    (p) => p.id === 'workout-recommended'
  );

  return (
    <div className="space-y-6 -mx-4 md:mx-0 -mt-6 md:-mt-8 bg-background pb-28 md:pb-8">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-background z-10 sticky top-0 border-b md:border-none">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-bold font-headline absolute left-1/2 -translate-x-1/2">
          Workout Library
        </h1>
        <Button variant="ghost" size="icon">
          <Bell className="h-6 w-6" />
        </Button>
      </header>

      <main className="px-4 space-y-6">
        {/* Search & Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search workouts..."
              className="pl-10 h-12 bg-card border-border"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4">
            <Button className="bg-primary text-primary-foreground rounded-full h-9 px-5">
              All
            </Button>
            <Select defaultValue="15-30">
              <SelectTrigger className="rounded-full h-9 w-auto gap-1 border-border focus:ring-primary">
                <SelectValue placeholder="Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-15">0-15 min</SelectItem>
                <SelectItem value="15-30">15-30 min</SelectItem>
                <SelectItem value="30-45">30-45 min</SelectItem>
                <SelectItem value="45+">45+ min</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="beginner">
              <SelectTrigger className="rounded-full h-9 w-auto gap-1 border-border focus:ring-primary">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              className="border-border rounded-full h-9 px-5"
            >
              HIIT
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold font-headline">Categories</h2>
            <Link href="#" className="text-sm font-semibold text-primary">
              See all
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => {
              const image = PlaceHolderImages.find(
                (p) => p.id === category.imageId
              );
              return (
                <Link href="#" key={category.name}>
                  <Card className="relative aspect-[4/5] overflow-hidden rounded-xl border-none">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        data-ai-hint={image.imageHint}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <CardContent className="absolute bottom-0 w-full p-4 text-white">
                      <h3 className="font-bold text-lg">{category.name}</h3>
                      <p className="text-sm text-primary">
                        {category.count} Workouts
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recommended for You */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold font-headline">
            Recommended for You
          </h2>
          <Link href="#">
            <Card className="relative overflow-hidden rounded-xl border-none group">
              <div className="aspect-video relative">
                {recommendedImage && (
                  <Image
                    src={recommendedImage.imageUrl}
                    alt={recommendedImage.description}
                    data-ai-hint={recommendedImage.imageHint}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <CardContent className="absolute bottom-0 w-full p-4 text-white">
                <Badge className="absolute top-4 right-4 bg-primary/80 border-none text-primary-foreground font-semibold">
                  PREMIUM
                </Badge>
                <h3 className="font-bold text-xl">Full Body Ignition</h3>
                <div className="flex items-center gap-4 text-sm mt-1 text-white/80">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span>45 min</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Zap className="h-4 w-4" />
                    <span>Advanced</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
}
