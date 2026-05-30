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
    
    // Control de zoom independiente por índice (Desktop) y uno global para Móvil
    const [zoomStates, setZoomStates] = useState<Record<number, ZoomState>>({});
    const [mobileZoom, setMobileZoom] = useState<ZoomState>({ x: 0, y: 0, active: false });

    if (uniqueImages.length === 0) {
        return (
            <div className="w-full aspect-square bg-[var(--color-bg-tertiary)] rounded-xl flex flex-col items-center justify-center text-[var(--color-text-tertiary)] border border-[var(--color-border-subtle)]">
                <ImageOff size={32} />
                <span className="text-xs mt-2 font-medium">Imagen no disponible</span>
            </div>
        );
    }

    const nextImage = () => {
        setMobileZoom({ x: 0, y: 0, active: false });
        setSelectedIndex((prev) => (prev + 1) % uniqueImages.length);
    };

    const prevImage = () => {
        setMobileZoom({ x: 0, y: 0, active: false });
        setSelectedIndex((prev) => (prev - 1 + uniqueImages.length) % uniqueImages.length);
    };

    // Manejador del efecto Zoom estilo Shopify (Click para activar/desactivar y mover según coordenadas)
    const handleZoomClick = (e: MouseEvent<HTMLDivElement>, idx: number, isMobile = false) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        if (isMobile) {
            setMobileZoom((prev) => ({
                x,
                y,
                active: !prev.active
            }));
        } else {
            setZoomStates((prev) => ({
                ...prev,
                [idx]: {
                    x,
                    y,
                    active: !prev[idx]?.active
                }
            }));
        }
    };

    const handleZoomMouseMove = (e: MouseEvent<HTMLDivElement>, idx: number, isMobile = false) => {
        if (isMobile && !mobileZoom.active) return;
        if (!isMobile && !zoomStates[idx]?.active) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        if (isMobile) {
            setMobileZoom((prev) => ({ ...prev, x, y }));
        } else {
            setZoomStates((prev) => ({
                ...prev,
                [idx]: { ...prev[idx], x, y }
            }));
        }
    };

    const handleZoomMouseLeave = (idx: number, isMobile = false) => {
        if (isMobile) {
            setMobileZoom({ x: 0, y: 0, active: false });
        } else {
            setZoomStates((prev) => ({
                ...prev,
                [idx]: { x: 0, y: 0, active: false }
            }));
        }
    };

    return (
        <div className="w-full">
            {/* VISTA DESKTOP */}
            <div className="hidden md:grid grid-cols-2 gap-4">
                {uniqueImages.map((img, idx) => {
                    const isFirst = idx === 0;
                    const zoom = zoomStates[idx] || { x: 0, y: 0, active: false };

                    return (
                        <div
                            key={`${img}-${idx}`}
                            onClick={(e) => handleZoomClick(e, idx)}
                            onMouseMove={(e) => handleZoomMouseMove(e, idx)}
                            onMouseLeave={() => handleZoomMouseLeave(idx)}
                            className={cn(
                                "relative bg-[var(--color-bg-secondary)] overflow-hidden rounded-lg group select-none",
                                isFirst ? "col-span-2 aspect-[4/5] lg:aspect-square" : "aspect-square",
                                zoom.active ? "cursor-zoom-out" : "cursor-zoom-in"
                            )}
                        >
                            <Image
                                src={img}
                                alt={`Producto ${idx + 1}`}
                                fill
                                className={cn(
                                    "object-contain transition-transform duration-200 ease-out",
                                    zoom.active && "scale-[2.5]"
                                )}
                                style={{
                                    transformOrigin: zoom.active ? `${zoom.x}% ${zoom.y}%` : "center"
                                }}
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
                        style={{ 
                            transform: mobileZoom.active ? "none" : `translateX(-${selectedIndex * 100}%)` 
                        }}
                    >
                        {uniqueImages.map((img, idx) => {
                            // En móvil solo aplicamos la lógica al elemento activo visible
                            const isCurrent = idx === selectedIndex;
                            
                            return (
                                <div 
                                    key={idx} 
                                    onClick={(e) => isCurrent && handleZoomClick(e, idx, true)}
                                    onMouseMove={(e) => isCurrent && handleZoomMouseMove(e, idx, true)}
                                    onMouseLeave={() => isCurrent && handleZoomMouseLeave(idx, true)}
                                    className={cn(
                                        "relative min-w-full h-full select-none",
                                        mobileZoom.active ? "cursor-zoom-out" : "cursor-zoom-in",
                                        !isCurrent && mobileZoom.active && "hidden"
                                    )}
                                >
                                    <Image
                                        src={img}
                                        alt={`Producto ${idx}`}
                                        fill
                                        className={cn(
                                            "object-contain transition-transform duration-200 ease-out",
                                            isCurrent && mobileZoom.active && "scale-[2.5]"
                                        )}
                                        style={{
                                            transformOrigin: isCurrent && mobileZoom.active ? `${mobileZoom.x}% ${mobileZoom.y}%` : "center"
                                        }}
                                        unoptimized
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Flechas Navegación */}
                {uniqueImages.length > 1 && !mobileZoom.active && (
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
                {uniqueImages.length > 1 && !mobileZoom.active && (
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