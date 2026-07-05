"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ImageIcon, LayoutGrid, Info, GripVertical } from "lucide-react";

// Dnd Kit Imports
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    rectSortingStrategy,
    useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Types
import type { ProductWithCategoryResponse } from "@/src/schemas";
import type { CategoryListResponse } from "@/src/schemas/category.schema";
import type { TBrand } from "@/src/schemas/brands";
import type { ProductLine } from "@/src/schemas/line.schema";

// UI Components
import { Input } from "@/components/ui/input";
import { LabelWithTooltip } from "@/components/utils/LabelWithTooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Custom Form Components
import ClientCategoryAttributes from "./ClientCategoryAttributes";
import ProductSwitches from "./ProductSwitches";
import SpecificationsSection from "./SpecificationsSection";
import ProductDescriptionEditor from "./ProductDescriptionEditor";
import BrandCombobox from "./BrandCombobox";
import ProductVariantsForm from "./ProductVariantsForm";
import MediaLibraryDialog from "./MediaLibraryDialog";
import ComplementaryProductsSection from "./ComplementaryProductsSection";
import SEOProduct from "./SEOproduct";

// Componente de Ítem Ordenable
function SortableImageItem({ img, onRemove }: { img: string; onRemove: () => void }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: img });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 40 : "auto",
        opacity: isDragging ? 0.4 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="relative aspect-square border border-[var(--color-border-default)] group bg-[var(--color-bg-secondary)] overflow-hidden rounded-sm touch-none"
        >
            <Image src={img} alt="Product" fill className="object-cover" unoptimized />

            {/* Control visual de arrastre */}
            <div
                {...attributes}
                {...listeners}
                className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-grab active:cursor-grabbing"
            >
                <GripVertical className="text-white w-6 h-6 drop-shadow-md" />
            </div>

            <button
                type="button"
                onClick={onRemove}
                className="absolute top-1 right-1 bg-[var(--color-bg-inverse)]/70 text-[var(--color-text-inverse)] p-1 opacity-0 group-hover:opacity-100 transition-opacity rounded-sm cursor-pointer z-10"
            >
                <X size={12} />
            </button>
            <input type="hidden" name="imagenes[]" value={img} />
        </div>
    );
}

