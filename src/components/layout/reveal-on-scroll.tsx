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
    threshold?: number;
};

export default function RevealOnScroll
(
    {
        children,
        className = "",
        threshold = 0.25,
    }
    : RevealOnScrollProps
)
{
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

            const observer = new IntersectionObserver
            (
                ([entry]) =>
                {
                    setIsVisible(entry.isIntersecting);
                },
                { threshold }
            );

            observer.observe(element);

            return () => observer.disconnect();
        },
        [threshold]
    );

    return (
        <div
            ref={ref}
            className=
            {`
                transition-opacity duration-1000 ease-out
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                ${className}
            `}
        >
            {children}
        </div>
    )
}