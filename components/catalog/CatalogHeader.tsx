// File: src/components/catalog/CatalogHeader.tsx
"use client";

import Link from "next/link";
import { ChevronRight, ArrowUpDown } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useCatalogNav } from "./hooks/useCatalogNav";
import { cn } from "@/lib/utils";

export type TitlePart = {
    text: string;
    italic?: boolean;
};

interface Props {
    title: TitlePart[];
    totalProducts: number;
    breadcrumbs: { label: string; href: string }[];
}

export default function CatalogHeader({ title, breadcrumbs }: Props) {
    const { updateFilter, searchParams } = useCatalogNav();
    const currentSort = searchParams.get("sort") || "recientes";

    return (
        <div className="w-full flex flex-col gap-6 py-6 border-b border-[var(--color-border-subtle)]">

            {/* Breadcrumbs - Estilo sutil y minimalista */}
            <nav aria-label="Breadcrumb" className="px-1">
                <ol className="flex items-center flex-wrap gap-x-2 text-[13px] font-medium text-[var(--color-text-tertiary)]">
                    {breadcrumbs.map((crumb, index) => {
                        const isLast = index === breadcrumbs.length - 1;
                        return (
                            <li key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                                {isLast ? (
                                    <span className="text-[var(--color-text-primary)] truncate max-w-[200px]" aria-current="page">
                                        {crumb.label}
                                    </span>
                                ) : (
                                    <>
                                        <Link
                                            href={crumb.href}
                                            className="hover:text-[var(--color-text-primary)] transition-colors duration-200"
                                        >
                                            {crumb.label}
                                        </Link>
                                        <ChevronRight size={12} strokeWidth={3} className="opacity-30" />
                                    </>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>

            {/* Header Principal */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-1">
                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-[var(--color-text-primary)] leading-none">
                        {title.map((part, i) => (
                            <span
                                key={i}
                                className={cn(
                                    part.italic ? "font-light text-[var(--color-text-tertiary)]" : ""
                                )}
                            >
                                {part.text}{" "}
                            </span>
                        ))}
                    </h1>

                  
                </div>

                {/* Sorting - Estilo Input de Sistema (Apple Style) */}
                <div className="hidden md:flex items-center">
                    <div className="group relative flex items-center">
                        <div className="absolute left-3.5 z-10 pointer-events-none">
                            <ArrowUpDown className="w-3.5 h-3.5 text-[var(--color-text-tertiary)]" />
                        </div>

                        <Select
                            value={currentSort}
                            onValueChange={(val) => updateFilter("sort", val)}
                        >
                            <SelectTrigger className="w-[220px] h-10 pl-10 pr-4 rounded-xl border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)]/50 text-[13px] font-semibold text-[var(--color-text-primary)] transition-all hover:bg-[var(--color-bg-secondary)] focus:ring-2 focus:ring-black/5">
                                <div className="flex gap-2">
                                    <SelectValue />
                                </div>
                            </SelectTrigger>

                            <SelectContent
                                align="end"
                                className="bg-[var(--color-bg-primary)]/80 backdrop-blur-xl border-[var(--color-border-subtle)] rounded-xl p-1 shadow-2xl shadow-black/5"
                            >
                                <SelectItem value="relevancia" className="rounded-lg text-[13px]">Relevancia</SelectItem>
                                <SelectItem value="recientes" className="rounded-lg text-[13px]">Más Recientes</SelectItem>
                                <SelectItem value="price-asc" className="rounded-lg text-[13px]">Precio: Menor a Mayor</SelectItem>
                                <SelectItem value="price-desc" className="rounded-lg text-[13px]">Precio: Mayor a Menor</SelectItem>
                                <SelectItem value="name-asc" className="rounded-lg text-[13px]">Nombre: A - Z</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    );
}