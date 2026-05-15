"use client";

import { useState, useMemo } from "react";
import type { TApiVariant, ProductWithCategoryResponse } from "@/src/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { Trash2, Plus, AlertCircle, ArrowUpDown, ImageIcon } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { LabelWithTooltip } from "@/components/utils/LabelWithTooltip";
import Image from "next/image";
import MediaLibraryDialog from "./MediaLibraryDialog";
import { cn } from "@/lib/utils";

interface CategoryAttr {
    name: string;
    values: string[];
    isVariant?: boolean;
}

interface Props {
    product?: ProductWithCategoryResponse;
    categoryAttributes: CategoryAttr[];
    globalImagesPool: string[];
    onUploadToPool: (urls: string[]) => void;
}

export default function ProductVariantsForm({
    product,
    categoryAttributes,
    globalImagesPool,
    onUploadToPool
}: Props) {
    const variantAttributes = categoryAttributes.filter((attr) => attr.isVariant);

    const [variants, setVariants] = useState<TApiVariant[]>(product?.variants ?? []);
    const [errors, setErrors] = useState<string[]>([]);
    const [openItems, setOpenItems] = useState<string[]>([]);
    const [sortMethod, setSortMethod] = useState<string>("default");

    const getValidationErrors = (currentVariants: TApiVariant[]) => {
        const newErrors: string[] = [];
        if (!variantAttributes.length) return newErrors;

        const usedAttrsPerVariant = currentVariants.map((variant) => {
            return Object.entries(variant.atributos)
                .filter(([, val]) => val && val.trim() !== "")
                .map(([key]) => key);
        });

        const referenceAttrs = usedAttrsPerVariant.find(attrs => attrs.length > 0) ?? [];

        usedAttrsPerVariant.forEach((attrs, index) => {
            referenceAttrs.forEach((refAttr) => {
                if (!attrs.includes(refAttr)) {
                    newErrors.push(`La variante #${index + 1} requiere un valor para "${refAttr}".`);
                }
            });

            const extraAttrs = attrs.filter(a => !referenceAttrs.includes(a));
            if (extraAttrs.length) {
                newErrors.push(`La variante #${index + 1} tiene atributos extra: ${extraAttrs.join(", ")}.`);
            }
        });
        return newErrors;
    };

    const handleSort = (method: string) => {
        setSortMethod(method);
        if (method === "default") return;

        const sorted = [...variants].sort((a, b) => {
            if (method === "incomplete") {
                const aIncomplete = variantAttributes.some(attr => !a.atributos[attr.name]);
                const bIncomplete = variantAttributes.some(attr => !b.atributos[attr.name]);
                return aIncomplete === bIncomplete ? 0 : aIncomplete ? -1 : 1;
            }
            if (method === "alphabetical") {
                const aSummary = variantAttributes.map(attr => a.atributos[attr.name] || "").join("");
                const bSummary = variantAttributes.map(attr => b.atributos[attr.name] || "").join("");
                return aSummary.localeCompare(bSummary);
            }
            if (method === "price") return (a.precio || 0) - (b.precio || 0);
            if (method === "stock") return (a.stock || 0) - (b.stock || 0);
            return 0;
        });
        setVariants(sorted);
    };

    const addVariant = (event: React.FormEvent) => {
        event.preventDefault();
        const attributes: Record<string, string> = {};
        variantAttributes.forEach((attr) => (attributes[attr.name] = ""));

        const newVariant: TApiVariant = {
            _id: crypto.randomUUID(),
            precio: 0,
            precioComparativo: 0,
            stock: 0,
            sku: "",
            barcode: "",
            atributos: attributes,
            imagenes: [],
        };

        const nextVariants = [...variants, newVariant];
        setVariants(nextVariants);
        setErrors(getValidationErrors(nextVariants));
        setOpenItems((prev) => [...prev, newVariant._id!]);
        setSortMethod("default");
    };

    const updateVariant = <K extends keyof TApiVariant>(index: number, key: K, value: TApiVariant[K]) => {
        const nextVariants = [...variants];
        nextVariants[index] = { ...nextVariants[index], [key]: value };
        setVariants(nextVariants);
        setErrors(getValidationErrors(nextVariants));
    };

    const updateAttribute = (index: number, attrName: string, value: string) => {
        const nextVariants = [...variants];
        nextVariants[index] = {
            ...nextVariants[index],
            atributos: { ...nextVariants[index].atributos, [attrName]: value },
        };
        setVariants(nextVariants);
        setErrors(getValidationErrors(nextVariants));
    };

    const removeVariant = (index: number) => {
        const nextVariants = variants.filter((_, i) => i !== index);
        setVariants(nextVariants);
        setErrors(getValidationErrors(nextVariants));
    };

    const variantsToSubmit = useMemo(() => variants.map(v => ({
        ...v,
        atributos: Object.fromEntries(
            Object.entries(v.atributos).filter(([key]) =>
                variantAttributes.some(c => c.name === key)
            )
        ),
        imagenes: v.imagenes ?? [],
    })), [variants, variantAttributes]);

    if (!variantAttributes?.length) {
        return (
            <div className="p-8 border border-[var(--color-border-default)] rounded-lg bg-[var(--color-bg-secondary)] text-sm text-[var(--color-text-tertiary)] italic text-center">
                La categoría seleccionada no tiene atributos configurados para generar variantes.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[var(--color-border-default)] pb-4">
                <div className="space-y-1">
                    <h3 className="text-sm font-bold tracking-tight text-[var(--color-text-primary)] uppercase">Variantes del Producto</h3>
                    <p className="text-xs text-[var(--color-text-tertiary)]">Gestiona precios, stock y fotos específicas por combinación.</p>
                </div>

                {variants.length > 1 && (
                    <div className="flex items-center gap-2">
                        <ArrowUpDown className="h-3.5 w-3.5 text-[var(--color-text-tertiary)]" />
                        <Select value={sortMethod} onValueChange={handleSort}>
                            <SelectTrigger className="h-8 w-[160px] text-xs bg-[var(--color-bg-primary)] border-[var(--color-border-default)]">
                                <SelectValue placeholder="Ordenar" />
                            </SelectTrigger>
                            <SelectContent className="bg-[var(--color-bg-primary)] border-[var(--color-border-default)]">
                                <SelectItem value="default" className="text-xs">Orden original</SelectItem>
                                <SelectItem value="incomplete" className="text-xs">Incompletas primero</SelectItem>
                                <SelectItem value="alphabetical" className="text-xs">Alfabético</SelectItem>
                                <SelectItem value="price" className="text-xs">Menor Precio</SelectItem>
                                <SelectItem value="stock" className="text-xs">Menor Stock</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                )}
            </div>

            {errors.length > 0 && (
                <div className="bg-[var(--color-error-light)] border border-[var(--color-error)]/20 text-[var(--color-error)] p-4 rounded-lg text-xs space-y-2">
                    <div className="flex items-center gap-2 font-bold uppercase tracking-tight">
                        <AlertCircle className="h-4 w-4" /> Errores de configuración:
                    </div>
                    <ul className="list-disc list-inside space-y-0.5 opacity-90">
                        {errors.slice(0, 3).map((err, i) => <li key={i}>{err}</li>)}
                        {errors.length > 3 && <li>... y {errors.length - 3} avisos más.</li>}
                    </ul>
                </div>
            )}

            <Accordion type="multiple" value={openItems} onValueChange={setOpenItems} className="space-y-3">
                {variants.map((variant, index) => {
                    const isIncomplete = variantAttributes.some(attr => !variant.atributos[attr.name]);
                    const summary = variantAttributes
                        .map((attr) => variant.atributos[attr.name])
                        .filter(Boolean)
                        .join(" / ");

                    return (
                        <AccordionItem
                            key={variant._id}
                            value={variant._id!}
                            className={cn(
                                "border rounded-lg px-4 transition-all duration-200 overflow-hidden",
                                isIncomplete
                                    ? "bg-[var(--color-error-light)]/30 border-[var(--color-error)]/20"
                                    : "bg-[var(--color-bg-primary)] border-[var(--color-border-default)]"
                            )}
                        >
                            <AccordionTrigger className="hover:no-underline py-4">
                                <div className="flex w-full items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] flex items-center justify-center overflow-hidden relative">
                                            {variant.imagenes?.[0] ? (
                                                <Image src={variant.imagenes[0]} alt="" fill className="object-cover" unoptimized />
                                            ) : (
                                                <ImageIcon className="h-4 w-4 text-[var(--color-text-tertiary)] opacity-30" />
                                            )}
                                        </div>
                                        <div className="text-left">
                                            <p className={cn(
                                                "text-xs font-bold uppercase tracking-wide",
                                                !summary ? "text-[var(--color-text-tertiary)] italic" : "text-[var(--color-text-primary)]"
                                            )}>
                                                {summary || "Variante nueva"}
                                            </p>
                                            <p className="text-[10px] text-[var(--color-text-tertiary)] font-mono uppercase tracking-tighter">SKU: {variant.sku || '—'}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-tight pr-4">
                                        <div className="flex flex-col items-end">
                                            <span className="text-[var(--color-text-tertiary)]">Precio</span>
                                            <span className="text-[var(--color-text-primary)]">S/ {variant.precio?.toFixed(2) || '0.00'}</span>
                                        </div>
                                        <div className="flex flex-col items-end border-l border-[var(--color-border-default)] pl-6">
                                            <span className="text-[var(--color-text-tertiary)]">Stock</span>
                                            <span className={cn(variant.stock === 0 ? 'text-[var(--color-error)]' : 'text-[var(--color-text-primary)]')}>{variant.stock}</span>
                                        </div>
                                    </div>
                                </div>
                            </AccordionTrigger>

                            <AccordionContent className="pt-2 pb-6 space-y-6">
                                {/* MULTIMEDIA */}
                                <div className="p-4 rounded-lg border-2 border-dashed border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]/50 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">Multimedia Específica</span>
                                        <MediaLibraryDialog
                                            selectedImages={variant.imagenes || []}
                                            globalImagesPool={globalImagesPool}
                                            onConfirmSelection={(imgs) => updateVariant(index, "imagenes", imgs)}
                                            onUploadSuccess={onUploadToPool}
                                            triggerLabel="Asignar Fotos"
                                            triggerVariant="outline"
                                            size="sm"
                                        />
                                    </div>
                                    <div className="flex flex-wrap gap-2 min-h-[48px] items-center">
                                        {variant.imagenes && variant.imagenes.length > 0 ? (
                                            variant.imagenes.map((url, i) => (
                                                <div key={i} className="relative w-14 h-14 rounded border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] overflow-hidden group">
                                                    <Image src={url} alt="" fill className="object-cover" unoptimized />
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-[10px] text-[var(--color-text-tertiary)] italic">Usando imagen principal del producto.</p>
                                        )}
                                    </div>
                                </div>

                                {/* ATRIBUTOS */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {variantAttributes.map((attr) => (
                                        <div key={attr.name} className="space-y-1.5">
                                            <LabelWithTooltip
                                                htmlFor={`${variant._id}-${attr.name}`}
                                                label={attr.name}
                                                tooltip={`Valor de ${attr.name} para esta variante.`}
                                            />
                                            <Select
                                                value={variant.atributos[attr.name] || ""}
                                                onValueChange={(val) => updateAttribute(index, attr.name, val === "__none__" ? "" : val)}
                                            >
                                                <SelectTrigger className="h-9 text-xs bg-[var(--color-bg-primary)] border-[var(--color-border-default)] text-[var(--color-text-primary)]">
                                                    <SelectValue placeholder="Seleccionar..." />
                                                </SelectTrigger>
                                                <SelectContent className="bg-[var(--color-bg-primary)] border-[var(--color-border-default)]">
                                                    <SelectItem value="__none__" className="italic text-xs">Sin definir</SelectItem>
                                                    {attr.values.map((val) => (
                                                        <SelectItem key={val} value={val} className="text-xs">{val}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    ))}
                                </div>

                                {/* DATOS COMERCIALES */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 border-t border-[var(--color-border-default)]">
                                    <div className="space-y-1.5">
                                        <LabelWithTooltip htmlFor="v-precio" label="Precio Venta" tooltip="Precio unitario para esta variante." />
                                        <Input
                                            type="number"
                                            className="h-9 text-xs font-semibold"
                                            value={variant.precio}
                                            onChange={(e) => updateVariant(index, "precio", Number(e.target.value))}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <LabelWithTooltip htmlFor="v-precioComp" label="Precio Regular" tooltip="Precio tachado para ofertas." />
                                        <Input
                                            type="number"
                                            className="h-9 text-xs text-[var(--color-text-tertiary)]"
                                            value={variant.precioComparativo}
                                            onChange={(e) => updateVariant(index, "precioComparativo", Number(e.target.value))}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <LabelWithTooltip htmlFor="v-stock" label="Stock" tooltip="Inventario disponible para esta combinación." />
                                        <Input
                                            type="number"
                                            className="h-9 text-xs"
                                            value={variant.stock}
                                            onChange={(e) => updateVariant(index, "stock", Number(e.target.value))}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <LabelWithTooltip htmlFor="v-sku" label="SKU Variante" tooltip="Identificador único para esta variante." />
                                        <Input
                                            className="h-9 uppercase text-[10px] font-mono tracking-wider"
                                            value={variant.sku}
                                            onChange={(e) => updateVariant(index, "sku", e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4 mt-2 border-t border-[var(--color-border-default)]">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeVariant(index)}
                                        className="h-8 text-[10px] font-bold uppercase text-[var(--color-error)] hover:bg-[var(--color-error-light)] hover:text-[var(--color-error)]"
                                    >
                                        <Trash2 className="h-3.5 w-3.5 mr-2" />
                                        Eliminar Variante
                                    </Button>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    );
                })}
            </Accordion>

            <div className="pt-2">
                <Button
                    onClick={addVariant}
                    variant="outline"
                    className="w-full h-11 gap-2 border-2 border-dashed border-[var(--color-border-strong)] text-[var(--color-text-primary)] font-bold uppercase text-[11px] hover:bg-[var(--color-bg-secondary)]"
                >
                    <Plus className="h-4 w-4" /> Añadir Nueva Variante
                </Button>
            </div>

            <input type="hidden" name="variants" value={errors.length === 0 ? JSON.stringify(variantsToSubmit) : "[]"} />
            <input type="hidden" name="variants_error" value={errors.length > 0 ? "true" : "false"} />
        </div>
    );
}