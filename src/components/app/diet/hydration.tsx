"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplet, Minus, Plus } from "lucide-react";

export function Hydration() {
    const [glasses, setGlasses] = useState(5);
    const totalGlasses = 8;
    const intakeLiters = (glasses * 0.25).toFixed(1);
    const goalLiters = (totalGlasses * 0.25).toFixed(1);

    const handleIntake = (amount: number) => {
        setGlasses(prev => Math.max(0, Math.min(totalGlasses, prev + amount)));
    }

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Hydration</h2>
            <Card className="bg-card">
                <CardContent className="p-4 flex items-center">
                    <div className="bg-primary/20 text-primary p-3 rounded-lg mr-4">
                        <Droplet className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                        <p className="font-semibold">Water Intake</p>
                        <p className="text-2xl font-bold">{intakeLiters}L <span className="text-base text-muted-foreground font-normal">/ {goalLiters}L</span></p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button size="icon" variant="ghost" className="rounded-full bg-muted" onClick={() => handleIntake(-1)}>
                            <Minus className="h-5 w-5"/>
                        </Button>
                        <p className="font-semibold text-muted-foreground">{glasses}/{totalGlasses}</p>
                        <Button size="icon" variant="ghost" className="rounded-full bg-muted" onClick={() => handleIntake(1)}>
                            <Plus className="h-5 w-5"/>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
