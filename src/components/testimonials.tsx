"use client";

import React from "react";
import clsx from "clsx";

type Testimonial = {
    quote: string;
    author: string;
    url: string;
};

interface TestimonialsProps {
    items: Testimonial[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ items }) => (
    <section id="testimonials" className="space-y-6">
        <h2 className="text-5xl font-extrabold tracking-tight text-[#2f302a] text-center mx-auto">
            testimonials.
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
            {items.map(({ quote, author, url }, i) => (
                <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={clsx(
                        // Base style
                        "block w-full text-left bg-[#FEFEFEFE] border-2 border-[#2f302a] rounded p-6 space-y-4",
                        // Neobrutalist shadow
                        "shadow-[4px_4px_0_#2f302a]",
                        // Animation on hover to mimic button.tsx
                        "transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none"
                    )}
                >
                    <p className="italic text-lg">“{quote}”</p>
                    <p className="font-bold">{author}</p>
                </a>
            ))}
        </div>
    </section>
);

export default Testimonials;
