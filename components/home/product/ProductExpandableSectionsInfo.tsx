"use client";

import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import type { ProductWithCategoryResponse } from "@/src/schemas";
import { getDeliveryRange } from "@/lib/utils";
import Link from "next/link";
import { Truck, ShieldCheck, ChevronRight, FileText } from "lucide-react";

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

    if (!hasDescripcion && !hasSpecs) return null;

    return (
        <Accordion type="multiple" className="w-full space-y-0 bg-[var(--color-bg-primary)] mt-8">

            {/* SECCIÓN 1: ENVÍOS */}
            <AccordionItem value="envios" className="border-t border-b-0 border-[var(--color-border-subtle)]">
                <AccordionTrigger className="py-6 hover:no-underline group px-0">
                    <div className="flex items-center gap-4">
                        <Truck size={20} strokeWidth={1.5} className="text-[var(--color-text-primary)]" />
                        <span className="text-base font-semibold tracking-tight text-[var(--color-text-primary)]">
                            Entrega y Devoluciones
                        </span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pb-12 pt-2 px-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Información de Entrega */}
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <h4 className="text-[11px] font-bold text-[var(--color-text-tertiary)] uppercase tracking-[0.1em]">
                                    Fecha estimada de entrega
                                </h4>
                                <p className="text-3xl font-bold text-[var(--color-text-primary)] tracking-tight">
                                    {getDeliveryRange(producto.diasEnvio || 1)}
                                </p>
                            </div>
                            <p className="text-sm text-[var(--color-text-tertiary)] leading-relaxed max-w-xs">
                                Recibe tu pedido directamente en tu domicilio con nuestra red de logística prioritaria.
                            </p>
                            {hasWeight && (
                                <div className="pt-2 flex items-center gap-2 text-xs text-[var(--color-text-tertiary)]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-border-default)]" />
                                    Peso del envío: <span className="text-[var(--color-text-primary)] font-medium">{producto.weight} kg</span>
                                </div>
                            )}
                        </div>

                        {/* Política Devoluciones */}
                        <div className="space-y-4 bg-[var(--color-bg-secondary)] p-6 rounded-2xl border border-[var(--color-border-subtle)]/50">
                            <div className="space-y-2">
                                <h4 className="text-sm font-bold text-[var(--color-text-primary)]">
                                    Cambios sin complicaciones
                                </h4>
                                <p className="text-sm text-[var(--color-text-tertiary)] leading-relaxed font-medium">
                                    Periodo de <span className="text-[var(--color-text-primary)]">7 días</span> para gestionar cambios por fallas de origen. Diseñado para tu tranquilidad.
                                </p>
                            </div>
                            <Link
                                href="/hc/garantias-y-devoluciones"
                                className="inline-flex items-center text-sm font-semibold text-[var(--color-text-primary)] hover:opacity-60 transition-all group/link"
                            >
                                <FileText size={16} strokeWidth={1.5} className="mr-2" />
                                Ver términos legales
                                <ChevronRight size={14} className="ml-1 group-hover/link:translate-x-0.5 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>

            {/* SECCIÓN 2: GARANTÍA */}
            <AccordionItem value="garantia" className="border-t border-b border-[var(--color-border-subtle)]">
                <AccordionTrigger className="py-6 hover:no-underline group px-0">
                    <div className="flex items-center gap-4">
                        <ShieldCheck size={20} strokeWidth={1.5} className="text-[var(--color-text-primary)]" />
                        <span className="text-base font-semibold tracking-tight text-[var(--color-text-primary)]">
                            Garantía Oficial
                        </span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pb-12 pt-2 px-0">
                    <div className="max-w-3xl space-y-6">
                        <p className="text-base text-[var(--color-text-tertiary)] leading-relaxed">
                            Todos los productos son <span className="text-[var(--color-text-primary)] font-semibold">100% originales.</span> Cuentan con respaldo oficial de hardware válido directamente de la misma marca, generalmente por un periodo de <span className="text-[var(--color-text-primary)] font-semibold">12 meses.</span>
                        </p>
                        
                        <div className="inline-flex items-start gap-3 p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)]">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                            <p className="text-xs text-[var(--color-text-tertiary)] font-medium leading-relaxed">
                                Conserva tu comprobante de compra digital o físico para cualquier gestión de soporte técnico o devoluciones.
                            </p>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>

        </Accordion>
    );
}