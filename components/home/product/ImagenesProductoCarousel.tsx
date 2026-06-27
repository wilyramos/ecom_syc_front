"use client";

import { useState, useMemo, MouseEvent } from "react";
import Image from "next/image";
import { ImageOff, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ZoomState {
    x: number;
    y: number;
    active: boolean;
}

export default function ImagenesProductoCarousel({ images }: { images: string[] }) {
    const uniqueImages = useMemo(() => {
        return Array.from(new Set(images.filter(img => typeof img === 'string' && img.length > 0)));
    }, [images]);

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [zoomState, setZoomState] = useState<ZoomState>({ x: 0, y: 0, active: false });

    if (uniqueImages.length === 0) {
        return (
            <div className="w-full aspect-square bg-[var(--color-bg-tertiary)] rounded-xl flex flex-col items-center justify-center text-[var(--color-text-tertiary)] border border-[var(--color-border-subtle)]">
                <ImageOff size={32} />
                <span className="text-xs mt-2 font-medium">Imagen no disponible</span>
            </div>
        );
    }

    const nextImage = () => {
        setZoomState({ x: 0, y: 0, active: false });
        setSelectedIndex((prev) => (prev + 1) % uniqueImages.length);
    };

    const prevImage = () => {
        setZoomState({ x: 0, y: 0, active: false });
        setSelectedIndex((prev) => (prev - 1 + uniqueImages.length) % uniqueImages.length);
    };

    const handleZoomClick = (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        setZoomState((prev) => ({
            x,
            y,
            active: !prev.active
        }));
    };

    const handleZoomMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!zoomState.active) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        setZoomState((prev) => ({ ...prev, x, y }));
    };

    const handleZoomMouseLeave = () => {
        setZoomState({ x: 0, y: 0, active: false });
    };

    return (
        <div className="w-full space-y-3">
            {/* Contenedor de la Imagen Principal */}
            <div className="relative aspect-square w-full overflow-hidden rounded-xl group select-none">
                <div
                    onClick={handleZoomClick}
                    onMouseMove={handleZoomMouseMove}
                    onMouseLeave={handleZoomMouseLeave}
                    className={cn(
                        "w-full h-full relative overflow-hidden",
                        zoomState.active ? "cursor-zoom-out" : "cursor-zoom-in"
                    )}
                >
                    <Image
                        src={uniqueImages[selectedIndex]}
                        alt={`Producto vista principal`}
                        fill
                        className={cn(
                            "object-contain transition-transform duration-200 ease-out",
                            zoomState.active && "scale-[2.5]"
                        )}
                        style={{
                            transformOrigin: zoomState.active ? `${zoomState.x}% ${zoomState.y}%` : "center"
                        }}
                        priority
                        unoptimized
                    />
                </div>

                {/* Flechas de Navegación */}
                {uniqueImages.length > 1 && !zoomState.active && (
                    <>
                        <button
                            type="button"
                            onClick={prevImage}
                            className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background border border-border p-2 rounded-full shadow transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
                        >
                            <ChevronLeft size={20} className="text-foreground" />
                        </button>
                        <button
                            type="button"
                            onClick={nextImage}
                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background border border-border p-2 rounded-full shadow transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
                        >
                            <ChevronRight size={20} className="text-foreground" />
                        </button>
                    </>
                )}
            </div>

            {/* Tira de Miniaturas Inferior */}
            {uniqueImages.length > 1 && (
                <div className="flex flex-row gap-2 overflow-x-auto pb-1 pt-0.5 scrollbar-none justify-start w-full snap-x snap-mandatory">
                    {uniqueImages.map((img, idx) => (
                        <button
                            key={`thumb-${idx}`}
                            type="button"
                            onClick={() => {
                                setSelectedIndex(idx);
                                setZoomState({ x: 0, y: 0, active: false });
                            }}
                            className={cn(
                                "relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-md overflow-hidden bg-card border-2 transition-all snap-start",
                                selectedIndex === idx ? "border-primary" : "border-border hover:border-muted-foreground"
                            )}
                        >
                            <Image
                                src={img}
                                alt={`Miniatura ${idx + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 64px, 80px"
                                unoptimized
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}