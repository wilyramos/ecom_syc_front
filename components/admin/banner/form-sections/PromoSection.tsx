// File: src/components/admin/banner/form-sections/PromoSection.tsx
"use client";

import { DollarSign, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { LabelWithTooltip } from "@/components/utils/LabelWithTooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SliderBorderStyleEnum, type SliderBanner } from "@/src/schemas/slider.schema";
import { cn } from "@/lib/utils";

interface SectionProps {
    initialData?: SliderBanner;
    fields?: Record<string, string>;
    fieldErrors?: Record<string, string[]>;
}

export default function PromoSection({ initialData, fields, fieldErrors }: SectionProps) {
    const val = (name: string, fallback?: string) => fields?.[name] ?? fallback ?? "";
    const err = (name: string) => fieldErrors?.[name]?.[0];

    const toDatetimeLocal = (date?: Date | string | null) => {
        if (!date) return "";
        const d = new Date(date);
        return isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 16);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* SECCIÓN PRECIO */}
            <section className="p-6 border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] rounded-lg space-y-6">
                <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-[var(--color-success)]" />
                    <h2 className="text-sm font-bold uppercase tracking-tight text-[var(--color-text-primary)]">Precio y Etiquetas</h2>
                </div>

                <div className="grid grid-cols-3 gap-3">
                   <div className="space-y-1.5">
    <LabelWithTooltip
        htmlFor="price-currency"
        label="Moneda"
        tooltip="Moneda fija en soles peruanos."
    />

    <Input
        id="price-currency"
        value="S/"
        disabled
        className="bg-[var(--color-bg-secondary)] cursor-not-allowed"
    />

    <input type="hidden" name="price.currency" value="S/" />
</div>
                    <div className="space-y-1.5">
                        <LabelWithTooltip
                            htmlFor="price-current"
                            label="Actual"
                            tooltip="Precio final de venta destacado."
                        />
                        <Input id="price-current" name="price.current" type="number" step="0.01" defaultValue={val("price.current", initialData?.price?.current?.toString())} className="font-bold text-[var(--color-success)]" />
                    </div>
                    <div className="space-y-1.5">
                        <LabelWithTooltip
                            htmlFor="price-compare"
                            label="Antes"
                            tooltip="Precio regular para mostrar ahorro (tachado)."
                        />
                        <Input id="price-compare" name="price.compare" type="number" step="0.01" defaultValue={val("price.compare", initialData?.price?.compare?.toString())} className="text-[var(--color-text-tertiary)]" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                        <LabelWithTooltip
                            htmlFor="price-label"
                            label="Etiqueta"
                            tooltip="Texto sobre el precio (Ej: 'OFERTA')."
                        />
                        <Input id="price-label" name="price.label" defaultValue={val("price.label", initialData?.price?.label)} />
                    </div>
                    <div className="space-y-1.5">
                        <LabelWithTooltip
                            htmlFor="price-suffix"
                            label="Sufijo"
                            tooltip="Texto después del precio (Ej: '/mes')."
                        />
                        <Input id="price-suffix" name="price.suffix" defaultValue={val("price.suffix", initialData?.price?.suffix)} />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <LabelWithTooltip
                        htmlFor="price-note"
                        label="Nota adicional"
                        tooltip="Texto pequeño informativo bajo el precio."
                    />
                    <Input id="price-note" name="price.note" defaultValue={val("price.note", initialData?.price?.note)} placeholder="Stock limitado..." />
                </div>

                <div className="space-y-1.5">
                    <LabelWithTooltip
                        htmlFor="price-border"
                        label="Borde Precio"
                        tooltip="Estilo visual que rodea el bloque de precio."
                    />
                    <Select name="price.border" defaultValue={val("price.border", initialData?.price?.border ?? "none")}>
                        <SelectTrigger id="price-border" className="h-10 text-sm">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[var(--color-bg-primary)] border-[var(--color-border-default)]">
                            {SliderBorderStyleEnum.options.map((opt) => (
                                <SelectItem key={opt} value={opt} className="text-sm">{opt}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </section>

            {/* SECCIÓN COUNTDOWN */}
            <section className="p-6 border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] rounded-lg space-y-6">
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[var(--color-warning)]" />
                    <h2 className="text-sm font-bold uppercase tracking-tight text-[var(--color-text-primary)]">Countdown</h2>
                </div>

                <div className="space-y-1.5">
                    <LabelWithTooltip
                        htmlFor="countdown-label"
                        label="Título contador"
                        tooltip="Texto que acompaña al reloj regresivo."
                    />
                    <Input id="countdown-label" name="countdown.label" defaultValue={val("countdown.label", initialData?.countdown?.label)} placeholder="La oferta termina en:" />
                </div>

                <div className="space-y-1.5">
                    <LabelWithTooltip
                        htmlFor="countdown-endsAt"
                        label="Fecha Fin"
                        tooltip="Fecha y hora en la que el contador llegará a cero."
                    />
                    <Input
                        id="countdown-endsAt"
                        name="countdown.endsAt"
                        type="datetime-local"
                        defaultValue={toDatetimeLocal(initialData?.countdown?.endsAt)}
                        className={cn(err("countdown.endsAt") && "border-[var(--color-error)]")}
                    />
                    {err("countdown.endsAt") && <p className="text-[var(--color-error)] text-xs font-medium">{err("countdown.endsAt")}</p>}
                </div>

                <div className="flex items-center gap-3 pt-2">
                    <input
                        type="checkbox"
                        id="show-days"
                        name="countdown.showDays"
                        value="true"
                        defaultChecked={initialData?.countdown?.showDays ?? true}
                        className="w-4 h-4 accent-[var(--color-bg-inverse)] cursor-pointer"
                    />
                    <label htmlFor="show-days" className="text-xs font-bold uppercase tracking-wide text-[var(--color-text-secondary)] cursor-pointer">
                        Mostrar días en el reloj
                    </label>
                </div>
            </section>
        </div>
    );
}