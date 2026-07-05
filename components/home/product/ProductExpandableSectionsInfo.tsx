"use client";

import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import type { ProductWithCategoryResponse } from "@/src/schemas";
import Link from "next/link";

type Props = {
    producto: ProductWithCategoryResponse
};

export default function ProductExpandableSections({ producto }: Props) {
    const descripcionRaw = producto.descripcion ?? "";
    const specsArray = producto.especificaciones ?? [];

    const hasWeight = Boolean(producto.weight);
    const hasDimensions = Boolean(
        producto.dimensions?.length ||
        producto.dimensions?.width ||
        producto.dimensions?.height
    );
    const hasPhysicalData = hasWeight || hasDimensions;

    const hasDescripcion = Boolean(descripcionRaw.trim().length > 0);
    const hasSpecs = Boolean(specsArray.length > 0 || hasPhysicalData);

    // Si absolutamente ninguna sección tiene contenido, no renderizamos nada
    if (!hasDescripcion && !hasSpecs) return null;

    return (
        <Accordion type="multiple" className="w-full border-t border-[var(--color-border-subtle)]">
            
            {/* SECCIÓN 1: DESCRIPCIÓN (Solo si no está vacía) */}
            {hasDescripcion && (
                <AccordionItem value="descripcion" className="border-b border-[var(--color-border-subtle)]">
                    <AccordionTrigger className="py-5 hover:no-underline font-semibold text-base tracking-tight text-[var(--color-text-primary)]">
                        Descripción
                    </AccordionTrigger>
                    <AccordionContent className="pb-8 pt-2">
                        <div 
                            className="prose prose-sm max-w-none text-[var(--color-text-secondary)] text-sm md:text-base leading-relaxed prose-headings:text-[var(--color-text-primary)] prose-strong:text-[var(--color-text-primary)]"
                            dangerouslySetInnerHTML={{ __html: descripcionRaw }}
                        />
                    </AccordionContent>
                </AccordionItem>
            )}

            {/* SECCIÓN 2: ESPECIFICACIONES TÉCNICAS (Solo si no está vacía) */}
            {hasSpecs && (
                <AccordionItem value="especificaciones" className="border-b border-[var(--color-border-subtle)]">
                    <AccordionTrigger className="py-5 hover:no-underline font-semibold text-base tracking-tight text-[var(--color-text-primary)]">
                        Especificaciones
                    </AccordionTrigger>
                    <AccordionContent className="pb-8 pt-2">
                        <div className="grid  gap-6 items-start">
                            {/* Tabla de especificaciones dinámicas */}
                            {specsArray.length > 0 && (
                                <div className="overflow-hidden border border-[var(--color-border-subtle)] rounded-xl bg-[var(--color-bg-primary)]">
                                    <table className="w-full text-left border-collapse">
                                        <tbody className="divide-y divide-[var(--color-border-subtle)]">
                                            {specsArray.map((spec) => (
                                                <tr key={spec.key} className="hover:bg-[var(--color-bg-secondary)] transition-colors">
                                                    <td className="px-5 py-3.5 text-xs font-medium text-[var(--color-text-secondary)] w-[40%]">
                                                        {spec.key}
                                                    </td>
                                                    <td className="px-5 py-3.5 text-sm font-semibold text-[var(--color-text-primary)] w-[60%]">
                                                        {spec.value}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {/* Tabla de peso y empaque físico */}
                            {hasPhysicalData && (
                                <div className="overflow-hidden border border-[var(--color-border-subtle)] rounded-xl bg-[var(--color-bg-primary)]">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr>
                                                <th colSpan={2} className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)]">
                                                    Dimensiones y Peso
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[var(--color-border-subtle)]">
                                            {hasWeight && (
                                                <tr className="hover:bg-[var(--color-bg-secondary)] transition-colors">
                                                    <td className="px-5 py-3.5 text-xs font-medium text-[var(--color-text-secondary)] w-[40%]">
                                                        Peso
                                                    </td>
                                                    <td className="px-5 py-3.5 text-sm font-semibold text-[var(--color-text-primary)] w-[60%]">
                                                        {producto.weight} kg
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            )}

            {/* SECCIÓN 3: ENVÍOS */}
            <AccordionItem value="envios" className="border-b border-[var(--color-border-subtle)]">
                <AccordionTrigger className="py-5 hover:no-underline font-semibold text-base tracking-tight text-[var(--color-text-primary)]">
                    Entrega y Devoluciones
                </AccordionTrigger>
                <AccordionContent className="pb-8 pt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        <div className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                            {hasWeight && (
                                <p className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                                    Peso estimado del paquete: <span className="text-[var(--color-text-primary)] font-semibold">{producto.weight} kg</span>
                                </p>
                            )}
                            <p className="leading-relaxed">
                                Ofrecemos despachos coordinados rápidos en Cañete y envíos protegidos a nivel nacional.
                            </p>
                        </div>
                        <div className="space-y-3 bg-[var(--color-bg-secondary)] p-5 rounded-2xl border border-[var(--color-border-subtle)]">
                            <h4 className="text-sm font-bold text-[var(--color-text-primary)]">
                                Cambios sin complicaciones
                            </h4>
                            <p className="text-xs md:text-sm text-[var(--color-text-secondary)] leading-relaxed font-medium">
                                Cuentas con un periodo de <span className="text-[var(--color-text-primary)] font-bold">7 días</span> para gestionar cambios por fallas de origen.
                            </p>
                            <Link href="/hc/garantias-y-devoluciones" className="inline-flex items-center text-xs font-bold text-[var(--color-accent)] hover:opacity-80 transition-all">
                                Ver políticas de garantía
                            </Link>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>

            {/* SECCIÓN 4: GARANTÍA */}
            <AccordionItem value="garantia" className="border-b border-[var(--color-border-subtle)]">
                <AccordionTrigger className="py-5 hover:no-underline font-semibold text-base tracking-tight text-[var(--color-text-primary)]">
                    Garantía Oficial
                </AccordionTrigger>
                <AccordionContent className="pb-8 pt-2">
                    <p className="text-sm md:text-base text-[var(--color-text-secondary)] leading-relaxed">
                        Todos los equipos y dispositivos distribuidos por S&C Mobile son <span className="text-[var(--color-text-primary)] font-semibold">100% originales</span> con procedencia de marca oficial. Este producto cuenta con cobertura extendida de <span className="text-[var(--color-text-primary)] font-semibold">12 meses</span> contra defectos técnicos estructurales de fábrica.
                    </p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}