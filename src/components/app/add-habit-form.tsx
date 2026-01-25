"use client";

import { useForm, FormProvider, useFormContext, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Heart, BookOpen, Briefcase, User, X, Check, ArrowLeft, AlignJustify, AlertTriangle, Gem, Bell, Info } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useHabits } from "./habit-provider";
import { useState } from "react";
import { Switch } from "../ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

// Schema for all steps
const formSchema = z.object({
  name: z.string().min(1, "Habit name cannot be empty."),
  category: z.enum(["Health", "Study", "Work", "Personal"]),
  frequency: z.enum(["Daily", "Weekly", "Custom"]),
  days: z.array(z.string()).optional(),
  reminder: z.boolean().default(false),
  time: z.object({
    hour: z.string().default("07"),
    minute: z.string().default("30"),
    period: z.enum(["AM", "PM"]).default("AM"),
  }).optional(),
  priority: z.enum(["Low", "Medium", "High"]).default("Medium"),
});

export type AddHabitFormValues = z.infer<typeof formSchema>;

type AddHabitFormProps = {
  onFormSubmit: (data: AddHabitFormValues) => void;
};

const categories = [
    { name: 'Health', icon: Heart },
    { name: 'Study', icon: BookOpen },
    { name: 'Work', icon: Briefcase },
    { name: 'Personal', icon: User },
] as const;

const frequencies = ['Daily', 'Weekly', 'Custom'] as const;
const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];


