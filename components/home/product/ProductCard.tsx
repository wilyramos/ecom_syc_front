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

    const handleTouchStart = (e: React.TouchEvent) => setStartX(e.touches[0].clientX);

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (startX === null) return;
        const diff = startX - e.changedTouches[0].clientX;
        if (diff > 40) nextImage();
        else if (diff < -40) prevImage();
        setStartX(null);
    };

    const handleMouseDown = (e: React.MouseEvent) => setStartX(e.clientX);

    const handleMouseUp = (e: React.MouseEvent) => {
        if (startX === null) return;
        const diff = startX - e.clientX;
        if (diff > 40) nextImage();
        else if (diff < -40) prevImage();
        setStartX(null);
    };

    return (
        <div
            className="group relative flex flex-col h-full w-full overflow-hidden rounded-lg border border-gray-200 bg-white hover:shadow-md transition-shadow duration-300"
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

            {/* Contenedor de Imagen */}
            <div className="relative w-full aspect-square overflow-hidden bg-gray-50 shrink-0 z-10 pointer-events-none select-none">
                {previewImages.length > 0 ? (
                    <div
                        className="flex w-full h-full transition-transform duration-300 ease-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {previewImages.map((img, idx) => (
                            <div key={idx} className="min-w-full h-full relative flex items-center justify-center">
                                <Image
                                    src={img}
                                    alt={`${product.nombre} - vista ${idx + 1}`}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-contain mix-blend-multiply p-2"
                                    quality={85}
                                    unoptimized
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-300">
                        <MdOutlineImageNotSupported size={40} strokeWidth={1} />
                    </div>
                )}

                {/* Flechas Laterales */}
                {previewImages.length > 1 && (
                    <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-between px-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                            onClick={(e) => { e.preventDefault(); prevImage(); }}
                            className="p-1 rounded-full bg-white/90 text-gray-700 shadow-sm hover:bg-white hover:text-black hover:scale-105 pointer-events-auto transition-all"
                            type="button"
                            aria-label="Imagen anterior"
                        >
                            <ChevronLeft size={18} strokeWidth={2.5} />
                        </button>
                        <button
                            onClick={(e) => { e.preventDefault(); nextImage(); }}
                            className="p-1 rounded-full bg-white/90 text-gray-700 shadow-sm hover:bg-white hover:text-black hover:scale-105 pointer-events-auto transition-all"
                            type="button"
                            aria-label="Siguiente imagen"
                        >
                            <ChevronRight size={18} strokeWidth={2.5} />
                        </button>
                    </div>
                )}
            </div>

            {/* Contenedor de Información (Padding y espaciados reducidos) */}
            <div className="flex flex-col flex-grow p-2.5 relative z-10 pointer-events-none">

                {/* Colores */}
                <div className="h-[20px] flex items-center justify-start pointer-events-auto mb-1">
                    {uniqueColors.length > 0 && (
                        <div className="flex gap-1 transition-all duration-300">
                            {uniqueColors.slice(0, 4).map((c, index) => (
                                <button
                                    key={index}
                                    onClick={(e) => { e.preventDefault(); handleColorSelect(c); }}
                                    className={cn(
                                        "rounded-full transition-transform duration-200 border-2",
                                        selectedColor === c
                                            ? "border-gray-400 scale-110"
                                            : "border-transparent hover:scale-110"
                                    )}
                                    type="button"
                                    aria-label={`Seleccionar color ${c}`}
                                >
                                    <ColorCircle color={c} size={12} />
                                </button>
                            ))}
                            {uniqueColors.length > 4 && (
                                <span className="text-[10px] text-gray-500 font-medium ml-0.5">
                                    +{uniqueColors.length - 4}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Título - Altura fija para evitar desajustes en el Grid */}
                <h3 className="text-xs sm:text-sm font-medium text-gray-800 capitalize leading-tight line-clamp-2 h-[32px] sm:h-[40px] mb-1 group-hover:text-blue-600 transition-colors">
                    {product.nombre}
                </h3>

                {/* Precios empujados al fondo por mt-auto */}
                <div className="flex flex-col mt-auto mb-2">
                    <div className="flex items-center flex-wrap gap-x-1.5 gap-y-0.5">
                        <span className="text-sm sm:text-base font-bold text-gray-900 leading-none">
                            S/ {precio.toFixed(2)}
                        </span>

                        {product.precioComparativo && product.precioComparativo > precio && (
                            <span className="text-[10px] sm:text-xs text-gray-400 line-through font-medium leading-none">
                                S/ {product.precioComparativo.toFixed(2)}
                            </span>
                        )}

                        {discountedPrice > 0 && (
                            <span className="px-1 py-0.5 bg-red-50 text-red-600 rounded-[3px] text-[9px] sm:text-[10px] font-bold uppercase leading-none">
                                -{Math.round(discountedPrice)}%
                            </span>
                        )}
                    </div>
                </div>

                {/* Botón de Agregar (ancho completo y ordenado) */}
                <div className="pointer-events-auto relative z-30 w-full shrink-0">
                    <AddToCartButton product={product} />
                </div>
            </div>
        </div>
    );
}