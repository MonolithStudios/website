import Image from "next/image";

import { Button } from "@/components/ui/button";

import Testimonials from "@/components/testimonials";
import Header from "@/components/layout/header"
import Services from "@/components/ui/services";

const testimonialItems = [
    {
        quote: "Working with Monolith Studios was seamless. They translated our needs into a system that just works.",
        author: "Julia, Ecom Director",
        url: "https://example-julia-client.com",
    },
    {
        quote: "It’s rare to find a team this sharp. Quick turnaround, great ideas, and clean delivery.",
        author: "Thabo, Founder @ BizLaunch",
        url: "https://example-bizlaunch.com",
    },
];

export default function Home() {
    return (
        <main className="min-h-screen bg-[#F9F5F2] text-[#2f302a] px-6 md:px-24 py-16 space-y-20 font-base">

            {/* Header */}
            <Header/>

            {/* Hero */}
            <section className="w-full px-6 md:px-24 py-16">
                <div className="flex flex-col md:flex-row items-center justify-between gap-0">

                    {/* Left: Title + Subtitle */}
                    <div className="text-left max-w-xl space-y-6">
                        <div className="md:text-8xl leading-tight font-black">
                            <div>MONOLITH</div>
                            <div>STUDIOS.</div>
                        </div>

                        <p className="text-lg font-base max-w-md">
                            Monolith Studios is a leader in providing digital solutions to business problems.
                        </p>
                    </div>

                    {/* Right: Logo */}
                    <div className="shrink-0">
                        <Image
                            src="/hero-splash.svg"
                            alt="Monolith Logo"
                            width={500}
                            height={500}
                        />
                    </div>

                </div>
            </section>

            {/* Description */}
            <Services/>

            {/* Testimonials */}
            {/* <Testimonials items={testimonialItems} /> */}

            {/* Contact */}
            <section id="contact" className="space-y-4">
                <h2 className="text-5xl font-extrabold tracking-tight text-[#2f302a] text-center mx-auto">get in touch.</h2>
                <p className="text-lg">We’d love to hear what you’re building.</p>
                <div className="space-y-2">
                    <p><strong>Email:</strong> <a href="mailto:contact@mlith.co.za" className="underline">contact@mlith.co.za</a></p>
                    <p><strong>Phone:</strong> <a href="tel:+27609524595" className="underline">+27 60 952 4595</a></p>
                </div>
                <Button className="mt-4 border-2 border-[#2f302a] bg-white shadow-[4px_4px_0_#2f302a] px-6 py-3">
                    Let’s Collaborate
                </Button>
            </section>

            {/* Footer */}
            <footer className="text-sm text-center border-t-2 border-[#2f302a] pt-8 mt-16">
                © {new Date().getFullYear()} Monolith Studios — All rights reserved.
            </footer>
        </main>
    );
}