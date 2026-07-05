"use client";

import { useState, useEffect, useMemo } from 'react';
import AddProductToCart from './AddProductToCart';
import ImagenesProductoCarousel from './ImagenesProductoCarousel';
import type { ProductWithCategoryResponse, TApiVariant } from '@/src/schemas';
import ShopNowButton from './ShopNowButton';
// import ProductExpandableSections from './ProductExpandableSections';
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
        <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-12 py-6 md:py-10 bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
            {/* El contenedor principal de las columnas */}
            <article className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-start relative">

                {/* Columna Izquierda: Galería Sticky */}
                <div className="md:col-span-6 w-full md:sticky md:top-32">
                    <ImagenesProductoCarousel images={variantImages} />
                </div>

                {/* Columna Derecha: Detalles de Compra Sticky (Viceversa) */}
                <section className="md:col-span-6 w-full space-y-6 md:sticky md:top-32">
                    <div className="border-b border-[var(--color-border-subtle)] pb-5 space-y-3">
                        {/* Breadcrumb / SKU */}
                        <div className="flex items-center justify-between gap-4 text-xs font-medium text-[var(--color-text-secondary)] tracking-wide uppercase">
                            <div className="flex items-center gap-1.5 flex-wrap">
                                {producto.brand && (
                                    <Link href={`/catalogo/${producto.brand.slug}`} className="hover:text-[var(--color-text-primary)] transition-colors">
                                        {producto.brand.nombre}
                                    </Link>
                                )}
                                {producto.brand && producto.line && <span className="text-[var(--color-text-tertiary)]">/</span>}
                                {producto.line && typeof producto.line === 'object' && (
                                    <Link href={`/catalogo/${producto.line.slug}`} className="hover:text-[var(--color-text-primary)] transition-colors">
                                        {producto.line.nombre}
                                    </Link>
                                )}
                            </div>
                            {(selectedVariant?.sku || producto.sku) && (
                                <span className="text-[11px] lowercase first-letter:uppercase tracking-normal text-[var(--color-text-tertiary)]">
                                    SKU: {selectedVariant?.sku || producto.sku}
                                </span>
                            )}
                        </div>

                        {/* Nombre del Producto */}
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--color-text-primary)] leading-tight">
                            {producto.nombre}
                        </h1>

                        {/* Color Estático sin variantes */}
                        {!producto.variants?.length && colorAtributo && (
                            <div className="flex items-center gap-2 pt-1">
                                <span className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">Color:</span>
                                <div className="flex items-center gap-1.5">
                                    {(Array.isArray(colorAtributo) ? colorAtributo : [colorAtributo]).map((c) => (
                                        <ColorCircle key={c} color={c} size={20} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Precios */}
                        <div className="flex items-center gap-3.5 pt-2 flex-wrap">
                            <div className="flex items-baseline gap-0.5 text-[var(--color-text-primary)]">
                                <span className="text-base font-semibold">S/</span>
                                <span className="text-2xl md:text-3xl font-bold tracking-tight">
                                    {precio.toFixed(2)}
                                </span>
                            </div>
                            {hasDiscount && (
                                <div className="flex items-center gap-2">
                                    <span className="text-base text-[var(--color-text-tertiary)] line-through">
                                        S/ {precioComparativo!.toFixed(2)}
                                    </span>
                                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[var(--color-error-light)] text-[var(--color-error)] border border-[var(--color-border-subtle)]">
                                        −{Math.round(((precioComparativo! - precio) / precioComparativo!) * 100)}%
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Badge Estado Stock */}
                        {stock === 0 && (
                            <div className="pt-1">
                                <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[var(--color-error)] bg-[var(--color-error-light)] border border-[var(--color-border-subtle)] px-2.5 py-1 rounded-md">
                                    Agotado
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Atributos Dinámicos */}
                    <div className="space-y-5">
                        {Object.entries(allAttributes).map(([key]) => {
                            const availableValues = getAvailableValues(key);
                            const isColor = key.toLowerCase() === "color";
                            const useDropdown = !isColor && availableValues.length > MAX_VISIBLE_OPTIONS;

                            return (
                                <fieldset key={key} className="space-y-2.5">
                                    <legend className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                                        {key}:
                                    </legend>

                                    {isColor ? (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
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
                                                            "relative flex items-center justify-start gap-2.5 p-2 rounded-xl border w-full text-left transition-all duration-200 bg-[var(--color-bg-primary)]",
                                                            selected ? "border-[var(--color-accent)] ring-1 ring-[var(--color-accent)] font-semibold" : "border-[var(--color-border-default)] hover:bg-[var(--color-bg-secondary)]",
                                                            outOfStock && "opacity-40 cursor-not-allowed"
                                                        )}
                                                    >
                                                        <div className={cn("relative w-7 h-7 overflow-hidden rounded-full border border-[var(--color-border-subtle)] flex-shrink-0", outOfStock && "grayscale")}>
                                                            {variantForValue?.imagenes?.[0] ? (
                                                                <Image src={variantForValue.imagenes[0]} alt={val} fill className="object-cover" quality={30} unoptimized />
                                                            ) : (
                                                                <ColorCircle color={val} size={28} />
                                                            )}
                                                            {outOfStock && (
                                                                <span className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                                                                    <div className="w-[120%] border-t border-[var(--color-error)] -rotate-45" />
                                                                </span>
                                                            )}
                                                        </div>
                                                        <span className={cn("text-xs truncate capitalize", selected ? "text-[var(--color-accent)] font-semibold" : "text-[var(--color-text-primary)]")}>
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
                                            <SelectTrigger className="w-full max-w-xs border-[var(--color-border-default)] bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] rounded-xl h-10">
                                                <SelectValue placeholder={`Seleccionar ${key}`} />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] border-[var(--color-border-default)]">
                                                {availableValues.map((val) => {
                                                    const outOfStock = isOptionOutOfStock(key, val);
                                                    return (
                                                        <SelectItem
                                                            key={val}
                                                            value={val}
                                                            disabled={outOfStock}
                                                            className={cn(
                                                                "cursor-pointer focus:bg-[var(--color-bg-secondary)] focus:text-[var(--color-text-primary)]",
                                                                outOfStock && "opacity-40 line-through"
                                                            )}
                                                        >
                                                            {val}
                                                        </SelectItem>
                                                    );
                                                })}
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        <div className="flex flex-wrap gap-2">
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
                                                            "h-10 px-4 relative overflow-hidden transition-all border text-xs font-medium rounded-xl min-w-[56px]",
                                                            selected ? "border-[var(--color-accent)] bg-[var(--color-accent-light)] text-[var(--color-accent)] font-bold" : "border-[var(--color-border-default)] bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)]",
                                                            outOfStock && "opacity-40 text-[var(--color-text-tertiary)] bg-[var(--color-bg-secondary)] cursor-not-allowed line-through"
                                                        )}
                                                    >
                                                        <span>{val}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </fieldset>
                            );
                        })}
                    </div>

                    {/* Botoneras Principales */}
                    <section className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4">
                        <div className="hidden md:block flex-1 w-full">
                            <AddProductToCart
                                product={producto}
                                variant={selectedVariant ?? undefined}
                            />
                        </div>
                        <div className="flex-1 w-full">
                            <ShopNowButton
                                disabled={((producto.variants?.length ?? 0) > 0 && (!allAttributesSelected || !selectedVariant)) || stock <= 0}
                                product={producto}
                                variant={selectedVariant ?? undefined}
                            />
                        </div>
                    </section>

                    {/* Enlaces de soporte */}
                    <div className="pt-2">
                        <a
                            href={`https://wa.me/51972416683?text=Hola%2C%20consulto%20desde%20la%20web%20por%3A%20${encodeURIComponent(producto.nombre)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-between py-3.5 border-t border-[var(--color-border-subtle)] hover:opacity-80 transition-all group text-sm font-medium"
                        >
                            <span className="text-[var(--color-text-primary)]">¿Tienes dudas?</span>
                            <span className="text-xs font-bold text-[var(--color-accent)] flex items-center gap-0.5">
                                Consúltanos por WhatsApp
                                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                            </span>
                        </a>

                        <ProductExpandableSectionsInfo producto={producto} />
                    </div>
                </section>
            </article>

            {/* Acordeones de Detalles Extendidos */}
            <div className="mt-12 md:mt-16">
                {/* <ProductExpandableSections producto={producto} /> */}
            </div>

            {/* Productos Complementarios */}
            {producto.complementarios && producto.complementarios.length > 0 && (
                <section className="mt-16 border-t border-[var(--color-border-subtle)] pt-10 space-y-6">
                    <h3 className="text-xl font-bold tracking-tight text-[var(--color-text-primary)]">
                        Completa tu compra:
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {producto.complementarios.map((comp) => {
                            if (typeof comp === 'string') return null;

                            return (
                                <Link
                                    key={comp._id}
                                    href={`/productos/${comp.slug}`}
                                    className="group flex flex-col gap-3 p-3.5 border border-[var(--color-border-subtle)] rounded-2xl bg-[var(--color-bg-primary)] transition-all duration-300 hover:shadow-sm hover:border-[var(--color-border-strong)]"
                                >
                                    <div className="relative aspect-square w-full overflow-hidden bg-white rounded-xl border border-[var(--color-border-subtle)]">
                                        <Image
                                            src={comp.imagenes?.[0] || "/logo.png"}
                                            alt={comp.nombre}
                                            fill
                                            className="object-contain p-3 transition-transform duration-500 group-hover:scale-103"
                                            unoptimized
                                        />
                                    </div>

                                    <div className="space-y-1 mt-1">
                                        <h4 className="text-xs font-semibold text-[var(--color-text-secondary)] leading-tight line-clamp-2 uppercase tracking-wide">
                                            {comp.nombre}
                                        </h4>
                                        <p className="text-sm font-bold text-[var(--color-text-primary)]">
                                            S/ {comp.precio.toFixed(2)}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* Carrito Móvil Sticky Inferior */}
            <div className="md:hidden fixed bottom-0 left-0 w-full bg-[var(--color-bg-primary)] p-4 border-t border-[var(--color-border-subtle)] shadow-[0_-4px_12px_rgba(0,0,0,0.02)] z-50">
                <AddProductToCart
                    product={producto}
                    variant={allAttributesSelected ? selectedVariant ?? undefined : undefined}
                />
            </div>
        </div>
    );
}