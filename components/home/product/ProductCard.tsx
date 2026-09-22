"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ColorCircle from "@/components/ui/ColorCircle";
import type { TApiProduct } from "@/src/schemas";
import { cn } from "@/lib/utils";
import { MdOutlineImageNotSupported } from "react-icons/md";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product }: { product: TApiProduct }) {
    const searchParams = useSearchParams();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [previewImages, setPreviewImages] = useState<string[]>(product.imagenes ?? []);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [startX, setStartX] = useState<number | null>(null);

    const precio = product.precio ?? 0;

    const uniqueColors = useMemo(() => {
        const colors = new Set<string>();
        const mainColor = product.atributos?.Color || product.atributos?.color;
        if (mainColor) colors.add(mainColor);

        if (product.variants && product.variants.length > 0) {
            product.variants.forEach((v) => {
                const vAttrs = v.atributos as Record<string, string> | undefined;
                const vColor = vAttrs?.Color || vAttrs?.color;
                if (vColor) colors.add(vColor);
            });
        }
        return Array.from(colors);
    }, [product.atributos, product.variants]);

    useEffect(() => {
        const filterColor = searchParams.get("Color") || searchParams.get("color");
        const mainColor = product.atributos?.Color || product.atributos?.color;
        let targetColor = mainColor;

        if (filterColor && uniqueColors.includes(filterColor)) {
            targetColor = filterColor;
        }

        if (!targetColor) return;

        setSelectedColor(targetColor);
        setCurrentIndex(0);

        if (targetColor === mainColor && product.imagenes && product.imagenes.length > 0) {
            setPreviewImages(product.imagenes);
        } else {
            const foundVariant = product.variants?.find((v) => {
                const vAttrs = v.atributos as Record<string, string>;
                return vAttrs?.Color === targetColor || vAttrs?.color === targetColor;
            });

            if (foundVariant && foundVariant.imagenes && foundVariant.imagenes.length > 0) {
                setPreviewImages(foundVariant.imagenes);
            } else {
                setPreviewImages(product.imagenes ?? []);
            }
        }
    }, [searchParams, product.atributos, product.imagenes, product.variants, uniqueColors.length, uniqueColors]);

    const handleColorSelect = (color: string) => {
        setSelectedColor(color);
        setCurrentIndex(0);

        const mainColor = product.atributos?.Color || product.atributos?.color;
        if (mainColor === color && product.imagenes && product.imagenes.length > 0) {
            setPreviewImages(product.imagenes);
            return;
        }

        const foundVariant = product.variants?.find((v) => {
            const vAttrs = v.atributos as Record<string, string>;
            return vAttrs?.Color === color || vAttrs?.color === color;
        });

        if (foundVariant && foundVariant.imagenes && foundVariant.imagenes.length > 0) {
            setPreviewImages(foundVariant.imagenes);
        } else {
            setPreviewImages(product.imagenes ?? []);
        }
    };

    const nextImage = () => setCurrentIndex((prev) => (prev === previewImages.length - 1 ? 0 : prev + 1));
    const prevImage = () => setCurrentIndex((prev) => (prev === 0 ? previewImages.length - 1 : prev - 1));

    const discountedPrice = product.precioComparativo
        ? ((product.precioComparativo - precio) / product.precioComparativo) * 100
        : 0;

    const handleTouchStart = (e: React.TouchEvent) => {
        setStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (startX === null) return;
        const diff = startX - e.changedTouches[0].clientX;
        if (diff > 50) nextImage();
        else if (diff < -50) prevImage();
        setStartX(null);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setStartX(e.clientX);
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        if (startX === null) return;
        const diff = startX - e.clientX;
        if (diff > 50) nextImage();
        else if (diff < -50) prevImage();
        setStartX(null);
    };

    return (
        <div
            className="group relative flex flex-col transition-all duration-500 border rounded-lg overflow-hidden bg-white h-full w-full "
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            <Link
                href={`/productos/${product.slug}${selectedColor ? `?Color=${selectedColor}` : ''}`}
                className="absolute inset-0 z-0"
                aria-label={`Ver detalles de ${product.nombre}`}
            />

            <div className="relative w-full aspect-square overflow-hidden mb-3 z-10 pointer-events-none select-none bg-neutral-50/50 shrink-0">
                {previewImages.length > 0 ? (
                    <div className="relative w-full h-full">
                        <div
                            className="flex w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {previewImages.map((img, idx) => (
                                <div key={idx} className="min-w-full h-full relative flex items-center justify-center">
                                    <Image
                                        src={img}
                                        alt={`${product.nombre} - vista ${idx + 1}`}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-contain mix-blend-multiply"
                                        quality={85}
                                        unoptimized
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center w-full h-full text-[var(--color-text-tertiary)] opacity-30">
                        <MdOutlineImageNotSupported size={40} strokeWidth={1} />
                    </div>
                )}
            </div>

            {previewImages.length > 1 && (
                <div className="absolute top-0 left-0 w-full aspect-square z-20 pointer-events-none hidden md:block">
                    <button
                        onClick={(e) => { e.preventDefault(); prevImage(); }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white shadow-md pointer-events-auto"
                        type="button"
                        aria-label="Imagen anterior"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        onClick={(e) => { e.preventDefault(); nextImage(); }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white shadow-md pointer-events-auto"
                        type="button"
                        aria-label="Siguiente imagen"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            )}

            <div className="flex flex-col px-3 md:px-4 pb-4 flex-grow relative z-10 pointer-events-none">
                <div className="h-6 flex items-center justify-center gap-2 mb-2 pointer-events-auto">
                    {uniqueColors.length > 0 && (
                        <div className="flex -space-x-1 hover:space-x-1.5 transition-all duration-300">
                            {uniqueColors.slice(0, 4).map((c, index) => (
                                <button
                                    key={index}
                                    onClick={(e) => { e.preventDefault(); handleColorSelect(c); }}
                                    className={cn(
                                        "relative ring-2 ring-white rounded-full transition-all duration-300 focus:outline-none focus:ring-neutral-400",
                                        selectedColor === c ? "z-10 scale-125 ring-neutral-300" : "z-0 hover:z-20 hover:scale-110"
                                    )}
                                    type="button"
                                    aria-label={`Seleccionar color ${c}`}
                                >
                                    <ColorCircle color={c} size={14} />
                                </button>
                            ))}
                            {uniqueColors.length > 4 && (
                                <span className="text-[10px] text-gray-500 pl-1 self-center font-medium">
                                    +{uniqueColors.length - 4}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex flex-col flex-grow justify-between">
                    <div>
                        <h3 className="text-md md:text-base font-medium text-[var(--color-text-primary)] capitalize leading-snug line-clamp-2 h-[34px] md:h-[40px] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                            {product.nombre}
                        </h3>
                    </div>

                    <div className="h-[44px] md:h-[48px] flex flex-col justify-end mb-3 mt-auto">
    <div className="flex items-center flex-wrap gap-x-2 gap-y-1">
        <span className="text-base md:text-[19px] font-bold text-[var(--color-text-primary)] leading-none">
            S/ {precio.toFixed(2)}
        </span>
        
        {product.precioComparativo && product.precioComparativo > precio && (
            <span className="text-xs md:text-[14px] text-[var(--color-text-tertiary)] line-through font-medium leading-none">
                S/ {product.precioComparativo.toFixed(2)}
            </span>
        )}
        
        {discountedPrice > 0 && (
            <span className="px-1.5 py-0.5 bg-[var(--color-light)] text-[var(--color-primary)] rounded-sm text-[12px] md:text-[14px] font-semibold uppercase ">
                -{Math.round(discountedPrice)}% Dcto
            </span>
        )}
    </div>
</div>

                    <div className="mt-auto pointer-events-auto relative z-30 shrink-0">
                        <AddToCartButton product={product} />
                    </div>
                </div>
            </div>
        </div>
    );
}