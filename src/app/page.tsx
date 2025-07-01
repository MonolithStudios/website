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
        description: "Need assistance navigating the digital world? We've got you"
    }
]

export default function Home()
{
    return (
        <main className="min-h-screen bg-background text-foreground px-6 md:px-24 py-16 space-y-20 font-base">
            <Navbar/>

            {/* Intro hero */}
            <section className="w-full px-6 md:px-24 py-16">
                <div className="flex flex-col md:flex-row items-center justify-between gap-0">
                    <div className="text-left max-w-xl space-y-6">
                        <div className="md:text-8xl leading-tight font-black">
                            <div>MONOLITH</div>
                            <div>STUDIOS.</div>
                        </div>

                        <p className="text-lg font-base max-w-md">
                            Monolith Studios is a leader in providing digital solutions to business problems.
                        </p>

                        <Button className="rounded-lg" asChild>
                            <Link href="#contact">Contact us</Link>
                        </Button>
                    </div>

                    <div className="shrink-0">
                        <Image
                            src="/hero-splash.svg"
                            alt="Monolith Studios"
                            width={500}
                            height={500}
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
