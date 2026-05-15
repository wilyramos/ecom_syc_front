"use client";

import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import type { ProductWithCategoryResponse } from "@/src/schemas";
import { Info, Package, Ruler } from "lucide-react";

type Props = {
    producto: ProductWithCategoryResponse
};

export default function ProductExpandableSections({ producto }: Props) {
    const descripcionRaw = producto.descripcion ?? "";
    const specsArray = producto.especificaciones ?? [];

    // ← Campos nuevos
    const hasWeight = Boolean(producto.weight);
    const hasDimensions = Boolean(
        producto.dimensions?.length ||
        producto.dimensions?.width ||
        producto.dimensions?.height
    );
    const hasPhysicalData = hasWeight || hasDimensions;

    const hasDescripcion = Boolean(descripcionRaw.trim().length > 0);
    const hasSpecs = Boolean(specsArray.length > 0 || hasPhysicalData);

    if (!hasDescripcion && !hasSpecs) return null;

    const descWeight = descripcionRaw.length;
    const specsWeight = specsArray.length * 100;
    const showDescFirst = descWeight >= specsWeight;

    const DescripcionComponent = (
        <div className={`${hasSpecs ? "lg:col-span-7" : "lg:col-span-12"} space-y-4`}>
            <div
                className="
                    prose prose-sm max-w-none 
                    text-[var(--color-text-secondary)] 
                    prose-headings:text-[var(--color-text-primary)] 
                    prose-headings:font-semibold
                    prose-strong:text-[var(--color-text-primary)]
                    prose-strong:font-semibold
                    prose-p:leading-relaxed
                    prose-a:text-[var(--color-accent-warm)]
                    prose-a:hover:text-[var(--color-accent-warm-hover)]
                    text-sm md:text-base
                "
                dangerouslySetInnerHTML={{ __html: descripcionRaw }}
            />
        </div>
    );

    const SpecsComponent = (
        <div className="lg:col-span-5 space-y-4">
            {/* Especificaciones técnicas existentes */}
            {specsArray.length > 0 && (
                <div className="overflow-hidden border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)]">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th colSpan={2} className="px-5 py-4 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--color-text-primary)] border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)]">
                                    Especificaciones técnicas
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--color-border-subtle)]">
                            {specsArray.map((spec) => (
                                <tr key={spec.key} className="group hover:bg-[var(--color-bg-secondary)] transition-colors">
                                    <td className="px-5 py-3 text-xs font-medium text-[var(--color-text-secondary)] w-[40%]">
                                        {spec.key}
                                    </td>
                                    <td className="px-5 py-3 text-sm font-semibold text-[var(--color-text-primary)] w-[60%]">
                                        {spec.value}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* ← Peso y dimensiones si existen */}
            {hasPhysicalData && (
                <div className="overflow-hidden border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)]">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th colSpan={2} className="px-5 py-4 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--color-text-primary)] border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)]">
                                    <div className="flex items-center gap-2">
                                        <Package size={13} />
                                        Físico y embalaje
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--color-border-subtle)]">
                            {hasWeight && (
                                <tr className="group hover:bg-[var(--color-bg-secondary)] transition-colors">
                                    <td className="px-5 py-3 text-xs font-medium text-[var(--color-text-secondary)] w-[40%]">
                                        Peso
                                    </td>
                                    <td className="px-5 py-3 text-sm font-semibold text-[var(--color-text-primary)] w-[60%]">
                                        {producto.weight} kg
                                    </td>
                                </tr>
                            )}
                            {hasDimensions && (
                                <tr className="group hover:bg-[var(--color-bg-secondary)] transition-colors">
                                    <td className="px-5 py-3 text-xs font-medium text-[var(--color-text-secondary)] w-[40%]">
                                        <div className="flex items-center gap-1.5">
                                            <Ruler size={11} />
                                            Dimensiones
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 text-sm font-semibold text-[var(--color-text-primary)] w-[60%]">
                                        {producto.dimensions?.length} × {producto.dimensions?.width} × {producto.dimensions?.height} cm
                                        <span className="ml-1.5 text-[10px] font-normal text-[var(--color-text-tertiary)]">
                                            (largo × ancho × alto)
                                        </span>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );

    return (
        <Accordion type="multiple" className="w-full space-y-1 bg-[var(--color-bg-primary)] pt-4">

            {/* SECCIÓN 1: INFORMACIÓN */}
            <AccordionItem value="info" className="border-b border-[var(--color-border-subtle)]">
                <AccordionTrigger className="py-6 hover:no-underline group px-1">
                    <div className="flex items-center gap-3">
                        <Info size={20} className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent-warm)] transition-colors" />
                        <span className="text-base font-semibold tracking-tight text-[var(--color-text-primary)]">
                            Información del producto
                        </span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pb-10 pt-2 px-1">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {showDescFirst ? (
                            <>
                                {hasDescripcion && DescripcionComponent}
                                {hasSpecs && SpecsComponent}
                            </>
                        ) : (
                            <>
                                {hasSpecs && SpecsComponent}
                                {hasDescripcion && DescripcionComponent}
                            </>
                        )}
                    </div>
                </AccordionContent>
            </AccordionItem>

        </Accordion>
    );
}