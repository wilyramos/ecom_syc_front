// File: src/components/banner/CarouselArrow.tsx
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArrowProps {
    onClick?: () => void;
    direction: "left" | "right";
}

export function CarouselArrow({ onClick, direction }: ArrowProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "absolute top-1/2 -translate-y-1/2 z-20",
                "text-white/40 hover:text-white transition-all duration-500",
                "cursor-pointer group p-4 hidden sm:block",
                direction === "left" ? "left-2" : "right-2"
            )}
            aria-label={direction === "left" ? "Anterior" : "Siguiente"}
        >
            {/* Sombra drop-shadow para visibilidad en fondos blancos */}
            <div className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                {direction === "left" ? (
                    <ChevronLeft strokeWidth={1} className="w-10 h-10 md:w-14 md:h-14 transition-transform duration-500 group-hover:-translate-x-1" />
                ) : (
                    <ChevronRight strokeWidth={1} className="w-10 h-10 md:w-14 md:h-14 transition-transform duration-500 group-hover:translate-x-1" />
                )}
            </div>
        </button>
    );
}