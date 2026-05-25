"use client";

import { useState, useEffect, useMemo } from 'react';
import AddProductToCart from './AddProductToCart';
import ImagenesProductoCarousel from './ImagenesProductoCarousel';
import type { ProductWithCategoryResponse, TApiVariant } from '@/src/schemas';
import ShopNowButton from './ShopNowButton';
import ProductExpandableSections from './ProductExpandableSections';
import ProductExpandableSectionsInfo from './ProductExpandableSectionsInfo';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import ColorCircle from '@/components/ui/ColorCircle';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";

type Props = {
    producto: ProductWithCategoryResponse;
};

const MAX_VISIBLE_OPTIONS = 10;

export default function ProductDetails({ producto }: Props) {
    const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
    const [selectedVariant, setSelectedVariant] = useState<TApiVariant | null>(null);
    const searchParams = useSearchParams();

    const allAttributes = useMemo(() => {
        const attrs: Record<string, string[]> = {};
        producto.variants?.forEach(v => {
            Object.entries(v.atributos).forEach(([key, value]) => {
                if (!attrs[key]) attrs[key] = [];
                if (!attrs[key].includes(value)) attrs[key].push(value);
            });
        });
        return attrs;
    }, [producto.variants]);

    useEffect(() => {
        const initialAttrs: Record<string, string> = {};
        Object.keys(allAttributes).forEach(attr => {
            const val = searchParams.get(attr);
            if (val) initialAttrs[attr] = val;
        });

        setSelectedAttributes(initialAttrs);

        const matched = Object.keys(initialAttrs).length > 0
            ? producto.variants?.find(v =>
                Object.keys(initialAttrs).every(k => initialAttrs[k] === v.atributos[k])
            ) ?? null
            : null;

        setSelectedVariant(matched);
    }, [allAttributes, searchParams, producto.variants]);

    const updateSelectedVariant = (attrKey: string, attrValue: string | null) => {
        const newAttributes = { ...selectedAttributes };
        if (attrValue === null || newAttributes[attrKey] === attrValue) {
            delete newAttributes[attrKey];
        } else {
            newAttributes[attrKey] = attrValue;
        }
        setSelectedAttributes(newAttributes);

        const matchedVariant = producto.variants?.find(v =>
            Object.keys(v.atributos).every(k => newAttributes[k] === v.atributos[k])
        ) ?? null;

        setSelectedVariant(matchedVariant);

        const params = new URLSearchParams();
        Object.entries(newAttributes).forEach(([k, v]) => {
            if (v) params.set(k, v);
        });
        window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
    };

    const getAvailableValues = (attrKey: string): string[] => {
        const values = new Set<string>();
        producto.variants?.forEach(variant => {
            const matchesOtherAttrs = Object.entries(selectedAttributes)
                .every(([key, value]) => key === attrKey || variant.atributos[key] === value);
            if (matchesOtherAttrs) values.add(variant.atributos[attrKey]);
        });
        return Array.from(values).sort((a, b) =>
            a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
        );
    };

    const variantImages = useMemo(() => {
        let images: string[] = [];

        if (selectedVariant?.imagenes && selectedVariant.imagenes.length > 0) {
            images = selectedVariant.imagenes;
        } else {
            const generalImages = producto.imagenes ?? [];
            const allVariantsImages = producto.variants?.flatMap(v => v.imagenes ?? []) ?? [];
            images = [...generalImages, ...allVariantsImages];
        }

        const cleaned = Array.from(new Set(images.filter(img => img && img.trim() !== "")));

        return cleaned.length > 0 ? cleaned : ["/logoapp.svg"];
    }, [selectedVariant, producto.imagenes, producto.variants]);

    const precio = selectedVariant?.precio ?? producto.precio ?? 0;
    const precioComparativo = selectedVariant?.precioComparativo ?? producto.precioComparativo ?? null;
    const stock = !selectedVariant ? (producto.stock ?? 0) : (selectedVariant.stock ?? 0);
    const hasDiscount = precioComparativo !== null && precioComparativo > precio;
    const allAttributesSelected = Object.keys(allAttributes).every(key => selectedAttributes[key]);

    const isOptionOutOfStock = (attrKey: string, attrValue: string) => {
        const variant = producto.variants?.find(v =>
            v.atributos[attrKey] === attrValue &&
            Object.entries(selectedAttributes).every(([key, value]) => key === attrKey || v.atributos[key] === value)
        );
        return variant?.stock === 0;
    };

    const colorAtributo = !producto.variants?.length && (producto.atributos?.color || producto.atributos?.Color || producto.atributos?.COLOR || null);

    return (
        <>
            <article className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 mx-auto items-start bg-background text-foreground">

                <div className='md:col-span-6 lg:col-span-6'>
                    <ImagenesProductoCarousel images={variantImages} />
                </div>

                <section className='md:col-span-6 lg:col-span-6 px-2 md:px-0 md:sticky md:top-32 h-fit'>

                    <div className="space-y-0">
                        <header className="pt-1 pb-4 border-b border-border space-y-3">
                            {/* Breadcrumb marca / línea + SKU */}
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                    {producto.brand && (
                                        <Link
                                            href={`/catalogo/${producto.brand.slug}`}
                                            className="text-[11px] font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-wide"
                                        >
                                            {producto.brand.nombre}
                                        </Link>
                                    )}
                                    {producto.brand && producto.line && (
                                        <span className="text-[11px] text-border">/</span>
                                    )}
                                    {producto.line && typeof producto.line === 'object' && (
                                        <Link
                                            href={`/catalogo/${producto.line.slug}`}
                                            className="text-[11px] font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-wide"
                                        >
                                            {producto.line.nombre}
                                        </Link>
                                    )}
                                </div>

                                {(selectedVariant?.sku || producto.sku) && (
                                    <span className="text-[10px] text-muted-foreground">
                                        SKU: {selectedVariant?.sku || producto.sku}
                                    </span>
                                )}
                            </div>

                            {/* Nombre */}
                            <h1 className="text-[clamp(1.1rem,2vw,1.6rem)] font-normal text-primary tracking-tight leading-tight">
                                {producto.nombre}
                            </h1>

                            {/* Color sin variantes */}
                            {!producto.variants?.length && colorAtributo && (
                                <div className="flex items-center gap-2">
                                    <span className="text-[11px] text-muted-foreground">Color</span>
                                    <div className="flex items-center gap-1.5">
                                        {(Array.isArray(colorAtributo) ? colorAtributo : [colorAtributo]).map((c) => (
                                            <ColorCircle key={c} color={c} size={18} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Precio */}
                            <div className="flex items-baseline gap-3 flex-wrap">
                                <div className="flex items-baseline gap-0.5 text-primary">
                                    <span className="text-sm font-medium">S/</span>
                                    <span className="text-xl md:text-2xl font-semibold tracking-tight">
                                        {precio.toFixed(2)}
                                    </span>
                                </div>

                                {hasDiscount && (
                                    <>
                                        <span className="text-sm text-muted-foreground line-through">
                                            S/ {precioComparativo!.toFixed(2)}
                                        </span>
                                        <span className="text-[11px] font-semibold px-2 py-0.5 bg-destructive text-primary-foreground">
                                            −{Math.round(((precioComparativo! - precio) / precioComparativo!) * 100)}%
                                        </span>
                                    </>
                                )}
                            </div>

                            {/* Stock agotado */}
                            {stock === 0 && (
                                <span className="inline-flex items-center text-xs font-medium text-primary-foreground bg-destructive px-2.5 py-1">
                                    Sin stock
                                </span>
                            )}

                        </header>

                        {Object.entries(allAttributes).map(([key]) => {
                            const availableValues = getAvailableValues(key);
                            const isColor = key.toLowerCase() === "color";
                            const useDropdown = !isColor && availableValues.length > MAX_VISIBLE_OPTIONS;

                            return (
                                <fieldset key={key} className="space-y-2 mt-4">
                                    <legend className="text-sm font-semibold text-muted-foreground mb-3">Selección de <span className="capitalize">{key}</span>:</legend>

                                    {isColor ? (
                                        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                                            {availableValues.map((val) => {
                                                const outOfStock = isOptionOutOfStock(key, val);
                                                const selected = selectedAttributes[key] === val;
                                                const variantForValue = producto.variants?.find(v => v.atributos[key] === val);

                                                return (
                                                    <button
                                                        type="button"
                                                        key={val}
                                                        onClick={() => !outOfStock && updateSelectedVariant(key, val)}
                                                        disabled={outOfStock}
                                                        className={cn(
                                                            "relative group flex capitalize flex-col items-center justify-between gap-2 p-1 rounded border w-full transition-all duration-200",
                                                            selected ? "border-primary border-2" : "border-border bg-card/50",
                                                            outOfStock && "opacity-60 cursor-not-allowed"
                                                        )}
                                                    >
                                                        <div className={cn("relative w-10 h-10 overflow-hidden rounded-full border border-border flex-shrink-0", outOfStock && "grayscale")}>
                                                            {variantForValue?.imagenes?.[0] ? (
                                                                <Image src={variantForValue.imagenes[0]} alt={val} fill className="object-cover" quality={30} unoptimized />
                                                            ) : (
                                                                <ColorCircle color={val} size={40} />
                                                            )}

                                                            {outOfStock && (
                                                                <span className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                                                                    <div className="w-[120%] border-t-[3px] border-destructive/80 -rotate-45" />
                                                                </span>
                                                            )}
                                                        </div>
                                                        <span className={cn("text-xs text-center truncate w-full", selected ? "font-semibold text-primary" : "font-medium text-foreground", outOfStock && "line-through text-muted-foreground")}>
                                                            {val}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    ) : useDropdown ? (
                                        <Select
                                            value={selectedAttributes[key] || ""}
                                            onValueChange={(val) => updateSelectedVariant(key, val)}
                                        >
                                            <SelectTrigger className="w-fit border-border bg-card text-foreground">
                                                <SelectValue placeholder={`Selecciona una opción`} />
                                            </SelectTrigger>
                                            <SelectContent className="bg-popover text-popover-foreground border-border">
                                                {availableValues.map((val) => {
                                                    const outOfStock = isOptionOutOfStock(key, val);
                                                    return (
                                                        <SelectItem
                                                            key={val}
                                                            value={val}
                                                            disabled={outOfStock}
                                                            className={cn(
                                                                "cursor-pointer focus:bg-accent focus:text-accent-foreground",
                                                                outOfStock && "opacity-50 cursor-not-allowed focus:bg-transparent"
                                                            )}
                                                        >
                                                            <div className="flex items-center justify-between w-full gap-4">
                                                                <span className={cn(outOfStock && "line-through text-muted-foreground")}>{val}</span>
                                                            </div>
                                                        </SelectItem>
                                                    );
                                                })}
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        <div className="flex flex-wrap gap-2.5">
                                            {availableValues.map((val) => {
                                                const outOfStock = isOptionOutOfStock(key, val);
                                                const selected = selectedAttributes[key] === val;
                                                return (
                                                    <button
                                                        type="button"
                                                        key={val}
                                                        onClick={() => !outOfStock && updateSelectedVariant(key, val)}
                                                        disabled={outOfStock}
                                                        className={cn(
                                                            "h-10 px-4 relative overflow-hidden transition-all border text-sm",
                                                            selected ? "border-primary border-2 text-primary font-semibold" : "border-border bg-card text-foreground",
                                                            outOfStock && "opacity-50 text-muted-foreground bg-muted border-border cursor-not-allowed"
                                                        )}
                                                    >
                                                        <span className={cn(outOfStock && "line-through")}>{val}</span>

                                                        {outOfStock && (
                                                            <span className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                                                                <div className="w-[110%] border-t-[1.5px] border-muted-foreground/60 -rotate-[15deg]" />
                                                            </span>
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </fieldset>
                            );
                        })}

                        <section className="flex justify-between items-center gap-4 mt-8">
                            <div className="hidden md:flex flex-1">
                                <AddProductToCart
                                    product={producto}
                                    variant={selectedVariant ?? undefined}
                                />
                            </div>
                            <div className="flex-1">
                                <ShopNowButton
                                    disabled={((producto.variants?.length ?? 0) > 0 && (!allAttributesSelected || !selectedVariant)) || stock <= 0}
                                    product={producto}
                                    variant={selectedVariant ?? undefined}
                                />
                            </div>
                        </section>
                    </div>

                    <div className="mt-4">
                        {/* Consulta por WhatsApp */}
                        <a
                            href={`https://wa.me/51972416683?text=Consulta%20${encodeURIComponent(producto.nombre)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-between py-3 hover:bg-muted/50 border-t border-border transition-colors group"
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-md text-foreground">¿Tienes dudas?</span>
                            </div>
                            <span className="text-xs font-semibold text-accent-foreground flex items-center gap-1">
                                consúltanos por WhatsApp
                                <ChevronRight className="w-3 h-3 text-primary" />
                            </span>
                        </a>

                        {/* Cards simples de los productos complementarios */}
                        <ProductExpandableSectionsInfo producto={producto} />
                    </div>

                </section>

            </article>

            <ProductExpandableSections producto={producto} />

            {/* Cards simples de los productos complementarios */}
            <section className="md:col-span-12 mt-12 pt-4">
                {producto.complementarios && producto.complementarios.length > 0 && (
                    <div className="space-y-2 border-t border-border pt-4">
                        <h3 className="text-md tracking-tighter text-primary font-semibold">
                            Completa tu compra:
                        </h3>

                        {/* Contenedor Flex que se expande */}
                        <div className="flex flex-wrap gap-1">
                            {producto.complementarios.map((comp) => {
                                const isPopulated = typeof comp !== 'string';
                                if (!isPopulated) return null;

                                return (
                                    <Link
                                        key={comp._id}
                                        href={`/productos/${comp.slug}`}
                                        className="group flex-1 min-w-[160px] max-w-[280px] flex flex-col gap-3 p-3 transition-all border border-border rounded bg-card hover:shadow-lg"
                                    >
                                        <div className="relative aspect-square overflow-hidden bg-white rounded">
                                            <Image
                                                src={comp.imagenes?.[0] || "/logo.png"}
                                                alt={comp.nombre}
                                                fill
                                                className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                                                unoptimized
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <h4 className="text-xs font-medium text-card-foreground leading-tight line-clamp-2 uppercase">
                                                {comp.nombre}
                                            </h4>
                                            <p className="text-sm font-bold text-primary">
                                                S/ {comp.precio.toFixed(2)}
                                            </p>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </section>

            <div className="md:hidden fixed bottom-0 left-0 w-full bg-card p-4 border-t border-border shadow-md z-50">
                <AddProductToCart
                    product={producto}
                    variant={allAttributesSelected ? selectedVariant ?? undefined : undefined}
                />
            </div>
        </>
    );
}