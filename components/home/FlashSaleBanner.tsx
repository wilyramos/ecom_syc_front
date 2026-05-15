"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function HeroFlashSale() {
    const [mounted, setMounted] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        setMounted(true);
        const calculate = () => {
            const now = new Date();
            const diff = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59).getTime() - now.getTime();
            return diff > 0 ? {
                hours: Math.floor((diff / 36e5) % 24),
                minutes: Math.floor((diff / 6e4) % 60),
                seconds: Math.floor((diff / 1000) % 60),
            } : { hours: 0, minutes: 0, seconds: 0 };
        };
        const timer = setInterval(() => setTimeLeft(calculate()), 1000);
        return () => clearInterval(timer);
    }, []);

    if (!mounted) return <div className=" bg-[var(--color-bg-primary)]" />;

    return (
        <Link 
            href="/ofertas"
            className="group relative flex flex-col justify-between p-8 md:p-12 bg-[var(--color-bg-primary)]  border-r border-b border-[var(--color-border-default)] overflow-hidden transition-colors hover:bg-[var(--color-bg-secondary)]"
        >
            <div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[var(--color-text-primary)] leading-tight uppercase font-sans group-hover:text-[var(--color-accent-hover)] transition-colors duration-300">
                    Ofertas del día
                </h2>
            </div>

            <div className="flex items-end justify-between">
                <div className="flex items-baseline gap-4 bg-[var(--color-bg-secondary)] group-hover:bg-[var(--color-bg-primary)] px-4 py-2 rounded-md border border-[var(--color-border-subtle)] transition-colors">
                    <TimeDisplay value={timeLeft.hours} label="h" />
                    <TimeDisplay value={timeLeft.minutes} label="m" />
                    <TimeDisplay value={timeLeft.seconds} label="s" />
                </div>
                <ChevronRight className="w-6 h-6 text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent-hover)] group-hover:translate-x-1 transition-all" />
            </div>
        </Link>
    );
}

const TimeDisplay = ({ value, label }: { value: number; label: string }) => (
    <div className="flex items-baseline gap-0.5">
        <span className="text-3xl font-black tabular-nums tracking-tighter text-[var(--color-text-primary)] font-mono">
            {value.toString().padStart(2, "0")}
        </span>
        <span className="text-xs font-black text-[var(--color-accent-hover)] uppercase font-sans">{label}</span>
    </div>
);