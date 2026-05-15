// File: src/components/banner/CarouselDot.tsx
"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface DotProps {
    onClick?: () => void;
    active?: boolean;
    autoPlaySpeed?: number;
    index?: number;
    carouselState?: { currentSlide: number };
}

export function CarouselDot({ onClick, active, autoPlaySpeed = 5000 }: DotProps) {
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const bar = barRef.current;
        if (!bar) return;

        if (active) {
            bar.style.transition = "none";
            bar.style.transform = "scaleX(0)";
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    bar.style.transition = `transform ${autoPlaySpeed}ms linear`;
                    bar.style.transform = "scaleX(1)";
                });
            });
        } else {
            bar.style.transition = "none";
            bar.style.transform = "scaleX(0)";
        }
    }, [active, autoPlaySpeed]);

    return (
        <button
            onClick={onClick}
            aria-label={active ? "Slide actual" : "Ir a slide"}
            className="group relative py-4 px-1 cursor-pointer outline-none" 
        >
            {/* Contenedor visual: más grande para mejor "clicabilidad" */}
            <div className={cn(
                "h-1 rounded-full overflow-hidden transition-all duration-500 bg-white/20",
                active ? "w-10 md:w-12 bg-white/30" : "w-6 md:w-8 group-hover:bg-white/50"
            )}>
                {/* Barra de progreso interna */}
                <div
                    ref={barRef}
                    className="h-full bg-white origin-left will-change-transform"
                    style={{ transform: "scaleX(0)" }}
                />
            </div>
        </button>
    );
}