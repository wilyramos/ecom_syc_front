"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Plus, X, Package, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LabelWithTooltip } from "@/components/utils/LabelWithTooltip";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface SelectedProduct {
    _id: string;
    nombre: string;
    precio: number;
    imagenes?: string[];
}

interface Props {
    initialItems?: (SelectedProduct | string)[];
}

export default function ComplementaryProductsSection({ initialItems = [] }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [loadingInitial, setLoadingInitial] = useState(false);
    const [searchResults, setSearchResults] = useState<SelectedProduct[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);

    useEffect(() => {
        const hydrate = async () => {
            const idsToFetch = initialItems.filter(item => typeof item === 'string') as string[];
            const alreadyPopulated = initialItems.filter(item => typeof item !== 'string') as SelectedProduct[];

            if (idsToFetch.length === 0) {
                setSelectedProducts(alreadyPopulated);
                return;
            }

            setLoadingInitial(true);
            try {
                const res = await fetch("/api/products/batch", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ids: idsToFetch })
                });
                if (!res.ok) throw new Error("Hydration failed");
                const fetched: SelectedProduct[] = await res.json();
                setSelectedProducts([...alreadyPopulated, ...fetched]);
            } catch (error) {
                console.error("Error hydrating complementary products:", error);
                setSelectedProducts(alreadyPopulated);
            } finally {
                setLoadingInitial(false);
            }
        };
        hydrate();
    }, [initialItems]);

    const handleSearch = useCallback(async (query: string) => {
        if (query.trim().length < 2) {
            setSearchResults([]);
            return;
        }
        setLoadingSearch(true);
        try {
            const res = await fetch(`/api/products/search?q=${encodeURIComponent(query)}`);
            const data = await res.json();
            setSearchResults(Array.isArray(data) ? data : (data.products || []));
        } catch (error) {
            console.error("Search error:", error);
            setSearchResults([]);
        } finally {
            setLoadingSearch(false);
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm) handleSearch(searchTerm);
        }, 400);
        return () => clearTimeout(timer);
    }, [searchTerm, handleSearch]);

    const toggleProduct = (product: SelectedProduct) => {
        const isSelected = selectedProducts.some(p => p._id === product._id);
        setSelectedProducts(prev => 
            isSelected ? prev.filter(p => p._id !== product._id) : [...prev, product]
        );
    };

    return (
        <div className="space-y-4 p-6 border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] rounded-lg h-full">
            <div className="flex items-center justify-between gap-2 border-b border-[var(--color-border-default)] pb-4">
                <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-[var(--color-text-secondary)]" />
                    <LabelWithTooltip 
                        label="Productos Complementarios" 
                        tooltip="Selecciona productos que se mostrarán como recomendaciones (Cross-selling) en la página de este producto."
                        htmlFor="Complementarios"
                    />
                </div>

                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 font-bold uppercase tracking-wider">
                            <Plus className="w-3.5 h-3.5" /> Vincular
                        </Button>
                    </DialogTrigger>
                    
                    <DialogContent className="max-w-2xl p-0 overflow-hidden border-[var(--color-border-default)] bg-[var(--color-bg-primary)]">
                        <DialogHeader className="p-6 pb-4 bg-[var(--color-bg-secondary)] border-b border-[var(--color-border-default)]">
                            <DialogTitle className="text-base font-bold text-[var(--color-text-primary)]">
                                Catálogo de Productos
                            </DialogTitle>
                            <div className="relative mt-4">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-tertiary)]" />
                                <Input 
                                    placeholder="Buscar por nombre o SKU..." 
                                    className="h-10 pl-10 bg-[var(--color-bg-primary)] border-[var(--color-border-strong)] text-sm focus:border-[var(--color-bg-inverse)]"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </DialogHeader>

                        <div className="h-[50vh] overflow-y-auto px-2 py-4 space-y-1">
                            {loadingSearch ? (
                                <div className="h-full flex flex-col items-center justify-center">
                                    <Loader2 className="animate-spin w-6 h-6 text-[var(--color-text-tertiary)]" />
                                </div>
                            ) : searchResults.length > 0 ? (
                                searchResults.map((p) => {
                                    const isSelected = selectedProducts.some(sel => sel._id === p._id);
                                    return (
                                        <div 
                                            key={p._id} 
                                            onClick={() => toggleProduct(p)}
                                            className={cn(
                                                "flex items-center gap-4 p-3 rounded-md transition-colors cursor-pointer border-b border-[var(--color-border-subtle)] last:border-0",
                                                isSelected ? "bg-[var(--color-accent-light)] border-[var(--color-accent)]/20" : "hover:bg-[var(--color-bg-secondary)]"
                                            )}
                                        >
                                            <div className="relative w-10 h-10 bg-white border border-[var(--color-border-default)] rounded overflow-hidden flex-shrink-0">
                                                <Image src={p.imagenes?.[0] || "/placeholder.png"} alt={p.nombre} fill className="object-contain p-1" unoptimized />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-bold text-[var(--color-text-primary)] truncate uppercase">{p.nombre}</p>
                                                <p className="text-[10px] text-[var(--color-text-tertiary)] font-semibold">S/ {p.precio.toFixed(2)}</p>
                                            </div>
                                            {isSelected ? (
                                                <CheckCircle2 className="w-5 h-5 text-[var(--color-text-tertiary)]" />
                                            ) : (
                                                <Plus className="w-5 h-5 text-[var(--color-text-tertiary)] opacity-30" />
                                            )}
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-xs text-[var(--color-text-tertiary)] italic">
                                    {searchTerm.length >= 2 ? "No se encontraron coincidencias" : "Ingresa al menos 2 caracteres para buscar"}
                                </div>
                            )}
                        </div>

                        <div className="p-4 border-t border-[var(--color-border-default)] flex items-center justify-between bg-[var(--color-bg-secondary)]/50">
                            <span className="text-[10px] font-bold text-[var(--color-text-secondary)] uppercase">
                                {selectedProducts.length} seleccionados
                            </span>
                            <Button onClick={() => setIsModalOpen(false)} size="sm" variant="default" className="px-8 font-bold text-[10px] uppercase">Listo</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 gap-2 pt-2">
                {loadingInitial ? (
                    <div className="py-8 flex flex-col items-center justify-center">
                        <Loader2 className="animate-spin w-5 h-5 text-[var(--color-text-tertiary)]" />
                    </div>
                ) : selectedProducts.length > 0 ? (
                    selectedProducts.map((p) => (
                        <div key={`sel-${p._id}`} className="group relative flex items-center gap-3 p-2 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] hover:border-[var(--color-border-strong)] transition-all">
                            <div className="relative w-9 h-9 bg-white border border-[var(--color-border-subtle)] rounded overflow-hidden shrink-0">
                                <Image src={p.imagenes?.[0] || "/placeholder.png"} alt={p.nombre} fill className="object-contain p-1" unoptimized />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[11px] font-bold text-[var(--color-text-primary)] truncate uppercase leading-tight">{p.nombre}</p>
                                <p className="text-[10px] text-[var(--color-text-tertiary)] font-medium">S/ {p.precio.toFixed(2)}</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedProducts(prev => prev.filter(i => i._id !== p._id))}
                                className="p-1.5 rounded-md text-[var(--color-text-tertiary)] hover:text-[var(--color-error)] hover:bg-[var(--color-error-light)] transition-all opacity-0 group-hover:opacity-100"
                            >
                                <X className="w-4 h-4" />
                            </button>
                            <input type="hidden" name="complementarios" value={p._id} />
                        </div>
                    ))
                ) : (
                    <div className="py-10 border-2 border-dashed border-[var(--color-border-default)] rounded-lg flex flex-col items-center justify-center bg-[var(--color-bg-secondary)]/30">
                        <AlertCircle className="w-5 h-5 mb-2 text-[var(--color-text-tertiary)] opacity-30" />
                        <span className="text-[10px] font-bold text-[var(--color-text-tertiary)] uppercase tracking-widest">Sin productos vinculados</span>
                    </div>
                )}
            </div>
        </div>
    );
}