const Step1 = ({ nextStep }: { nextStep: () => void }) => {
    const { control, trigger } = useFormContext<AddHabitFormValues>();
    const { setIsAddDialogOpen } = useHabits();

    const handleNext = async () => {
        const result = await trigger(["name", "category", "frequency"]);
        if (result) {
            nextStep();
        }
    };

    return (
        <div className="p-6">
            <div className="grid grid-cols-3 items-center mb-6">
                <button onClick={() => setIsAddDialogOpen(false)} className="text-muted-foreground justify-self-start">
                    <X className="h-6 w-6" />
                </button>
                <div className="text-center">
                    <h2 className="text-xl font-bold">New Habit</h2>
                    <p className="text-primary font-bold text-sm tracking-widest">STEP 1 OF 2</p>
                </div>
            </div>
            <div className="space-y-6">
                <FormField
                    control={control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold">What's the habit name?</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. Read a book" {...field} className="bg-background h-12 text-base" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold">Choose a category</FormLabel>
                            <FormControl>
                                <div className="grid grid-cols-2 gap-2">
                                    {categories.map((category) => {
                                        const Icon = category.icon;
                                        const isSelected = field.value === category.name;
                                        return (
                                            <button
                                                type="button"
                                                key={category.name}
                                                onClick={() => field.onChange(category.name)}
                                                className={cn(
                                                    "flex flex-col items-center justify-center gap-2 rounded-lg border-2 p-4 transition-colors",
                                                    isSelected ? "bg-primary/10 border-primary text-primary" : "border-muted/50 bg-muted/30 hover:border-primary/50"
                                                )}
                                            >
                                                <Icon className="h-6 w-6" />
                                                <span className="font-medium">{category.name}</span>
                                            </button>
                                        )
                                    })}
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="frequency"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold">How often?</FormLabel>
                             <FormControl>
                                <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
                                    {frequencies.map((frequency) => {
                                        const isSelected = field.value === frequency;
                                        return (
                                            <button
                                                type="button"
                                                key={frequency}
                                                onClick={() => field.onChange(frequency)}
                                                className={cn(
                                                    "flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                                    isSelected ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" : "hover:bg-background/50"
                                                )}
                                            >
                                                {frequency}
                                            </button>
                                        )
                                    })}
                                </div>
                             </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <Button type="button" onClick={handleNext} className="w-full h-12 text-lg font-bold">
                    Next Step
                </Button>
            </div>
        </div>
    );
};

const Step2 = ({ prevStep }: { prevStep: () => void }) => {
    const { control, watch } = useFormContext<AddHabitFormValues>();
    const habitName = watch('name');

    return (
         <div className="p-6">
             <div className="grid grid-cols-3 items-center mb-6">
                <button onClick={prevStep} className="text-muted-foreground justify-self-start">
                    <ArrowLeft className="h-6 w-6" />
                </button>
                <div className="text-center">
                    <h2 className="text-xl font-bold">Add New Habit</h2>
                </div>
                <p className="text-primary font-semibold text-sm justify-self-end">Step 2 of 2</p>
            </div>
            <div className="space-y-6">
                <div className="text-left">
                    <h3 className="text-2xl font-bold font-headline">Set Reminders</h3>
                    <p className="text-muted-foreground">Consistency is key to building new habits.</p>
                </div>

                <FormItem>
                    <FormLabel className="font-semibold">When should we remind you?</FormLabel>
                    <div className="flex items-center gap-2 bg-card p-4 rounded-lg justify-between">
                         <FormField
                            control={control}
                            name="time.hour"
                            render={({ field }) => <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger className="w-20 h-16 text-2xl font-bold border-2 border-primary bg-primary/20"><SelectValue /></SelectTrigger></FormControl>
                                <SelectContent>{Array.from({ length: 12 }, (_, i) => `${i + 1}`.padStart(2, '0')).map(h => <SelectItem key={h} value={h}>{h}</SelectItem>)}</SelectContent>
                            </Select>}
                        />
                        <span className="font-bold text-2xl text-primary">:</span>
                         <FormField
                            control={control}
                            name="time.minute"
                            render={({ field }) => <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger className="w-20 h-16 text-2xl font-bold border-2 border-primary bg-primary/20"><SelectValue /></SelectTrigger></FormControl>
                                <SelectContent>{['00', '15', '30', '45'].map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
                            </Select>}
                        />
                       <FormField
                            control={control}
                            name="time.period"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger className="w-20 h-16 text-xl font-bold border-2 border-primary bg-primary/20">
                                        <SelectValue />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    <SelectItem value="AM">AM</SelectItem>
                                    <SelectItem value="PM">PM</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>
                </FormItem>

                <FormField
                    control={control}
                    name="priority"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold">Priority Level</FormLabel>
                            <FormControl>
                                <div className="grid grid-cols-3 gap-2">
                                    {(['Low', 'Medium', 'High'] as const).map((level) => {
                                        const icons: {[key:string]: any} = { Low: AlignJustify, Medium: AlertTriangle, High: Gem };
                                        const Icon = icons[level];
                                        const isSelected = field.value === level;
                                        return (
                                             <button
                                                type="button"
                                                key={level}
                                                onClick={() => field.onChange(level)}
                                                className={cn(
                                                    "flex flex-col items-center justify-center gap-2 rounded-lg border-2 p-4 transition-colors h-24",
                                                    isSelected ? "bg-primary/10 border-primary text-primary" : "border-muted/50 bg-muted/30 hover:border-primary/50"
                                                )}
                                            >
                                                <Icon className="h-6 w-6" />
                                                <span className="font-medium">{level}</span>
                                            </button>
                                        )
                                    })}
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="reminder"
                    render={({ field }) => (
                        <FormItem className="rounded-lg border-2 border-muted/50 bg-muted/30 p-4">
                             <div className="flex items-center">
                                <div className="p-2 bg-primary/20 rounded-lg mr-4">
                                    <Bell className="h-6 w-6 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-base">Push Notifications</p>
                                    <p className="text-sm text-muted-foreground">Receive a nudge when it's time</p>
                                </div>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {habitName && (
                    <div className="flex items-center text-sm text-muted-foreground">
                        <Info className="h-4 w-4 mr-2 flex-shrink-0" />
                        <p className="truncate">Setting up "{habitName}" habit...</p>
                    </div>
                )}
                
                <Button type="submit" className="w-full h-14 text-lg font-bold">
                    <Check className="mr-2 h-6 w-6" />
                    Create Habit
                </Button>
            </div>
         </div>
    );
};


export function AddHabitForm({ onFormSubmit }: AddHabitFormProps) {
  const [step, setStep] = useState(1);
  const methods = useForm<AddHabitFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "Health",
      frequency: "Daily",
      days: [],
      reminder: true,
      time: { hour: "07", minute: "30", period: "AM"},
      priority: "Medium",
    },
  });

  const onSubmit = (values: AddHabitFormValues) => {
    onFormSubmit(values);
  };
  
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {step === 1 && <Step1 nextStep={nextStep} />}
        {step === 2 && <Step2 prevStep={prevStep} />}
      </form>
    </FormProvider>
  );
}
