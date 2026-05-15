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

    if (!mounted) return <div className="min-h-[400px] bg-[var(--color-bg-primary)]" />;

    return (
        <Link 
            href="/ofertas"
            className="group relative flex flex-col justify-between p-8 md:p-12 bg-[var(--color-bg-primary)] min-h-[400px] border-r border-b border-[var(--color-border-subtle)] overflow-hidden transition-colors hover:bg-[var(--color-bg-secondary)]"
        >
            <div className="space-y-4">
                <span className="text-[var(--color-text-primary)] font-semibold text-xs uppercase tracking-widest opacity-60">
                    Oferta del día
                </span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-[var(--color-text-primary)] leading-tight">
                    Precios fugaces. <br />
                    <span className="text-[var(--color-text-tertiary)] group-hover:text-[var(--color-text-primary)] transition-colors duration-500">Oportunidad única.</span>
                </h2>
            </div>

            <div className="flex items-end justify-between">
                <div className="flex items-baseline gap-4">
                    <TimeDisplay value={timeLeft.hours} label="h" />
                    <TimeDisplay value={timeLeft.minutes} label="m" />
                    <TimeDisplay value={timeLeft.seconds} label="s" />
                </div>
                <ChevronRight className="w-6 h-6 text-[var(--color-text-tertiary)] group-hover:text-[var(--color-text-primary)] group-hover:translate-x-1 transition-all" />
            </div>
        </Link>
    );
}

const TimeDisplay = ({ value, label }: { value: number; label: string }) => (
    <div className="flex items-baseline gap-0.5">
        <span className="text-3xl font-bold tabular-nums tracking-tighter text-[var(--color-text-primary)]">
            {value.toString().padStart(2, "0")}
        </span>
        <span className="text-xs font-medium text-[var(--color-text-tertiary)] uppercase">{label}</span>
    </div>
);