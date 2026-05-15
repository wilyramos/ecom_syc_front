"use client";

import { Search, History, Loader2, ArrowRight, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { searchProductsIndex } from "@/actions/product/get-list-products-search";
import type { TProductListSchema } from "@/src/schemas";
import { getSearchHistory, saveSearchTerm } from "@/lib/utils";
import ProductResultSearch from "./home/ProductResultSearch";
import Link from "next/link";
import { Input } from "@/components/ui/input";

interface Props {
    isMobile?: boolean;
    onSearchComplete?: () => void;
}

export default function ButtonSearchFormStore({ isMobile = false, onSearchComplete }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<TProductListSchema[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const formRef = useRef<HTMLFormElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const [history, setHistory] = useState<string[]>([]);
    useEffect(() => setHistory(getSearchHistory()), []);

    const DEFAULT_SUGGESTIONS = ["iphone", "case", "audífonos"];

    const saveHistory = (term: string) => {
        if (!term) return;
        saveSearchTerm(term);
        setHistory(getSearchHistory());
    };

    useEffect(() => {
        setQuery("");
        setResults([]);
        setIsOpen(false);
    }, [pathname]);

    const debouncedSearch = useDebouncedCallback(async (value: string) => {
        const trimmed = value.trim();
        if (!trimmed || trimmed.length < 3) {
            setResults([]);
            return;
        }
        setLoading(true);
        const data = await searchProductsIndex(trimmed);
        setResults(data || []);
        setLoading(false);
        setIsOpen(true);
    }, 400);

    useEffect(() => {
        debouncedSearch(query);
    }, [query, debouncedSearch]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmed = query.trim();
        if (!trimmed) return;

        saveHistory(trimmed);
        setIsOpen(false);
        onSearchComplete?.();

        router.push(`/productos?query=${encodeURIComponent(trimmed)}`);
    };

    /* CLICK OUTSIDE - ONLY DESKTOP */
    useEffect(() => {
        if (isMobile) return;

        const handleClick = (event: MouseEvent) => {
            const target = event.target as Node;

            const insideForm = formRef.current?.contains(target);
            const insideDropdown = dropdownRef.current?.contains(target);

            if (!insideForm && !insideDropdown) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [isMobile]);

    return (
        <>
            <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="relative w-full flex-1 min-w-0"
            >
                <div className="group relative flex items-center w-full">
                    {/* SEARCH ICON */}
                    <div
                        className="
                        absolute left-4 z-10
                        text-[var(--color-text-secondary)]
                        transition-colors duration-200
                        group-focus-within:text-[var(--color-accent)]
                        pointer-events-none
                    "
                    >
                        <Search size={18} strokeWidth={2.2} />
                    </div>

                    {/* INPUT */}
                    <Input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);

                            if (e.target.value.length > 0) {
                                setIsOpen(true);
                            }
                        }}
                        placeholder="Buscar productos..."
                        onFocus={() => setIsOpen(true)}
                        autoFocus={isMobile}
                        className="
                        h-11 w-full
                        rounded-full
                        
                        bg-[var(--color-bg-secondary)]
                        pl-11
                        pr-11
                        text-sm
                        text-[var(--color-text-primary)]
                        placeholder:text-[var(--color-text-tertiary)]
                        transition-all
                        duration-200
                        hover:border-[var(--color-border-default)]
                        hover:bg-[var(--color-bg-tertiary)]
                        focus-visible:ring-0
                        focus-visible:outline-none
                        focus-visible:border-[var(--color-accent)]
                        focus-visible:bg-[var(--color-bg-primary)]
                        disabled:opacity-50
                    "
                    />

                    {/* RIGHT SIDE */}
                    <div className="absolute right-3 flex items-center gap-2">
                        {/* LOADING */}
                        {loading && (
                            <Loader2
                                size={16}
                                className="
                                animate-spin
                                text-[var(--color-text-inverse)]
                            "
                            />
                        )}

                        {/* CLEAR */}
                        {query && !loading && (
                            <button
                                type="button"
                                onClick={() => {
                                    setQuery("");
                                    setResults([]);
                                    inputRef.current?.focus();
                                }}
                                className="
                                flex items-center justify-center
                                h-7 w-7
                                rounded-full
                                text-[var(--color-text-secondary)]
                                hover:bg-[var(--color-surface-hover)]
                                hover:text-[var(--color-text-primary)]
                                transition-all duration-200
                            "
                            >
                                <X size={14} strokeWidth={2.5} />
                            </button>
                        )}
                    </div>
                </div>
            </form>

            {/* DROPDOWN */}
            {isOpen && (
                <div
                    ref={dropdownRef}
                    className={`
                        bg-[var(--color-bg-secondary)] border-b border-[var(--color-border-subtle)] z-[1000000] overflow-hidden 
                        ${isMobile
                            ? "absolute top-[calc(100%+1px)] left-0 w-full h-[calc(100vh-300px)]"
                            : "absolute top-full left-0 w-full max-h-[calc(100vh-200px)]"
                        }
                    `}
                >
                    <div
                        className={`
                            h-full overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--color-border-default)] scrollbar-track-transparent 
                            ${isMobile ? "p-4" : "p-4 max-w-7xl mx-auto"}
                        `}
                    >
                        {/* LOADING */}
                        {loading && (
                            <div className="flex flex-col items-center justify-center py-8 text-[var(--color-text-secondary)]">
                                <Loader2 className="animate-spin mb-2" size={24} />
                                <span className="text-xs font-medium">Buscando...</span>
                            </div>
                        )}

                        {/* HISTORIAL / SUGERENCIAS */}
                        {!loading && !query && (
                            <div>
                                <h4 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase mb-3 flex items-center gap-2">
                                    <History size={14} /> {history.length > 0 ? "Recientes" : "Sugerencias"}
                                </h4>

                                <div className="flex flex-wrap gap-2">
                                    {(history.length > 0 ? history : DEFAULT_SUGGESTIONS).map((term, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick={() => {
                                                setQuery(term);
                                                inputRef.current?.focus();
                                            }}
                                            className="px-3 py-1.5 bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-surface-hover)] rounded-xl text-xs text-[var(--color-text-primary)] transition-colors"
                                        >
                                            {term}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* RESULTADOS */}
                        {!loading && results.length > 0 && (
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-sm text-[var(--color-text-primary)]">Resultados</h3>

                                    <Link
                                        href={`/productos?query=${encodeURIComponent(query)}`}
                                        onClick={() => {
                                            saveHistory(query.trim());
                                            onSearchComplete?.();
                                        }}
                                        className="flex items-center gap-1 text-xs text-[var(--color-accent)] font-semibold hover:text-[var(--color-accent-hover)] hover:underline transition-colors"
                                    >
                                        Ver todos <ArrowRight size={12} />
                                    </Link>
                                </div>

                                {/* GRID - Mejorado para móviles */}
                                <div className={`
                                    grid gap-3 
                                    ${isMobile ? "grid-cols-2" : "grid-cols-4 md:grid-cols-6"}
                                `}>
                                    {results.slice(0, isMobile ? 8 : 6).map((item) => (
                                        <ProductResultSearch key={item._id} item={item} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* SIN RESULTADOS */}
                        {!loading && query && results.length === 0 && (
                            <div className="text-center py-8 text-[var(--color-text-secondary)]">
                                <Search size={22} className="mx-auto mb-3 opacity-50" />
                                <p className="text-sm font-medium text-[var(--color-text-primary)]">
                                    Sin resultados para <span className="italic">{query}</span>
                                </p>
                                <p className="text-xs text-[var(--color-text-tertiary)]">
                                    Intenta con otra palabra clave.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}