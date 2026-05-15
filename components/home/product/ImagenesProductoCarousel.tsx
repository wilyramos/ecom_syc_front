"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { ImageOff, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ImagenesProductoCarousel({ images }: { images: string[] }) {
    const uniqueImages = useMemo(() => {
        return Array.from(new Set(images.filter(img => typeof img === 'string' && img.length > 0)));
    }, [images]);

    const [selectedIndex, setSelectedIndex] = useState(0);

    if (uniqueImages.length === 0) {
        return (
            <div className="w-full aspect-square bg-[var(--color-bg-tertiary)] rounded-xl flex flex-col items-center justify-center text-[var(--color-text-tertiary)] border border-[var(--color-border-subtle)]">
                <ImageOff size={32} />
                <span className="text-xs mt-2 font-medium">Imagen no disponible</span>
            </div>
        );
    }

    const nextImage = () => setSelectedIndex((prev) => (prev + 1) % uniqueImages.length);
    const prevImage = () => setSelectedIndex((prev) => (prev - 1 + uniqueImages.length) % uniqueImages.length);

    return (
        <div className="w-full">
            {/* VISTA DESKTOP */}
            <div className="hidden md:grid grid-cols-2 gap-4">
                {uniqueImages.map((img, idx) => {
                    const isFirst = idx === 0;

                    return (
                        <div
                            key={`${img}-${idx}`}
                            className={cn(
                                "relative bg-[var(--color-bg-secondary)] overflow-hidden rounded-lg group cursor-zoom-in",
                                // La primera imagen ocupa las 2 columnas y es alta (efecto de 4 espacios)
                                isFirst ? "col-span-2 aspect-[4/5] lg:aspect-square" : "aspect-square"
                            )}
                        >
                            <Image
                                src={img}
                                alt={`Producto ${idx + 1}`}
                                fill
                                className="transition-transform duration-700 group-hover:scale-110 object-cover"
                                sizes={isFirst ? "100vw" : "50vw"}
                                priority={isFirst}
                                unoptimized
                            />

                        </div>
                    );
                })}
            </div>

            {/* VISTA MÓVIL */}
            <div className="md:hidden relative">
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[var(--color-bg-secondary)]">
                    <div
                        className="flex h-full transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${selectedIndex * 100}%)` }}
                    >
                        {uniqueImages.map((img, idx) => (
                            <div key={idx} className="relative min-w-full h-full cursor-zoom-in">
                                <Image
                                    src={img}
                                    alt={`Producto ${idx}`}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />

                            </div>
                        ))}
                    </div>
                </div>

                {/* Flechas Navegación */}
                {uniqueImages.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg z-10"
                        >
                            <ChevronLeft size={24} className="text-gray-900" />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg z-10"
                        >
                            <ChevronRight size={24} className="text-gray-900" />
                        </button>
                    </>
                )}

                {/* Dots */}
                {uniqueImages.length > 1 && (
                    <div className="flex justify-center gap-2 mt-6">
                        {uniqueImages.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedIndex(idx)}
                                className={cn(
                                    "h-1.5 transition-all duration-300 rounded-full",
                                    selectedIndex === idx ? "w-10 bg-gray-900" : "w-2 bg-gray-300"
                                )}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}