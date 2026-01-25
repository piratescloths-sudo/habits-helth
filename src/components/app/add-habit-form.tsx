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
  ChevronUp,
  ChevronDown,
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
import { ScrollArea } from "../ui/scroll-area";

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
  const [priority, setPriority] = useState<Habit['priority']>('Medium');
  const [notifications, setNotifications] = useState(true);
  const [reminderTime, setReminderTime] = useState({ hour: 7, minute: 30, period: 'AM' as 'AM' | 'PM' });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "Health",
      frequency: "Daily",
    },
  });

  function handleNextStep() {
    form.trigger().then(isValid => {
      if (isValid) {
        setStep(2);
      }
    });
  }

  function handleCreateHabit() {
    const finalData = {
      ...form.getValues(),
      priority,
    } as Omit<Habit, "id" | "streak" | "status" | "customDays" | "icon" | "details">;

    onFormSubmit(finalData);
  }

  const handleTimeChange = (part: 'hour' | 'minute', amount: number) => {
    setReminderTime(prev => {
        let { hour, minute } = prev;
        if (part === 'hour') {
            hour += amount;
            if (hour > 12) hour = 1;
            if (hour < 1) hour = 12;
        }
        if (part === 'minute') {
            minute += amount;
            if (minute >= 60) minute = 0;
            if (minute < 0) minute = 55;
        }
        return {...prev, hour, minute };
    });
  };

  const formatTime = (time: number) => time.toString().padStart(2, '0');

  const priorityIcons = {
    Low: TrendingDown,
    Medium: AlertTriangle,
    High: TrendingUp,
  };

  return (
    <Form {...form}>
      <div className="flex h-full flex-col bg-background">
        <header className="flex-shrink-0 border-b p-4 flex items-center justify-between">
          {step === 1 ? (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setStep(1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <div className="text-center">
            <h1 className="font-headline text-lg font-bold">New Habit</h1>
            <p className="text-xs font-bold text-primary">STEP {step} OF 2</p>
          </div>
          <div className="w-9" /> {/* Spacer */}
        </header>

        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            {step === 1 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleNextStep();
                }}
                className="flex h-full flex-col"
              >
                <div className="flex-1 p-4 space-y-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold mb-1 block">
                          What's the habit name?
                        </FormLabel>
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
                        <FormLabel className="text-base font-semibold mb-1 block">
                          Choose a category
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-2 gap-2"
                          >
                            {categories.map((cat) => (
                              <FormItem key={cat.name}>
                                <FormControl>
                                  <RadioGroupItem
                                    value={cat.name}
                                    className="sr-only"
                                  />
                                </FormControl>
                                <FormLabel
                                  className={cn(
                                    "h-11 flex flex-col items-center justify-center gap-1 text-xs border-2 rounded-lg cursor-pointer",
                                    "transition-colors",
                                    field.value === cat.name
                                      ? "border-primary bg-primary/10 text-primary"
                                      : "border-border bg-card text-muted-foreground"
                                  )}
                                >
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
                        <FormLabel className="text-base font-semibold mb-1 block">
                          How often?
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex rounded-lg bg-card p-1"
                          >
                            {frequencies.map((freq) => (
                              <FormItem key={freq} className="flex-1">
                                <FormControl>
                                  <RadioGroupItem
                                    value={freq}
                                    className="sr-only"
                                  />
                                </FormControl>
                                <FormLabel
                                  className={cn(
                                    "flex-1 w-full justify-center rounded-md h-8 inline-flex items-center cursor-pointer text-xs",
                                    "text-muted-foreground hover:bg-muted/50",
                                    field.value === freq &&
                                      "bg-primary text-primary-foreground hover:bg-primary/90"
                                  )}
                                >
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

                  <div className="flex items-start gap-2 text-xs text-muted-foreground pt-1">
                    <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
                    <p>You can adjust specific days in the next step.</p>
                  </div>
                </div>
                <footer className="p-4 border-t border-border flex-shrink-0 mt-auto">
                  <Button
                    type="submit"
                    className="w-full h-9 text-sm font-bold"
                  >
                    Next Step <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </footer>
              </form>
            )}

            {step === 2 && (
              <div className="flex h-full flex-col">
                <div className="flex-1 p-4 space-y-3">
                  <div>
                    <h2 className="text-base font-semibold mb-1">
                      Set Reminders
                    </h2>
                    <p className="text-muted-foreground text-xs">
                      Consistency is key to building new habits.
                    </p>
                  </div>

                  <div>
                    <FormLabel className="text-base font-semibold mb-1 block">
                      When should we remind you?
                    </FormLabel>
                    <div className="bg-card p-2 rounded-lg flex items-center justify-center gap-1">
                        <div className="text-center space-y-1">
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleTimeChange('hour', 1)}><ChevronUp className="h-4 w-4" /></Button>
                            <div className="bg-primary/20 text-primary font-bold text-base rounded-md p-1 w-10 text-center">{formatTime(reminderTime.hour)}</div>
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleTimeChange('hour', -1)}><ChevronDown className="h-4 w-4" /></Button>
                        </div>
                        <span className="text-primary font-bold text-lg mx-1">:</span>
                        <div className="text-center space-y-1">
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleTimeChange('minute', 5)}><ChevronUp className="h-4 w-4" /></Button>
                            <div className="bg-primary/20 text-primary font-bold text-base rounded-md p-1 w-10 text-center">{formatTime(reminderTime.minute)}</div>
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleTimeChange('minute', -5)}><ChevronDown className="h-4 w-4" /></Button>
                        </div>
                        <div className="flex flex-col gap-1 ml-2">
                            <Button 
                                variant="ghost" 
                                onClick={() => setReminderTime(prev => ({ ...prev, period: 'AM' }))} 
                                className={cn(
                                    "h-auto p-1 text-xs", 
                                    reminderTime.period === 'AM' ? 'bg-primary/20 text-primary' : 'text-muted-foreground'
                                )}>
                                AM
                            </Button>
                            <Button 
                                variant="ghost" 
                                onClick={() => setReminderTime(prev => ({ ...prev, period: 'PM' }))} 
                                className={cn(
                                    "h-auto p-1 text-xs", 
                                    reminderTime.period === 'PM' ? 'bg-primary/20 text-primary' : 'text-muted-foreground'
                                )}>
                                PM
                            </Button>
                        </div>
                    </div>
                  </div>

                  <div>
                    <FormLabel className="text-base font-semibold mb-1 block">
                      Priority Level
                    </FormLabel>
                    <RadioGroup
                      value={priority}
                      onValueChange={(value: Habit["priority"]) =>
                        setPriority(value)
                      }
                      className="grid grid-cols-3 gap-2"
                    >
                      {priorities.map((p) => {
                        const Icon = priorityIcons[p];
                        return (
                          <FormItem key={p}>
                            <FormControl>
                              <RadioGroupItem value={p} className="sr-only" />
                            </FormControl>
                            <FormLabel
                              className={cn(
                                "h-11 flex flex-col items-center justify-center gap-1 text-xs border-2 rounded-lg cursor-pointer",
                                "transition-colors",
                                priority === p
                                  ? "border-primary bg-primary/10 text-primary"
                                  : "border-border bg-card text-muted-foreground"
                              )}
                            >
                              <Icon className="h-4 w-4" />
                              {p}
                            </FormLabel>
                          </FormItem>
                        );
                      })}
                    </RadioGroup>
                  </div>

                  <div className="bg-card p-2 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-semibold text-sm">
                          Push Notifications
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Receive a nudge when it's time
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications}
                      onCheckedChange={setNotifications}
                    />
                  </div>
                  <div className="flex items-start gap-2 text-xs text-muted-foreground pt-1">
                    <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
                    <p>
                      Setting up "{form.getValues().name || "your new"}"
                      habit...
                    </p>
                  </div>
                </div>
                <footer className="p-4 border-t border-border flex-shrink-0 mt-auto">
                  <Button
                    onClick={handleCreateHabit}
                    className="w-full h-9 text-sm font-bold"
                  >
                    <Check className="mr-2 h-4 w-4" /> Create Habit
                  </Button>
                </footer>
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
    </Form>
  );
}
