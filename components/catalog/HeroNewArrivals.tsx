"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function HeroNewArrivals() {
    return (
        <Link
            href="/novedades"
            className="group relative flex flex-col justify-between p-8 md:p-12 bg-[var(--color-bg-inverse)] border-b border-[var(--color-border-default)] overflow-hidden"
        >
            <div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[var(--color-text-inverse)] leading-tight uppercase font-sans group-hover:text-[var(--color-accent)] transition-colors duration-300">
                    Novedades
                </h2>
            </div>

            <div className="flex items-end justify-between">
                <p className="text-[var(--color-text-inverse)]/60 text-sm max-w-[180px] leading-snug font-sans">
                    Productos en tendencia
                </p>
                <ChevronRight className="w-6 h-6 text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent)] group-hover:translate-x-1 transition-all" />
            </div>

            {/* Efecto de luz ambiental sutil usando el acento */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)]/[0.08] blur-[80px] rounded-full -mr-20 -mt-20" />
        </Link>
    );
}