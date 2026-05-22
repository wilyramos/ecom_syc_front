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

export default function ProductCard({ product }: { product: TApiProduct }) {
    const searchParams = useSearchParams();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [previewImages, setPreviewImages] = useState<string[]>(product.imagenes ?? []);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [startX, setStartX] = useState<number | null>(null);

    const precio = product.precio ?? 0;
    const stock = product.stock ?? 0;

    // --- LÓGICA DE COLORES ---
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
    }, [product]);

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
            const foundVariant = product.variants?.find(v => {
                const vAttrs = v.atributos as Record<string, string>;
                return (vAttrs?.Color === targetColor || vAttrs?.color === targetColor);
            });

            if (foundVariant && foundVariant.imagenes && foundVariant.imagenes.length > 0) {
                setPreviewImages(foundVariant.imagenes);
            } else {
                setPreviewImages(product.imagenes ?? []);
            }
        }
    }, [searchParams, product, uniqueColors]);

    const handleColorSelect = (e: React.MouseEvent | React.TouchEvent, color: string) => {
        e.preventDefault(); e.stopPropagation();
        setSelectedColor(color);
        setCurrentIndex(0);

        const mainColor = product.atributos?.Color || product.atributos?.color;
        if (mainColor === color && product.imagenes && product.imagenes.length > 0) {
            setPreviewImages(product.imagenes);
            return;
        }

        const foundVariant = product.variants?.find(v => {
            const vAttrs = v.atributos as Record<string, string>;
            return (vAttrs?.Color === color || vAttrs?.color === color);
        });

        if (foundVariant && foundVariant.imagenes && foundVariant.imagenes.length > 0) {
            setPreviewImages(foundVariant.imagenes);
        } else {
            setPreviewImages(product.imagenes ?? []);
        }
    };

    const nextImage = () => setCurrentIndex((prev) => prev === previewImages.length - 1 ? 0 : prev + 1);
    const prevImage = () => setCurrentIndex((prev) => prev === 0 ? previewImages.length - 1 : prev - 1);

    const discountedPrice = product.precioComparativo
        ? ((product.precioComparativo - precio) / product.precioComparativo) * 100
        : 0;

    return (
        <div
            className="group relative flex flex-col transition-all duration-500 border rounded-lg"
            onMouseDown={(e) => setStartX(e.clientX)}
            onMouseUp={(e) => {
                if (startX === null) return;
                const diff = startX - e.clientX;
                if (diff > 50) nextImage(); else if (diff < -50) prevImage();
                setStartX(null);
            }}
        >
            <Link href={`/productos/${product.slug}`} className="flex flex-col h-full">
                {/* --- CONTENEDOR IMAGEN --- */}
                <div className="relative w-full aspect-square overflow-hidden mb-5">
                    {previewImages.length > 0 ? (
                        <div className="relative w-full h-full">
                            <div
                                className="flex w-full h-full transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1)"
                                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                            >
                                {previewImages.map((img, idx) => (
                                    <div key={idx} className="min-w-full h-full relative">
                                        <Image
                                            src={img}
                                            alt={product.nombre}
                                            fill
                                            sizes="(max-width: 768px) 50vw, 33vw"
                                            className="object-contain p-6 mix-blend-multiply"
                                            quality={90}
                                            unoptimized
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Controles Invisibles que aparecen al Hover */}
                            {previewImages.length > 1 && (
                                <>
                                    <button
                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); prevImage(); }}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white z-10 shadow-sm"
                                        type="button"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    <button
                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); nextImage(); }}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white z-10 shadow-sm"
                                        type="button"
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 pointer-events-none">
                                        {previewImages.map((_, idx) => (
                                            <span
                                                key={idx}
                                                className={cn(
                                                    "h-1.5 rounded-full transition-all duration-500",
                                                    idx === currentIndex ? "w-5 bg-black/60" : "w-1.5 bg-black/10"
                                                )}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center w-full h-full text-[var(--color-text-tertiary)] opacity-30">
                            <MdOutlineImageNotSupported size={40} strokeWidth={1} />
                        </div>
                    )}

                    {/* Badges Minimalistas */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {discountedPrice > 0 && (
                            <span className="px-1 py-1 bg-[var(--color-accent)] text-white text-[10px] font-bold uppercase tracking-wider rounded">
                                -{Math.round(discountedPrice)}%
                            </span>
                        )}
                    </div>
                </div>

                {/* --- INFO PRODUCTO --- */}
                <div className="flex flex-col px-3 md:px-5 pb-4 flex-grow">
                    <div className="flex items-center justify-center gap-2.5 mb-2">
                        {/* Colores Estilo Apple (Apilados) */}
                        {uniqueColors.length > 0 && (
                            <div className="flex -space-x-1.5 hover:space-x-1 transition-all duration-300">
                                {uniqueColors.slice(0, 4).map((c, index) => (
                                    <button
                                        key={index}
                                        onClick={(e) => handleColorSelect(e, c)}
                                        className={cn(
                                            "relative ring-2 ring-white rounded-full transition-all duration-300",
                                            selectedColor === c ? "z-10 scale-125" : "z-0 hover:z-20 hover:scale-110"
                                        )}
                                        type="button"
                                    >
                                        <ColorCircle color={c} size={14} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col pb-2 flex-grow justify-between">
                        <div>
                            <div className="flex items-start justify-between gap-2 mb-1.5">
                                <span className="text-[12px] font-bold tracking-[0.1em] text-[var(--color-text-tertiary)] uppercase truncate">
                                    {product.brand?.nombre || ""}
                                </span>
                            </div>

                            <h3 className="text-sm font-medium text-[var(--color-text-primary)] leading-snug line-clamp-3 mb-4 group-hover:text-black transition-colors">
                                {product.nombre}
                            </h3>
                        </div>

                        <div className="h-10 flex items-center mt-auto">
                            {stock === 0 ? (
                                <span className="text-[12px] font-bold uppercase tracking-[0.15em] text-[var(--color-text-tertiary)] bg-[var(--color-bg-secondary)] px-4 py-1.5 rounded-full border border-[var(--color-border-subtle)]">
                                    Agotado
                                </span>
                            ) : (
                                <div className="flex items-baseline gap-2.5">
                                    <span className="text-[19px] font-bold text-[var(--color-text-primary)] tracking-tight">
                                        S/ {precio.toFixed(2)}
                                    </span>
                                    {product.precioComparativo && product.precioComparativo > precio && (
                                        <span className="text-[14px] text-[var(--color-text-tertiary)] line-through font-light">
                                            S/ {product.precioComparativo.toFixed(2)}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}