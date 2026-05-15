"use client";

import { useMemo } from "react";
import { useCatalogNav } from "./hooks/useCatalogNav";
import type { CatalogFilters } from "@/src/schemas/catalog";
import { cn } from "@/lib/utils";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import ActiveFiltersSidebar from "./ActiveFiltersSidebar";
import ColorCircle from "../ui/ColorCircle";

interface Props {
    filters: CatalogFilters;
}

export default function CatalogSidebar({ filters }: Props) {
    const {
        setCategory,
        setBrand,
        setLine,
        updateFilter,
        isCategoryActive,
        isBrandActive,
        isLineActive,
        searchParams,
    } = useCatalogNav();

    const sortedFilters = useMemo(() => ({
        categories: [...filters.categories].sort((a, b) => a.nombre.localeCompare(b.nombre)),
        brands: [...filters.brands].sort((a, b) => a.nombre.localeCompare(b.nombre)),
        lines: [...filters.lines].sort((a, b) => a.nombre.localeCompare(b.nombre)),
        atributos: [...filters.atributos]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((attr) => ({
                ...attr,
                values: [...attr.values].sort((a, b) => a.localeCompare(b)),
            })),
    }), [filters]);

    // Estética Apple: Texto muy pequeño, negrita, tracking abierto
    const triggerClass =
        "text-sm font-semibold capitalize text-[var(--color-text-primary)] hover:no-underline py-4 px-0 border-none transition-opacity hover:opacity-60";

    const row =
        "flex items-center gap-3 px-1 py-[6px] group cursor-pointer outline-none transition-all";

    const checkboxClass =
        "w-4 h-4 rounded-[4px] border-[var(--color-border-default)] " +
        "data-[state=checked]:bg-[var(--color-text-primary)] " +
        "data-[state=checked]:border-[var(--color-text-primary)] " +
        "transition-all duration-200";

    return (
        <div className="w-full pb-20 select-none">
            <ActiveFiltersSidebar />

            <Accordion
                type="multiple"
                className="w-full space-y-0"
                defaultValue={["item-categories", "item-brands"]}
            >
                {/* CATEGORÍAS */}
                {sortedFilters.categories.length > 0 && (
                    <AccordionItem value="item-categories" className="border-none">
                        <AccordionTrigger className={triggerClass}>Categorías</AccordionTrigger>
                        <AccordionContent className="pt-0 pb-4">
                            <ul className="space-y-0.5">
                                {sortedFilters.categories.map((cat) => {
                                    const active = isCategoryActive(cat.slug);
                                    return (
                                        <li key={cat.id}>
                                            <button
                                                onClick={() => setCategory(cat.slug)}
                                                className={cn(
                                                    "w-full text-left px-1 py-[5px] text-[13px] transition-all duration-200",
                                                    active
                                                        ? "text-[var(--color-text-primary)] font-bold"
                                                        : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"
                                                )}
                                            >
                                                {cat.nombre}
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                )}

                {/* MARCAS */}
                {sortedFilters.brands.length > 0 && (
                    <AccordionItem value="item-brands" className="border-none">
                        <AccordionTrigger className={triggerClass}>Marcas</AccordionTrigger>
                        <AccordionContent className="pt-0 pb-4">
                            <div className="space-y-0.5 max-h-[260px] overflow-y-auto pr-1 scrollbar-hide">
                                {sortedFilters.brands.map((brand) => {
                                    const active = isBrandActive(brand.slug);
                                    return (
                                        <div key={brand.id} onClick={() => setBrand(brand.slug)} className={row}>
                                            <Checkbox checked={active} className={checkboxClass} />
                                            <span className={cn(
                                                "text-[13px] font-medium transition-colors",
                                                active ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-tertiary)] group-hover:text-[var(--color-text-primary)]"
                                            )}>
                                                {brand.nombre}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                )}

                {/* MODELOS */}
                {sortedFilters.lines.length > 0 && (
                    <AccordionItem value="item-lines" className="border-none">
                        <AccordionTrigger className={triggerClass}>Modelos</AccordionTrigger>
                        <AccordionContent className="pt-0 pb-4">
                            <div className="space-y-0.5 max-h-[260px] overflow-y-auto pr-1 scrollbar-hide">
                                {sortedFilters.lines.map((line) => {
                                    const active = isLineActive(line.slug);
                                    return (
                                        <div key={line.id} onClick={() => setLine(line.slug)} className={row}>
                                            <Checkbox checked={active} className={checkboxClass} />
                                            <span className={cn(
                                                "text-[13px] font-medium transition-colors",
                                                active ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-tertiary)] group-hover:text-[var(--color-text-primary)]"
                                            )}>
                                                {line.nombre}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                )}

                {/* ATRIBUTOS */}
                {sortedFilters.atributos.map((attr, idx) => {
                    const isColorAttr = attr.name.toLowerCase().includes("color");

                    return (
                        <AccordionItem key={idx} value={`attr-${idx}`} className="border-none">
                            <AccordionTrigger className={triggerClass}>{attr.name}</AccordionTrigger>
                            <AccordionContent className="pt-0 pb-4">
                                <div className={cn(
                                    "pr-1 max-h-[260px] overflow-y-auto scrollbar-hide",
                                    isColorAttr ? "grid grid-cols-5 gap-2 pt-2" : "space-y-0.5"
                                )}>
                                    {attr.values.map((val) => {
                                        const isChecked = searchParams.getAll(attr.name).includes(val);

                                        if (isColorAttr) {
                                            return (
                                                <button
                                                    key={val}
                                                    onClick={() => updateFilter(attr.name, val)}
                                                    className={cn(
                                                        "relative flex items-center justify-center p-0.5 rounded-full border transition-all",
                                                        isChecked ? "border-[var(--color-text-primary)] scale-110" : "border-transparent hover:scale-105"
                                                    )}
                                                >
                                                    <ColorCircle color={val} size={16} />
                                                </button>
                                            );
                                        }

                                        return (
                                            <div key={val} onClick={() => updateFilter(attr.name, val)} className={row}>
                                                <Checkbox checked={isChecked} className={checkboxClass} />
                                                <span className={cn(
                                                    "text-[13px] font-medium transition-colors",
                                                    isChecked ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-tertiary)] group-hover:text-[var(--color-text-primary)]"
                                                )}>
                                                    {val}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    );
                })}
            </Accordion>
        </div>
    );
}