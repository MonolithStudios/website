"use client"

import React,
{
    useEffect,
    useRef,
    useState,
    ReactNode
}
from "react";

type RevealOnScrollProps =
{
    children: ReactNode;
    className?: string;
    entryThreshold?: number;
    exitThreshold?: number;
};

export default function RevealOnScroll
(
    {
        children,
        className = "",
        entryThreshold = 0.30,
        exitThreshold = 0.15,
    }
    : RevealOnScrollProps
)
{
    if (exitThreshold >= entryThreshold)
    {
        throw new Error("Exit Threshold must be smaller than Entry Threshold")
    }

    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect
    (
        () =>
        {
            const element = ref.current;

            if (!element)
            {
                return;
            }

            const thresholds = Array.from
            (
                { length: 101 },
                (_, i) => i / 100
            );

            const observer = new IntersectionObserver
            (
                ([entry]) =>
                {
                    const ratio = entry.intersectionRatio;

                    if (isVisible && ratio < exitThreshold)
                    {
                        setIsVisible(false);
                    }

                    if (!isVisible && ratio > entryThreshold)
                    {
                        setIsVisible(true);
                    }
                },
                { threshold: thresholds }
            );

            observer.observe(element);

            return () => observer.disconnect();
        },
        [
            entryThreshold,
            exitThreshold,
            isVisible
        ]
    );

    return (
        <div
            ref={ref}
            className=
            {`
                transition-opacity duration-1000 ease-out
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0"}
                ${className}
            `}
        >
            {children}
        </div>
    )
}