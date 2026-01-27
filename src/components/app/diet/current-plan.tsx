import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function CurrentPlan() {
    const dietHeroImage = PlaceHolderImages.find((p) => p.id === "diet-hero");

    return (
        <div className="relative rounded-xl overflow-hidden p-6 text-white bg-card">
            {dietHeroImage && (
                 <Image
                    src={dietHeroImage.imageUrl}
                    alt={dietHeroImage.description}
                    data-ai-hint={dietHeroImage.imageHint}
                    fill
                    className="object-cover opacity-30"
                />
            )}
            <div className="relative z-10">
                <p className="text-xs font-bold uppercase text-primary mb-1">Current Plan</p>
                <h2 className="text-2xl font-bold">Weight Loss</h2>
                <p className="text-sm text-white/80">Goal: 1,800 kcal/day</p>
                <Badge className="mt-2 bg-success text-success-foreground border-none">Active</Badge>
            </div>
        </div>
    );
}
