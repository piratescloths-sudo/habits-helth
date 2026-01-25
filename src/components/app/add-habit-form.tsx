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
import { Heart, BookOpen, Briefcase, User, X, Check, ArrowLeft } from 'lucide-react';
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
    hour: z.string().default("09"),
    minute: z.string().default("00"),
    period: z.enum(["AM", "PM"]).default("AM"),
  }).optional(),
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
    const { control, trigger, formState } = useFormContext<AddHabitFormValues>();
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
                <button onClick={() => setIsAddDialogOpen(false)} className="text-muted-foreground justify-self-end">
                    <X className="h-6 w-6" />
                </button>
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
    const frequency = watch("frequency");

    return (
         <div className="p-6">
             <div className="grid grid-cols-3 items-center mb-6">
                <button onClick={prevStep} className="text-muted-foreground justify-self-start">
                    <ArrowLeft className="h-6 w-6" />
                </button>
                <div className="text-center">
                    <h2 className="text-xl font-bold">New Habit</h2>
                    <p className="text-primary font-bold text-sm tracking-widest">STEP 2 OF 2</p>
                </div>
            </div>
            <div className="space-y-6">
                {frequency !== 'Daily' && (
                    <FormField
                        control={control}
                        name="days"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold">Choose days</FormLabel>
                                <FormControl>
                                    <Controller
                                        name="days"
                                        control={control}
                                        render={({ field }) => (
                                            <div className="flex justify-between gap-1">
                                                {weekDays.map((day, index) => {
                                                    const isSelected = field.value?.includes(day);
                                                    return (
                                                        <button
                                                            type="button"
                                                            key={index}
                                                            onClick={() => {
                                                                const newValue = isSelected
                                                                    ? field.value?.filter(d => d !== day)
                                                                    : [...(field.value || []), day];
                                                                field.onChange(newValue);
                                                            }}
                                                            className={cn(
                                                                "flex items-center justify-center h-10 w-10 rounded-lg border-2 transition-colors",
                                                                isSelected ? "bg-primary border-primary text-primary-foreground" : "border-muted bg-muted/30"
                                                            )}
                                                        >
                                                            {day}
                                                        </button>
                                                    )
                                                })}
                                            </div>
                                        )}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                <FormField
                    control={control}
                    name="reminder"
                    render={({ field }) => (
                        <FormItem className="rounded-lg border-2 border-muted/50 bg-muted/30 p-4">
                             <div className="flex items-center justify-between">
                                <FormLabel className="font-semibold text-base">Set reminder</FormLabel>
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
                
                {watch('reminder') && (
                     <FormItem>
                        <FormLabel className="font-semibold">Time</FormLabel>
                        <div className="flex items-center gap-2">
                             <FormField
                                control={control}
                                name="time.hour"
                                render={({ field }) => <Input {...field} maxLength={2} className="w-16 text-center text-lg bg-background" />}
                            />
                            <span className="font-bold text-lg">:</span>
                             <FormField
                                control={control}
                                name="time.minute"
                                render={({ field }) => <Input {...field} maxLength={2} className="w-16 text-center text-lg bg-background" />}
                            />
                           <FormField
                                control={control}
                                name="time.period"
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger className="w-24">
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
                )}


                <Button type="submit" className="w-full h-12 text-lg font-bold">
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
      reminder: false,
      time: { hour: "09", minute: "00", period: "AM"},
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