export default function ProductForm({
    product,
    categorias,
    brands,
    lines,
}: {
    product?: ProductWithCategoryResponse;
    categorias: CategoryListResponse;
    brands: TBrand[];
    lines: ProductLine[];
}) {
    const initialBrandId = typeof product?.brand === 'object' ? product?.brand?._id : product?.brand;
    const initialLineId = typeof product?.line === 'object' ? product?.line?._id : product?.line;

    const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(product?.categoria?._id);
    const [selectedBrandId, setSelectedBrandId] = useState<string | undefined>(initialBrandId);
    const [masterImages, setMasterImages] = useState<string[]>(() => Array.from(new Set(product?.imagenes || [])));

    // Sensores para Dnd-kit
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5, // Evita activaciones accidentales al hacer clic
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleAddImagesToPool = (newImages: string[]) => {
        setMasterImages(prev => Array.from(new Set([...prev, ...newImages])));
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setMasterImages((items) => {
                const oldIndex = items.indexOf(active.id as string);
                const newIndex = items.indexOf(over.id as string);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const filteredLines = lines.filter(line => {
        if (!selectedBrandId) return false;
        const lineBrandId = typeof line.brand === 'object' ? line.brand._id : line.brand;
        return lineBrandId === selectedBrandId;
    });

    const currentCategory = categorias.find((c) => c._id === selectedCategoryId);
    const dynamicCategoryAttributes = currentCategory?.attributes || [];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 bg-[var(--color-bg-secondary)] w-full">

            {/* =================== COLUMNA PRINCIPAL (3/4) =================== */}
            <div className="lg:col-span-3 space-y-6">

                {/* 1. INFORMACIÓN BÁSICA Y CATEGORIZACIÓN */}
                <section className="p-6 border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] space-y-6 rounded-lg">
                    <div className="flex items-center gap-2 mb-2 border-b">
                        <Info className="w-4 h-4 text-[var(--color-text-primary)]" />
                        <h2 className="text-sm font-bold tracking-tight text-[var(--color-text-primary)]">Información General</h2>
                    </div>

                    <div className="space-y-4 pt-4">
                        <div className="space-y-1.5">
                            <LabelWithTooltip htmlFor="nombre" label="Nombre del Producto" required tooltip="El nombre del producto que se mostrará en la tienda." />
                            <Input id="nombre" name="nombre" defaultValue={product?.nombre} className="h-11 text-sm font-medium" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <LabelWithTooltip htmlFor="brand" label="Marca" required tooltip="La marca a la que pertenece el producto." />
                                <BrandCombobox brands={brands} value={selectedBrandId} onChange={(val) => setSelectedBrandId(val)} />
                                <input type="hidden" name="brand" value={selectedBrandId || ""} />
                            </div>

                            <div className="space-y-1.5">
                                <LabelWithTooltip htmlFor="line" label="Línea / Familia" tooltip="La línea o familia a la que pertenece el producto." />
                                <Select key={selectedBrandId} name="line" defaultValue={initialLineId}>
                                    <SelectTrigger disabled={!selectedBrandId || filteredLines.length === 0} className="h-10 text-sm bg-[var(--color-bg-primary)] border-[var(--color-border-default)]">
                                        <SelectValue placeholder={!selectedBrandId ? "Selecciona marca" : "Selecciona línea"} />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[var(--color-bg-primary)] border-[var(--color-border-default)]">
                                        {filteredLines.map((line) => (
                                            <SelectItem key={line._id} value={line._id} className="text-sm">{line.nombre}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <ClientCategoryAttributes
                            categorias={categorias}
                            initialCategoryId={product?.categoria?._id}
                            currentAttributes={product?.atributos}
                            onCategoryChange={setSelectedCategoryId}
                        />
                    </div>
                </section>

                {/* 2. CONTENIDO VISUAL (GALERÍA CON DRAG AND DROP) */}
                <section className="p-6 border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] space-y-4 rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--color-border-subtle)] pb-3">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <ImageIcon className="w-4 h-4 text-[var(--color-text-secondary)]" />
                                <h2 className="text-sm font-bold tracking-tight text-[var(--color-text-primary)]">Galería Multimedia</h2>
                            </div>
                            {masterImages.length > 1 && (
                                <p className="text-[11px] text-[var(--color-text-tertiary)] flex items-center gap-1.5 bg-[var(--color-bg-secondary)] px-2 py-0.5 rounded border border-[var(--color-border-subtle)] w-fit">
                                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                    Tip: Arrastra las imágenes para cambiar el orden de visualización. La primera será la principal.
                                </p>
                            )}
                        </div>
                        <MediaLibraryDialog
                            selectedImages={masterImages}
                            globalImagesPool={masterImages}
                            onConfirmSelection={setMasterImages}
                            onUploadSuccess={handleAddImagesToPool}
                            triggerLabel="Gestionar Imágenes"
                        />
                    </div>

                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext items={masterImages} strategy={rectSortingStrategy}>
                            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3 p-4 border-2 border-dashed border-[var(--color-border-strong)] rounded-md bg-[var(--color-bg-secondary)]/10">
                                {masterImages.map((img, index) => (
                                    <div key={img} className="relative group">
                                        {index === 0 && (
                                            <span className="absolute top-1 left-1 bg-blue-600 text-white font-bold text-[9px] uppercase px-1.5 py-0.5 rounded shadow-sm z-20 pointer-events-none tracking-wider">
                                                Principal
                                            </span>
                                        )}
                                        <SortableImageItem
                                            img={img}
                                            onRemove={() => setMasterImages(prev => prev.filter(i => i !== img))}
                                        />
                                    </div>
                                ))}
                                {masterImages.length === 0 && (
                                    <div className="col-span-full py-8 text-center text-sm text-[var(--color-text-tertiary)] italic">
                                        No hay imágenes seleccionadas
                                    </div>
                                )}
                            </div>
                        </SortableContext>
                    </DndContext>
                </section>
                {/* 4. PRECIOS, INVENTARIO E IDENTIFICACIÓN */}
                <section className="p-6 border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="space-y-1.5">
                            <LabelWithTooltip htmlFor="precio" label="Precio Venta" tooltip="El precio de venta del producto." />
                            <Input type="number" id="precio" name="precio" defaultValue={product?.precio} className="h-10 text-sm font-semibold text-[var(--color-success)]" />
                        </div>
                        <div className="space-y-1.5">
                            <LabelWithTooltip htmlFor="precioComparativo" label="Precio Regular (Tachado)" tooltip="El precio regular del producto antes de la oferta." />
                            <Input type="number" id="precioComparativo" name="precioComparativo" defaultValue={product?.precioComparativo} className="h-10 text-sm text-[var(--color-text-tertiary)]" />
                        </div>
                        <div className="space-y-1.5">
                            <LabelWithTooltip htmlFor="costo" label="Costo Unitario" tooltip="El costo unitario del producto." />
                            <Input type="number" id="costo" name="costo" defaultValue={product?.costo} className="h-10 text-sm text-[var(--color-text-primary)]" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-[var(--color-border-default)]">
                        <div className="space-y-1.5">
                            <LabelWithTooltip htmlFor="stock" label="Stock Global" tooltip="La cantidad disponible del producto en inventario." />
                            <Input type="number" id="stock" name="stock" defaultValue={product?.stock} className="text-sm" />
                        </div>
                        <div className="space-y-1.5">
                            <LabelWithTooltip htmlFor="sku" label="SKU" tooltip="El código de identificación único del producto." />
                            <Input id="sku" name="sku" defaultValue={product?.sku} placeholder="Ejem: IPH-15-TI" className="text-sm font-mono" />
                        </div>
                        <div className="space-y-1.5">
                            <LabelWithTooltip htmlFor="barcode" label="Código de Barras" tooltip="El código de barras del producto." />
                            <Input id="barcode" name="barcode" defaultValue={product?.barcode} className="text-sm" />
                        </div>
                        <div className="space-y-1.5">
                            <LabelWithTooltip htmlFor="diasEnvio" label="Días de despacho" tooltip="El número de días que toma el envío del producto." />
                            <Input type="number" id="diasEnvio" name="diasEnvio" defaultValue={product?.diasEnvio ?? 1} className="text-sm" />
                        </div>
                    </div>
                </section>

                {/* 5. VARIANTES */}
                <section className="p-6 border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] rounded-lg">
                    <div className="flex items-center gap-2 mb-4">
                        <LayoutGrid className="w-4 h-4 text-[var(--color-text-secondary)]" />
                        <h2 className="text-sm font-bold tracking-tight text-[var(--color-text-primary)]">Variantes de Producto</h2>
                    </div>
                    <ProductVariantsForm
                        product={product}
                        categoryAttributes={dynamicCategoryAttributes}
                        globalImagesPool={masterImages}
                        onUploadToPool={handleAddImagesToPool}
                    />
                </section>

                {/* 3. DESCRIPCIÓN ENRIQUECIDA */}
                <section className="p-6 border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] space-y-3 rounded-lg">
                    <LabelWithTooltip htmlFor="descripcion_editor" label="Descripción Detallada" tooltip="Descripción con formato enriquecido para el e-commerce." />
                    <ProductDescriptionEditor initialHTML={product?.descripcion || ""} />
                </section>

                {/* 6. DETALLES TÉCNICOS Y RELACIONADOS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SpecificationsSection initial={product?.especificaciones} />
                    <ComplementaryProductsSection initialItems={product?.complementarios || []} />
                </div>
            </div>

            <aside className="space-y-6">
                <div className="sticky top-6 space-y-6">
                    {/* Estatus y Visibilidad */}
                    <div className="p-4 border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] rounded-lg">
                        <ProductSwitches product={product} />
                    </div>
                    {/* SEO Metadata */}
                    <SEOProduct product={product} />
                </div>
            </aside>
        </div>
    );
}