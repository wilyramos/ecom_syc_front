// File: src/components/admin/slider/SliderFilters.tsx
"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Select, SelectTrigger, SelectValue,
    SelectContent, SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Filters {
    search?: string;
    isActive?: string;
    contentType?: string;
}

interface SliderFiltersProps {
    filters: Filters;
}

export default function SliderFilters({ filters }: SliderFiltersProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const [searchValue, setSearchValue] = useState(filters.search ?? "");

    const setParam = useCallback(
        (key: string, value: string | undefined) => {
            const params = new URLSearchParams(searchParams.toString());
            if (!value) {
                params.delete(key);
            } else {
                params.set(key, value);
            }
            params.set("page", "1");
            startTransition(() => {
                router.push(`${pathname}?${params.toString()}`);
            });
        },
        [pathname, router, searchParams],
    );

    const debouncedSearch = useDebouncedCallback(
        (value: string) => setParam("search", value.trim() || undefined),
        400,
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        debouncedSearch(e.target.value);
    };

    const handleSearchClear = () => {
        setSearchValue("");
        debouncedSearch.cancel();
        setParam("search", undefined);
    };

    return (
        <div 
            className={cn(
                "flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full p-4 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] transition-all duration-200",
                isPending && "opacity-60 pointer-events-none"
            )}
        >
            {/* Búsqueda */}
            <div className="relative flex-1 min-w-0 sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-text-tertiary)] pointer-events-none" />
                <Input
                    type="text"
                    placeholder="Buscar banner..."
                    value={searchValue}
                    onChange={handleSearchChange}
                    className="pl-9 pr-8 h-9 text-sm bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] border-[var(--color-border-default)] placeholder:[var(--color-text-tertiary)] focus:border-[var(--color-bg-inverse)]"
                />
                {searchValue && (
                    <button
                        onClick={handleSearchClear}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors p-0.5 rounded"
                        aria-label="Limpiar búsqueda"
                    >
                        <X className="h-3.5 w-3.5" />
                    </button>
                )}
            </div>

            {/* Estado */}
            <Select
                value={filters.isActive ?? "all"}
                onValueChange={(v) => setParam("isActive", v === "all" ? undefined : v)}
            >
                <SelectTrigger className="w-full sm:w-40 h-9 text-sm bg-[var(--color-bg-primary)] border-[var(--color-border-default)] text-[var(--color-text-primary)]">
                    <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent className="bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] border-[var(--color-border-default)]">
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="true">Activos</SelectItem>
                    <SelectItem value="false">Inactivos</SelectItem>
                </SelectContent>
            </Select>

            {/* Tipo de contenido */}
            <Select
                value={filters.contentType ?? "all"}
                onValueChange={(v) => setParam("contentType", v === "all" ? undefined : v)}
            >
                <SelectTrigger className="w-full sm:w-44 h-9 text-sm bg-[var(--color-bg-primary)] border-[var(--color-border-default)] text-[var(--color-text-primary)]">
                    <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent className="bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] border-[var(--color-border-default)]">
                    <SelectItem value="all">Todos los tipos</SelectItem>
                    <SelectItem value="product">Producto</SelectItem>
                    <SelectItem value="brand">Marca</SelectItem>
                    <SelectItem value="category">Categoría</SelectItem>
                    <SelectItem value="campaign">Campaña</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}