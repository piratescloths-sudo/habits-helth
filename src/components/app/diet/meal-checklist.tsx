"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const initialMeals = [
    { name: "Breakfast", description: "Oatmeal with Blueberries & Honey", kcal: 340, completed: true },
    { name: "Lunch", description: "Grilled Chicken Breast with Quinoa", kcal: 520, completed: true },
    { name: "Dinner", description: "Pending...", kcal: null, completed: false },
    { name: "Snacks", description: "Add snack intake", kcal: null, completed: false },
];

export function MealChecklist() {
    const [meals, setMeals] = useState(initialMeals);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Meal Checklist</h2>
            <div className="space-y-3">
                {meals.map((meal, index) => (
                    <Card key={index} className={cn("bg-card", meal.completed && "bg-primary/10")}>
                        <CardContent className="p-4 flex items-center">
                            {meal.completed ? (
                                <CheckCircle2 className="h-6 w-6 text-primary mr-4" />
                            ) : (
                                <Circle className="h-6 w-6 text-muted-foreground mr-4" />
                            )}
                            <div className="flex-1">
                                <p className="font-semibold">{meal.name}</p>
                                <p className="text-sm text-muted-foreground">{meal.description}</p>
                            </div>
                            {meal.kcal && <p className="font-semibold">{meal.kcal} kcal</p>}
                            {!meal.completed && (
                                <Button variant="link" className="text-primary p-0 h-auto ml-4">Log</Button>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
