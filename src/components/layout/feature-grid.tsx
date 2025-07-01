"use client"

import { Card, CardDescription, CardTitle } from "@/components/ui/card"

import Image from "next/image"

type FeatureCardProps = {
    imageSrc: string
    imageAlt: string
    imageSize: { width: number; height: number }
    title: string
    description: string
}

type FeatureProps = {
    features: FeatureCardProps[]
}

export default function FeatureGrid({features}: FeatureProps)
{
    return (
        <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
                <Card
                    key={idx}
                    className="bg-background border-2 border-border rounded-lg shadow-shadow px-6 py-8 flex flex-col justify-between"
                >
                    <div className="w-full flex justify-center mb-6">
                        <Image
                            src={feature.imageSrc}
                            alt={feature.imageAlt}
                            width={feature.imageSize.width}
                            height={feature.imageSize.height}
                        />
                    </div>

                    <div className="space-y-3 text-left">
                        <CardTitle className="text-xl font-bold text-foreground">
                            {feature.title}
                        </CardTitle>
                        <CardDescription className="text-base text-foreground/80">
                            {feature.description}
                        </CardDescription>
                    </div>
                </Card>
            ))}
        </div>
    );
}
