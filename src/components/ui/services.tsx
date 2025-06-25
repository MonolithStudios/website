"use client"

import Image from "next/image"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function Services() {
    return (
        <section id="about" className="space-y-12 px-4 md:px-24 py-16">
            <h2 className="text-5xl font-extrabold tracking-tight text-[#2f302a] text-center mx-auto">
                what we do.
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Card 1 */}
                <Card className="bg-[#FEFEFE] border-2 border-[#2f302a] rounded-base shadow-[4px_4px_0_#2f302a] px-6 py-8 flex flex-col justify-between">
                    <div className="w-full flex justify-center mb-6">
                        <Image src="/stock-websites.svg" alt="Web Design Icon" width={160} height={160} />
                    </div>
                    <div className="space-y-3 text-left">
                        <CardTitle className="text-xl font-bold text-[#2f302a]">Digital Marketing</CardTitle>
                        <CardDescription className="text-base text-[#2f302a]/80">
                            Whether it's a website, social media, or advertising campaigns, we can help!
                        </CardDescription>
                    </div>
                </Card>

                {/* Card 2 */}
                <Card className="bg-[#FEFEFE] border-2 border-[#2f302a] rounded-base shadow-[4px_4px_0_#2f302a] px-6 py-8 flex flex-col justify-between">
                    <div className="w-full flex justify-center mb-6">
                        <Image src="/stock-apps.svg" alt="App Development Icon" width={140} height={140} />
                    </div>
                    <div className="space-y-3 text-left">
                        <CardTitle className="text-xl font-bold text-[#2f302a]">Tools and Apps</CardTitle>
                        <CardDescription className="text-base text-[#2f302a]/80">
                            We build functional, easy-to-use apps that your customers and employees will love.
                        </CardDescription>
                    </div>
                </Card>

                {/* Card 3 */}
                <Card className="bg-[#FEFEFE] border-2 border-[#2f302a] rounded-base shadow-[4px_4px_0_#2f302a] px-6 py-8 flex flex-col justify-between">
                    <div className="w-full flex justify-center mb-6">
                        <Image src="/stock-consulting.svg" alt="Consulting Icon" width={160} height={160} />
                    </div>
                    <div className="space-y-3 text-left">
                        <CardTitle className="text-xl font-bold text-[#2f302a]">Consulting</CardTitle>
                        <CardDescription className="text-base text-[#2f302a]/80">
                            Need help navigating the digital world? We’ve got you covered.
                        </CardDescription>
                    </div>
                </Card>
            </div>
        </section>
    )
}