"use client";

import { useCatalogNav } from "./hooks/useCatalogNav";
import { X, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ActiveFiltersSidebar() {
    const {
        currentSlugs,
        searchParams,
        setCategory,
        setBrand,
        setLine,
        updateFilter,
        clearFilters,
        hasFilters,
    } = useCatalogNav();

    if (!hasFilters) return null;

    return (
        <div className="mb-8 animate-in fade-in slide-in-from-top-2 duration-500">
            <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-text-tertiary)]">
                    Filtros Activos
                </span>

                <button
                    onClick={clearFilters}
                    className="flex items-center gap-1.5 text-[11px] font-bold text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors duration-200 group"
                >
                    <RotateCcw className="w-3 h-3 transition-transform group-hover:-rotate-45" />
                    Limpiar
                </button>
            </div>

            <div className="flex flex-wrap gap-2">
                {currentSlugs.map((slug) => (
                    <Chip
                        key={slug}
                        label={slug.replace(/-/g, " ")}
                        onRemove={() => {
                            setCategory(slug);
                            setBrand(slug);
                            setLine(slug);
                        }}
                    />
                ))}

                {Array.from(searchParams.entries()).map(([key, value]) => {
                    if (["page", "limit", "sort"].includes(key)) return null;

                    let label = value;
                    if (key === "priceRange") label = `S/ ${value.replace("-", " – S/ ")}`;
                    if (key === "query") label = `"${value}"`;

                    return (
                        <Chip
                            key={`${key}-${value}`}
                            label={label}
                            onRemove={() => updateFilter(key, value)}
                        />
                    );
                })}
            </div>

            <div className="mt-6 border-b border-[var(--color-border-subtle)]" />
        </div>
    );
}

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
    return (
        <button
            onClick={onRemove}
            className={cn(
                "group inline-flex items-center gap-2 pl-3 pr-2 py-1.5",
                "bg-[var(--color-bg-secondary)] border border-transparent",
                "rounded-full transition-all duration-200",
                "hover:bg-[var(--color-border-subtle)] hover:border-[var(--color-border-default)]"
            )}
        >
            <span className="text-[12px] font-medium text-[var(--color-text-primary)] capitalize leading-none tracking-tight">
                {label}
            </span>
            <div className="flex items-center justify-center w-4 h-4 rounded-full bg-[var(--color-text-tertiary)]/10 group-hover:bg-[var(--color-text-primary)] group-hover:text-white transition-all">
                <X className="w-2.5 h-2.5" strokeWidth={3} />
            </div>
        </button>
    );
}