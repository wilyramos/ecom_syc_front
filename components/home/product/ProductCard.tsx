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
            className="group relative flex flex-col transition-all duration-500 bg-white rounded-xl border-2"
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
                <div className="relative w-full aspect-square overflow-hidden mb-4">
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
                                            className="object-contain p-4 mix-blend-multiply"
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
                                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md text-black p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white z-10"
                                    >
                                        <ChevronLeft size={16} />
                                    </button>
                                    <button
                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); nextImage(); }}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md text-black p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white z-10"
                                    >
                                        <ChevronRight size={16} />
                                    </button>
                                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 pointer-events-none">
                                        {previewImages.map((_, idx) => (
                                            <span
                                                key={idx}
                                                className={cn(
                                                    "h-1 rounded-full transition-all duration-500",
                                                    idx === currentIndex ? "w-4 bg-black/60" : "w-1 bg-black/10"
                                                )}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center w-full h-full text-[var(--color-text-tertiary)] opacity-30">
                            <MdOutlineImageNotSupported size={32} strokeWidth={1} />
                        </div>
                    )}

                    {/* Badges Minimalistas */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        {discountedPrice > 0 && (
                            <span className="px-2 py-0.5 bg-black text-white text-[9px] font-bold uppercase tracking-wider rounded-full">
                                -{Math.round(discountedPrice)}%
                            </span>
                        )}

                    </div>
                </div>

                {/* --- INFO PRODUCTO --- */}
                <div className="flex flex-col px-2 md:px-4 pb-2">
                    <div className="flex items-center justify-center gap-2 mb-1">
                        {/* <span className="text-[10px] font-bold tracking-[0.1em] text-[var(--color-text-tertiary)] uppercase truncate">
                            {product.brand?.nombre || "General"}
                        </span> */}

                        {/* Colores Estilo Apple (Apilados) */}
                        {uniqueColors.length > 0 && (
                            <div className="flex -space-x-1 hover:space-x-1 transition-all duration-300">
                                {uniqueColors.slice(0, 4).map((c, index) => (
                                    <button
                                        key={index}
                                        onClick={(e) => handleColorSelect(e, c)}
                                        className={cn(
                                            "relative ring-1 ring-white rounded-full transition-all duration-300",
                                            selectedColor === c ? "z-10 scale-125" : "z-0 hover:z-20 hover:scale-110"
                                        )}
                                    >
                                        <ColorCircle color={c} size={10} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* --- INFO PRODUCTO --- */}
                    <div className="flex flex-col pb-2">
                        <div className="flex items-start justify-between gap-2 mb-1">
                            <span className="text-[10px] font-bold tracking-[0.1em] text-[var(--color-text-tertiary)] uppercase truncate">
                                {product.brand?.nombre || ""}
                            </span>


                        </div>

                        <h3 className="text-xs font-medium text-[var(--color-text-primary)] leading-snug line-clamp-3 mb-3 group-hover:text-black transition-colors">
                            {product.nombre}
                        </h3>

                        <div className="mt-auto h-8 flex items-center">
                            {stock === 0 ? (
                                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--color-text-tertiary)] bg-[var(--color-bg-secondary)] px-3 py-1 rounded-full border border-[var(--color-border-subtle)]">
                                    Agotado
                                </span>
                            ) : (
                                <div className="flex items-baseline gap-2">
                                    <span className="text-[16px] font-bold text-[var(--color-text-primary)] tracking-tight">
                                        S/ {precio.toFixed(2)}
                                    </span>
                                    {product.precioComparativo && product.precioComparativo > precio && (
                                        <span className="text-[12px] text-[var(--color-text-tertiary)] line-through font-light">
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