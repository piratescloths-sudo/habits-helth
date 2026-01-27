import { Card, CardContent } from "@/components/ui/card";

const macroData = [
    { name: "Protein", value: 80, goal: 120, unit: "g", color: "bg-chart-1" },
    { name: "Carbs", value: 150, goal: 200, unit: "g", color: "bg-chart-2" },
    { name: "Fats", value: 45, goal: 60, unit: "g", color: "bg-chart-3" },
];

export function Macros() {
    return (
        <div className="grid grid-cols-3 gap-4">
            {macroData.map((macro) => (
                <Card key={macro.name} className="bg-card text-center">
                    <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground uppercase">{macro.name}</p>
                        <p className="text-2xl font-bold">{macro.value}{macro.unit}</p>
                        <div className="h-1.5 w-full bg-muted rounded-full mt-2">
                            <div
                                className={`h-1.5 rounded-full ${macro.color}`}
                                style={{ width: `${(macro.value / macro.goal) * 100}%`}}
                            />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
