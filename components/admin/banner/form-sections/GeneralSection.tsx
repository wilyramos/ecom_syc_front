// File: src/components/admin/banner/form-sections/GeneralSection.tsx
"use client";

import { useState } from "react";
import { Info, ImageIcon, Link as LinkIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { LabelWithTooltip } from "@/components/utils/LabelWithTooltip";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SliderContentTypeEnum, SliderObjectFitEnum, SliderBorderStyleEnum, type SliderBanner } from "@/src/schemas/slider.schema";
import ProductReferenceSelector from "../../shared/ProductReferenceSelector";
import MediaLibraryDialog from "@/components/admin/products/MediaLibraryDialog";
import { cn } from "@/lib/utils";

interface SectionProps {
    initialData?: SliderBanner;
    fields?: Record<string, string>;
    fieldErrors?: Record<string, string[]>;
}

export default function GeneralSection({ initialData, fields, fieldErrors }: SectionProps) {
    const [availableImages, setAvailableImages] = useState<string[]>(
        initialData?.media.imageUrl ? [initialData.media.imageUrl] : []
    );
    const [selectedImageUrl, setSelectedImageUrl] = useState<string>(
        fields?.["media.imageUrl"] || initialData?.media.imageUrl || ""
    );

    const val = (name: string, fallback?: string) => fields?.[name] ?? fallback ?? "";
    const err = (name: string) => fieldErrors?.[name]?.[0];

    const getRefId = (ref: SliderBanner["product"] | SliderBanner["brand"] | SliderBanner["category"]) => {
        if (!ref) return "";
        return typeof ref === "string" ? ref : (ref as { _id: string })._id ?? "";
    };

    const currentReferenceId = fields?.referenceId || getRefId(initialData?.product) || getRefId(initialData?.brand) || getRefId(initialData?.category);

    const handleUploadSuccess = (newImages: string[]) => {
        setAvailableImages(prev => [...prev, ...newImages]);
    };

    const handleConfirmSelection = (selectedImages: string[]) => {
        if (selectedImages.length > 0) {
            const selectedUrl = selectedImages[0];
            setSelectedImageUrl(selectedUrl);
            const imageInput = document.querySelector('input[name="media.imageUrl"]') as HTMLInputElement;
            if (imageInput) {
                imageInput.value = selectedUrl;
                imageInput.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }
    };

    return (
        <div className="space-y-6">
            {/* INFORMACIÓN GENERAL */}
            <section className="p-6 border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] rounded-lg space-y-6">
                <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-[var(--color-accent)]" />
                    <h2 className="text-sm font-bold uppercase tracking-tight text-[var(--color-text-primary)]">Información General</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <LabelWithTooltip label="Tipo de Contenido" tooltip="Define qué tipo de entidad se vinculará a este banner." htmlFor="contentType" />
                        <Select name="contentType" defaultValue={val("contentType", initialData?.contentType ?? "product")}>
                            <SelectTrigger className={cn("h-10 text-sm", err("contentType") && "border-[var(--color-error)]")}>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {SliderContentTypeEnum.options.map((opt) => (
                                    <SelectItem key={opt} value={opt} className="text-sm">{opt.toUpperCase()}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-1.5">
                        <LabelWithTooltip label="Referencia Directa" tooltip="Busca y selecciona el producto, marca o categoría que abrirá el banner." htmlFor="referenceId" />
                        <ProductReferenceSelector
                            name="referenceId"
                            initialId={currentReferenceId}
                            initialProduct={
                                initialData?.product && typeof initialData.product === "object" && "_id" in initialData.product
                                    ? {
                                        _id: initialData.product._id,
                                        nombre: initialData.product.nombre,
                                        precio: initialData.product.precio,
                                        imagenes: initialData.product.imagenes,
                                    }
                                    : null
                            }
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <LabelWithTooltip label="Título Principal" required tooltip="El texto más grande que aparecerá sobre el banner." htmlFor="title" />
                    <Input name="title" defaultValue={val("title", initialData?.title)} className={cn("h-10 text-sm font-semibold", err("title") && "border-[var(--color-error)]")} />
                    {err("title") && <p className="text-[var(--color-error)] text-xs font-medium">{err("title")}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <LabelWithTooltip label="Subtítulo" tooltip="Texto secundario de apoyo al título." htmlFor="subtitle" />
                        <Input name="subtitle" defaultValue={val("subtitle", initialData?.subtitle)} className="h-10 text-sm" />
                    </div>
                    <div className="space-y-1.5">
                        <LabelWithTooltip label="URL de Destino" tooltip="Dirección opcional a donde redirigirá el banner al hacer clic." htmlFor="destUrl" />
                        <div className="relative">
                            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-tertiary)]" />
                            <Input name="destUrl" className={cn("pl-10 h-10 text-sm", err("destUrl") && "border-[var(--color-error)]")} defaultValue={val("destUrl", initialData?.destUrl)} placeholder="/productos/slug..." />
                        </div>
                    </div>
                </div>

                <div className="space-y-1.5">
                    <LabelWithTooltip label="Descripción Corta" tooltip="Texto descriptivo adicional (generalmente se oculta en móviles)." htmlFor="description" />
                    <Textarea name="description" defaultValue={val("description", initialData?.description)} rows={2} className="text-sm min-h-[80px]" />
                </div>
            </section>

            {/* MULTIMEDIA */}
            <section className="p-6 border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] rounded-lg space-y-6">
                <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-[var(--color-text-secondary)]" />
                    <h2 className="text-sm font-bold uppercase tracking-tight text-[var(--color-text-primary)]">Multimedia</h2>
                </div>

                <input type="hidden" name="media.imageUrl" value={selectedImageUrl} />

                <div className="space-y-4">
                    <div className="space-y-2 border border-[var(--color-border-default)] rounded-lg p-4 bg-[var(--color-bg-secondary)]/30">
                        <LabelWithTooltip label="Imagen del Banner" required tooltip="Imagen principal optimizada para el slider." htmlFor="media.imageUrl" />
                        <div className="flex gap-3 items-center">
                            <div className="flex-1 bg-[var(--color-bg-primary)] p-3 rounded-md border border-[var(--color-border-subtle)] min-h-[44px] flex items-center">
                                <span className={cn("text-xs break-all font-mono", selectedImageUrl ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-tertiary)] italic")}>
                                    {selectedImageUrl || "Ninguna imagen seleccionada"}
                                </span>
                            </div>
                            <MediaLibraryDialog
                                selectedImages={selectedImageUrl ? [selectedImageUrl] : []}
                                globalImagesPool={availableImages}
                                onConfirmSelection={handleConfirmSelection}
                                onUploadSuccess={handleUploadSuccess}
                                allowMultiple={false}
                                triggerLabel="Seleccionar"
                                triggerVariant="outline"
                                size="sm"
                            />
                        </div>
                        {err("media.imageUrl") && <p className="text-[var(--color-error)] text-xs font-medium">{err("media.imageUrl")}</p>}
                    </div>

                    <div className="space-y-1.5">
                        <LabelWithTooltip label="Texto Alternativo (Alt)" tooltip="Mejora el SEO y la accesibilidad describiendo la imagen." htmlFor="media.altText" />
                        <Input name="media.altText" defaultValue={val("media.altText", initialData?.media.altText)} className={cn("h-10 text-sm", err("media.altText") && "border-[var(--color-error)]")} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <LabelWithTooltip label="URL Video (Opcional)" tooltip="Si se incluye, se reproducirá de fondo automáticamente." htmlFor="media.videoUrl" />
                            <Input name="media.videoUrl" defaultValue={val("media.videoUrl", initialData?.media.videoUrl)} placeholder="https://..." className="h-10 text-sm" />
                        </div>
                        <div className="space-y-1.5">
                            <LabelWithTooltip label="Poster del Video" tooltip="Imagen de respaldo mientras carga el video." htmlFor="media.videoPoster" />
                            <Input name="media.videoPoster" defaultValue={val("media.videoPoster", initialData?.media.videoPoster)} placeholder="URL imagen previa" className="h-10 text-sm" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <LabelWithTooltip label="Object Fit" tooltip="Ajuste de la imagen al contenedor." htmlFor="media.objectFit" />
                            <Select name="media.objectFit" defaultValue={val("media.objectFit", initialData?.media.objectFit ?? "cover")}>
                                <SelectTrigger className="h-10 text-sm"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {SliderObjectFitEnum.options.map((opt) => <SelectItem key={opt} value={opt} className="text-sm">{opt}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1.5">
                            <LabelWithTooltip label="Borde de Imagen" tooltip="Estilo visual del borde." htmlFor="media.border" />
                            <Select name="media.border" defaultValue={val("media.border", initialData?.media.border ?? "none")}>
                                <SelectTrigger className="h-10 text-sm"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {SliderBorderStyleEnum.options.map((opt) => <SelectItem key={opt} value={opt} className="text-sm">{opt}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}