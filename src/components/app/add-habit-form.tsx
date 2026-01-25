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
  ArrowLeft,
  TrendingDown,
  AlertTriangle,
  TrendingUp,
  Bell,
  Check,
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
import { Switch } from "../ui/switch";

const categories: { name: Habit["category"]; icon: React.ElementType }[] = [
  { name: "Health", icon: Heart },
  { name: "Study", icon: Book },
  { name: "Work", icon: Briefcase },
  { name: "Personal", icon: User },
];

const frequencies: Habit["frequency"][] = ["Daily", "Weekly", "Custom"];
const priorities: Habit["priority"][] = ["Low", "Medium", "High"];

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  category: z.enum(["Health", "Study", "Work", "Personal"]),
  frequency: z.enum(["Daily", "Weekly", "Custom"]),
});

type FormValues = z.infer<typeof formSchema>;

type AddHabitFormProps = {
  onFormSubmit: (data: Omit<Habit, "id" | "streak" | "status" | "customDays" | "icon" | "details">) => void;
  onClose: () => void;
};

export function AddHabitForm({ onFormSubmit, onClose }: AddHabitFormProps) {
  const [step, setStep] = useState(1);
  const [habitData, setHabitData] = useState<Partial<FormValues>>({});
  const [priority, setPriority] = useState<Habit['priority']>('Medium');
  const [notifications, setNotifications] = useState(true);


  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "Health",
      frequency: "Daily",
    },
  });

  function handleNextStep(data: FormValues) {
    setHabitData(data);
    setStep(2);
  }
  
  function handleCreateHabit() {
    const finalData = {
      ...habitData,
      priority,
    } as Omit<Habit, "id" | "streak" | "status" | "customDays" | "icon" | "details">;
    
    onFormSubmit(finalData);
  }

  const priorityIcons = {
    Low: TrendingDown,
    Medium: AlertTriangle,
    High: TrendingUp
  }

  return (
    <div className="flex h-full flex-col bg-background">
      <header className="flex-shrink-0 border-b p-4 flex items-center justify-between">
        {step === 1 ? (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        ) : (
          <Button variant="ghost" size="icon" onClick={() => setStep(1)}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
        )}
        <div className="text-center">
          <h1 className="font-headline text-xl font-bold">New Habit</h1>
          <p className="text-sm font-bold text-primary">STEP {step} OF 2</p>
        </div>
        <div className="w-10" /> {/* Spacer */}
      </header>

      <Form {...form}>
        {step === 1 && (
          <form onSubmit={form.handleSubmit(handleNextStep)} className="flex-1 flex flex-col overflow-y-auto">
            <div className="flex-1 space-y-2 p-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold mb-2 block">What's the habit name?</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Morning Meditation"
                        className="h-9 text-sm bg-card border-primary/50 focus:border-primary ring-offset-background focus-visible:ring-primary"
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
                          className="grid grid-cols-2 gap-2"
                        >
                          {categories.map((cat) => (
                            <FormItem key={cat.name}>
                              <FormControl>
                                <RadioGroupItem value={cat.name} className="sr-only" />
                              </FormControl>
                              <FormLabel className={cn(
                                "h-12 flex flex-col items-center justify-center gap-1 text-xs border-2 rounded-lg cursor-pointer",
                                "transition-colors",
                                field.value === cat.name
                                  ? "border-primary bg-primary/10 text-primary"
                                  : "border-border bg-card text-muted-foreground"
                              )}>
                                <cat.icon className="h-4 w-4" />
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
                                  "flex-1 w-full justify-center rounded-md h-8 inline-flex items-center cursor-pointer",
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
            </div>
            <footer className="p-4 border-t border-border flex-shrink-0">
              <Button
                type="submit"
                className="w-full h-9 text-base font-bold"
              >
                Next Step <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </footer>
          </form>
        )}

        {step === 2 && (
           <div className="flex-1 flex flex-col overflow-y-auto">
              <div className="p-4 space-y-2">
                <div>
                    <h2 className="text-lg font-semibold mb-1">Set Reminders</h2>
                    <p className="text-muted-foreground text-sm">Consistency is key to building new habits.</p>
                </div>
                
                <div>
                    <FormLabel className="text-lg font-semibold mb-2 block">When should we remind you?</FormLabel>
                    <div className="bg-card p-2 rounded-lg flex items-center justify-center gap-2">
                        <div className="text-center">
                            <span className="text-muted-foreground text-xs">06</span>
                            <div className="bg-primary/20 text-primary font-bold text-lg rounded-lg p-2 w-10 text-center">07</div>
                            <span className="text-muted-foreground text-xs">08</span>
                        </div>
                        <span className="text-primary font-bold text-lg">:</span>
                        <div className="text-center">
                            <span className="text-muted-foreground text-xs">15</span>
                            <div className="bg-primary/20 text-primary font-bold text-lg rounded-lg p-2 w-10 text-center">30</div>
                             <span className="text-muted-foreground text-xs">45</span>
                        </div>
                        <div className="flex flex-col gap-1 ml-2">
                            <Button variant="ghost" className="bg-primary/20 text-primary h-auto p-1 text-xs">AM</Button>
                            <Button variant="ghost" className="text-muted-foreground h-auto p-1 text-xs">PM</Button>
                        </div>
                    </div>
                </div>

                <div>
                    <FormLabel className="text-lg font-semibold mb-2 block">Priority Level</FormLabel>
                     <RadioGroup
                        value={priority}
                        onValueChange={(value: Habit['priority']) => setPriority(value)}
                        className="grid grid-cols-3 gap-2"
                      >
                        {priorities.map((p) => {
                            const Icon = priorityIcons[p];
                            return (
                                <FormItem key={p}>
                                    <FormControl>
                                        <RadioGroupItem value={p} className="sr-only" />
                                    </FormControl>
                                    <FormLabel className={cn(
                                        "h-12 flex flex-col items-center justify-center gap-1 text-xs border-2 rounded-lg cursor-pointer",
                                        "transition-colors",
                                        priority === p
                                        ? "border-primary bg-primary/10 text-primary"
                                        : "border-border bg-card text-muted-foreground"
                                    )}>
                                        <Icon className="h-4 w-4" />
                                        {p}
                                    </FormLabel>
                                </FormItem>
                            )
                        })}
                      </RadioGroup>
                </div>
                
                <div className="bg-card p-2 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Bell className="h-5 w-5 text-primary"/>
                        <div>
                            <h3 className="font-semibold text-sm">Push Notifications</h3>
                            <p className="text-xs text-muted-foreground">Receive a nudge when it's time</p>
                        </div>
                    </div>
                    <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>
                 <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <p>Setting up "{habitData.name || 'your new'}" habit...</p>
                </div>
              </div>
            <footer className="p-4 border-t border-border flex-shrink-0">
              <Button
                onClick={handleCreateHabit}
                className="w-full h-9 text-base font-bold"
              >
                <Check className="mr-2 h-5 w-5" /> Create Habit
              </Button>
            </footer>
         </div>
        )}
      </Form>
    </div>
  );
}
