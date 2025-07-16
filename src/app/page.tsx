import Image from "next/image";

import { Button } from "@/components/ui/button";

import Navbar from "@/components/layout/navbar"
import FeatureGrid from "@/components/layout/feature-grid"
import RevealOnScroll from "@/components/layout/reveal-on-scroll"
import ContactForm from "@/components/contact-form"
import Link from "next/link";
import {Toaster} from "@/components/ui/sonner";

const features = [
    {
        imageSrc: "/stock-websites.svg",
        imageAlt: "Web Design",
        imageSize: {width: 140, height: 140},
        title: "Digital Marketing",
        description: "We can help with your site, social media, or marketing campaigns."
    },
    {
        imageSrc: "/stock-apps.svg",
        imageAlt: "Apps",
        imageSize: {width: 140, height: 140},
        title: "Tools and Apps",
        description: "We build apps your team and clients will love."
    },
    {
        imageSrc: "/stock-consulting.svg",
        imageAlt: "Consulting",
        imageSize: {width: 140, height: 140},
        title: "Consulting",
        description: "Need assistance navigating the digital world? We've got you!"
    }
]

export default function Home()
{
    return (
        <main className="min-h-screen bg-background text-foreground px-6 md:px-24 py-16 space-y-20 font-base">
            <Navbar/>

            {/* Intro Hero */}
            <section className="w-full px-6 md:px-24 py-16">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0">

                    {/* Left - Text */}
                    <div className="text-center md:text-left max-w-xl space-y-6">
                        <div className="text-5xl sm:text-6xl md:text-8xl leading-tight font-black">
                            <div>MONOLITH</div>
                            <div>STUDIOS</div>
                        </div>

                        <p className="text-base sm:text-lg font-normal max-w-md mx-auto md:mx-0">
                            Monolith Studios is a leader in providing digital solutions to business problems.
                        </p>

                        <div>
                            <Button className="rounded-lg" asChild>
                                <Link href="#contact">Contact us</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Right - Image */}
                    <div className="w-full md:w-auto flex justify-center">
                        <Image
                            src="/hero-splash.svg"
                            alt="Monolith Studios"
                            width={500}
                            height={500}
                            className="max-w-[80%] md:max-w-none"
                        />
                    </div>
                </div>
            </section>

            {/* What we do */}
            <section id="about" className="space-y-12 px-4 md:px-24 py-16">
                <RevealOnScroll>
                    <h2 className="text-5xl font-extrabold tracking-tight text-[#2f302a] text-center mx-auto pb-8">
                        what we do.
                    </h2>
                    <FeatureGrid features={features}/>
                </RevealOnScroll>
            </section>

            {/* Contact us */}
            <section id="contact" className="space-y-12 px-4 md:px-24 py-16">
                <RevealOnScroll>
                    <h2 className="text-5xl font-extrabold tracking-tight text-[#2f302a] text-center mx-auto pb-8">
                        contact us.
                    </h2>
                    <ContactForm/>
                </RevealOnScroll>
            </section>

            <Toaster/>
        </main>
    );
}
