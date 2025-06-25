"use client"

import Image from "next/image"
import Link from "next/link"

export default function Header() {
    return (
        <header className="pb-6 px-4">
            <div className="w-full flex items-center justify-between border-2 border-[#2f302a] bg-[#FEFEFE] rounded-base px-6 py-2 shadow-[4px_4px_0_#2f302a]">

                {/* Left: Logo + Name */}
                <div className="flex items-center gap-2 font-heading text-[#2f302a]">
                    <Image src="/monolith-logo.svg" alt="Logo" width={42} height={42} />
                    <Link href="/" className="text-3xl font-bold">
                        monolith.
                    </Link>
                </div>

                {/* Right: Simple nav links */}
                <nav className="flex items-center gap-6 text-lg font-medium text-main-foreground">
                    <Link href="#about" className="hover:underline">About</Link>
                    <Link href="#testimonials" className="hover:underline">Testimonials</Link>
                    <Link href="#contact" className="hover:underline">Contact</Link>
                </nav>

            </div>
        </header>
    )
}
