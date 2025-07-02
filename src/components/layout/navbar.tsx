"use client"

import Image from "next/image"
import Link from "next/link"

export default function Navbar()
{
    return (
        <header className="pb-6 px-4">
            <div
                className="w-full flex items-center justify-between border-2 border-border bg-background rounded-lg px-6 py-2 shadow-shadow">

                {/* Logo */}
                <div className="flex flex-1 justify-center md:justify-start items-center gap-2 font-heading text-foreground">
                    <Image src="/monolith-logo.svg" alt="Logo" width={42} height={42}/>
                    <Link href="/" className="text-3xl font-bold">
                        monolith.
                    </Link>
                </div>


                {/* Desktop Navbar */}
                <nav className="hidden md:flex items-center gap-6 text-lg font-medium text-main-foreground">
                    <Link href="/#about" className="hover:underline">About</Link>
                    <Link href="/#contact" className="hover:underline">Contact</Link>
                </nav>
            </div>
        </header>
    )
}