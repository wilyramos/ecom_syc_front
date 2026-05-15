"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function HeroNewArrivals() {
    return (
        <Link 
            href="/novedades" 
            className="group relative flex flex-col justify-between p-8 md:p-12 bg-[var(--color-bg-inverse)] min-h-[400px] border-b border-[var(--color-border-default)] overflow-hidden"
        >
            <div className="space-y-4">
                <span className="text-[var(--color-text-inverse)] font-semibold text-xs uppercase tracking-widest opacity-50">
                    Recién llegado
                </span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-[var(--color-text-inverse)] leading-tight">
                    Lo último en <br />
                    <span className="text-[var(--color-text-tertiary)] group-hover:text-[var(--color-text-inverse)] transition-colors duration-500">tecnología.</span>
                </h2>
            </div>

            <div className="flex items-end justify-between">
                <p className="text-[var(--color-text-inverse)]/60 text-sm max-w-[180px] leading-snug">
                    Explora la nueva generación de dispositivos.
                </p>
                <ChevronRight className="w-6 h-6 text-[var(--color-text-tertiary)] group-hover:text-[var(--color-text-inverse)] group-hover:translate-x-1 transition-all" />
            </div>

            {/* Efecto de luz ambiental muy sutil */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.03] blur-[80px] rounded-full -mr-20 -mt-20" />
        </Link>
    );
}