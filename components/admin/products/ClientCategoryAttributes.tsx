"use client";

import { useState, useEffect } from "react";
import { Settings2, Tag } from "lucide-react";
import type { CategoryListResponse } from "@/src/schemas/category.schema";

// UI Components (Shadcn/Radix)
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LabelWithTooltip } from "@/components/utils/LabelWithTooltip";

type Props = {
    categorias: CategoryListResponse;
    initialCategoryId?: string;
    currentAttributes?: Record<string, string>;
    onCategoryChange?: (categoryId: string) => void;
};

export default function ClientCategoryAttributes({
    categorias,
    initialCategoryId,
    currentAttributes,
    onCategoryChange,
}: Props) {
    const [selectedCategoryId, setSelectedCategoryId] = useState(initialCategoryId || "");
    const [categoryDefinitions, setCategoryDefinitions] = useState<{ name: string; values: string[] }[]>([]);
    const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>(currentAttributes || {});
    const [isOpen, setIsOpen] = useState(false);

    const handleCategorySelect = (id: string) => {
        setSelectedCategoryId(id);
        if (onCategoryChange) onCategoryChange(id);
    };

    useEffect(() => {
        const selected = categorias.find((cat) => cat._id === selectedCategoryId);
        if (!selected) {
            setCategoryDefinitions([]);
            return;
        }
        const validDefinitions = selected.attributes || [];
        setCategoryDefinitions(validDefinitions);

        setSelectedAttributes((prev) => {
            const merged = { ...prev };
            if (currentAttributes) {
                validDefinitions.forEach((def) => {
                    if (prev[def.name] === undefined && currentAttributes[def.name]) {
                        merged[def.name] = currentAttributes[def.name];
                    }
                });
            }
            return merged;
        });
    }, [selectedCategoryId, categorias, currentAttributes]);

    const handleAttributeChange = (name: string, value: string) => {
        setSelectedAttributes((prev) => {
            const updated = { ...prev };
            if (value === "_none") delete updated[name];
            else updated[name] = value;
            return updated;
        });
    };

    const selectedCategory = categorias.find((c) => c._id === selectedCategoryId);
    const activeEntries = Object.entries(selectedAttributes).filter(([key]) =>
        categoryDefinitions.some(def => def.name === key)
    );

    const validAtributosJSON = JSON.stringify(Object.fromEntries(activeEntries));

    return (
        <div className="space-y-4 p-5 border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] rounded-lg">

            {/* --- SELECCIÓN DE CATEGORÍA --- */}
            <div className="space-y-1.5">
                <LabelWithTooltip
                    htmlFor="categoria"
                    label="Categoría"
                    required
                    tooltip="La categoría principal define las propiedades y variantes del producto."
                />

                <input type="hidden" name="categoria" value={selectedCategoryId} />
                <input type="hidden" name="atributos" value={validAtributosJSON} />

                <Select value={selectedCategoryId} onValueChange={handleCategorySelect}>
                    <SelectTrigger className="h-10 w-full text-sm bg-[var(--color-bg-primary)] border-[var(--color-border-default)] text-[var(--color-text-primary)]">
                        <SelectValue placeholder="Seleccionar categoría..." />
                    </SelectTrigger>
                    <SelectContent className="bg-[var(--color-bg-primary)] border-[var(--color-border-default)]">
                        {categorias.map((cat) => (
                            <SelectItem
                                key={cat._id}
                                value={cat._id}
                                className="text-sm focus:bg-[var(--color-surface-hover)] focus:text-[var(--color-text-primary)] cursor-pointer"
                            >
                                {cat.nombre}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* --- VISTA PREVIA Y ACCIÓN --- */}
            {selectedCategoryId && categoryDefinitions.length > 0 && (
                <div className="pt-4 border-t border-[var(--color-border-default)] space-y-3">

                    <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                            Atributos Seleccionados
                        </span>

                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogTrigger asChild>
                                <button
                                    type="button"
                                    className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-accent-hover)] hover:text-[var(--color-accent)] transition-colors cursor-pointer"
                                >
                                    <Settings2 className="w-3.5 h-3.5" />
                                    <span>Configurar</span>
                                </button>
                            </DialogTrigger>

                            <DialogContent className="sm:max-w-xl bg-[var(--color-bg-primary)] border-[var(--color-border-default)]">
                                <DialogHeader>
                                    <DialogTitle className="text-base font-bold text-[var(--color-text-primary)]">
                                        Atributos de: {selectedCategory?.nombre}
                                    </DialogTitle>
                                </DialogHeader>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-4">
                                    {categoryDefinitions.map((attr) => (
                                        <div key={attr.name} className="space-y-1.5">
                                            <LabelWithTooltip
                                                htmlFor={attr.name}
                                                label={attr.name}
                                                tooltip={`Atributo dinámico específico de la categoría ${selectedCategory?.nombre}`}
                                            />
                                            <Select
                                                value={selectedAttributes[attr.name] || "_none"}
                                                onValueChange={(val) => handleAttributeChange(attr.name, val)}
                                            >
                                                <SelectTrigger className="h-10 text-sm bg-[var(--color-bg-secondary)] border-[var(--color-border-default)] text-[var(--color-text-primary)]">
                                                    <SelectValue placeholder="No definido" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-[var(--color-bg-primary)] border-[var(--color-border-default)]">
                                                    <SelectItem value="_none" className="italic text-sm text-[var(--color-text-tertiary)]">
                                                        Sin especificar
                                                    </SelectItem>
                                                    {attr.values.map((val) => (
                                                        <SelectItem key={val} value={val} className="text-sm">{val}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    ))}
                                </div>

                                <DialogFooter>
                                    <Button
                                        variant="default"
                                        className="w-full"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Guardar Atributos
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* --- RESUMEN VISIBLE --- */}
                    <div className="flex flex-wrap gap-2">
                        {activeEntries.length > 0 ? (
                            activeEntries.map(([key, value]) => (
                                <div
                                    key={key}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[var(--color-bg-secondary)] border border-[var(--color-border-default)] text-[var(--color-text-primary)] text-xs font-medium shadow-sm"
                                >
                                    <Tag className="w-3 h-3 text-[var(--color-text-tertiary)]" />
                                    <span className="text-[var(--color-text-secondary)]">{key}:</span>
                                    <span className="font-semibold">{value}</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-xs italic text-[var(--color-text-tertiary)] py-1">
                                No se han configurado atributos específicos todavía.
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}