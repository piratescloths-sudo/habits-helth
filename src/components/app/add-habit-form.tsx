"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Heart,
  Book,
  Briefcase,
  User,
  Info,
  X,
} from "lucide-react";
import type { Habit } from "@/lib/data";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const categories: { name: Habit["category"]; icon: React.ElementType }[] = [
  { name: "Health", icon: Heart },
  { name: "Study", icon: Book },
  { name: "Work", icon: Briefcase },
  { name: "Personal", icon: User },
];

const frequencies: Habit["frequency"][] = ["Daily", "Weekly", "Custom"];

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  category: z.enum(["Health", "Study", "Work", "Personal"]),
  frequency: z.enum(["Daily", "Weekly", "Custom"]),
});

type FormValues = z.infer<typeof formSchema>;

type AddHabitFormProps = {
  onFormSubmit: (data: Omit<Habit, "id" | "streak" | "status" | "customDays" | "priority" | "icon" | "details">) => void;
  onClose: () => void;
};

export function AddHabitForm({ onFormSubmit, onClose }: AddHabitFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "Health",
      frequency: "Daily",
    },
  });

  function onSubmit(data: FormValues) {
    onFormSubmit({
      name: data.name,
      category: data.category,
      frequency: data.frequency,
    });
  }

  return (
    <div className="flex flex-col h-full bg-background">
       <header className="flex items-center justify-between p-4 flex-shrink-0">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
          <div className="text-center">
            <h1 className="font-headline text-xl font-bold">New Habit</h1>
            <p className="text-sm font-bold text-primary">STEP 1 OF 2</p>
          </div>
          <div className="w-10" /> {/* Spacer */}
        </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 flex flex-col">
          <main className="flex-1 p-6 space-y-8 overflow-y-auto">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold mb-2 block">What's the habit name?</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Morning Meditation"
                      className="h-14 text-base bg-card border-primary/50 focus:border-primary ring-offset-background focus-visible:ring-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold mb-2 block">Choose a category</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-2 gap-4"
                      >
                        {categories.map((cat) => (
                          <FormItem key={cat.name}>
                            <FormControl>
                              <RadioGroupItem value={cat.name} className="sr-only" />
                            </FormControl>
                            <FormLabel className={cn(
                              "h-20 flex flex-col items-center justify-center gap-2 text-base border-2 rounded-lg cursor-pointer",
                              "transition-colors",
                              field.value === cat.name
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-border bg-card text-muted-foreground"
                            )}>
                              <cat.icon className="h-6 w-6" />
                              {cat.name}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                     <FormMessage />
                  </FormItem>
                )}
              />

            <FormField
              control={form.control}
              name="frequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold mb-2 block">How often?</FormLabel>
                  <FormControl>
                     <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex rounded-lg bg-card p-1"
                    >
                      {frequencies.map((freq) => (
                         <FormItem key={freq} className="flex-1">
                            <FormControl>
                                <RadioGroupItem value={freq} className="sr-only" />
                            </FormControl>
                            <FormLabel className={cn(
                                "flex-1 w-full justify-center rounded-md h-11 inline-flex items-center cursor-pointer",
                                "text-muted-foreground hover:bg-muted/50",
                                field.value === freq && "bg-primary text-primary-foreground hover:bg-primary/90"
                            )}>
                                {freq}
                            </FormLabel>
                         </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                   <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p>You can adjust specific days in the next step.</p>
            </div>
          </main>

          <footer className="p-6 border-t border-border mt-auto">
            <Button
              type="submit"
              className="w-full h-14 text-lg font-bold"
              disabled={!form.formState.isValid || !form.formState.isDirty}
            >
              Next Step <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </footer>
        </form>
      </Form>
    </div>
  );
}
