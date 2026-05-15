"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Check, X } from "lucide-react";

import ProductMenuAction from "./ProductMenuActionts";
import { useColumnFilter } from "@/hooks/useColumnFilter";

import type {
    ProductsAPIResponse,
    CategoryListResponse,
} from "@/src/schemas";

import { Brand } from "@/src/services/brands";

import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

export default function ProductsTable({
    products,
    categories,
    brands,
}: {
    products: ProductsAPIResponse | null;
    categories: CategoryListResponse;
    brands: Brand[];
}) {
    const router = useRouter();

    const nameFilter = useColumnFilter("nombre");
    const skuFilter = useColumnFilter("sku");
    const priceSort = useColumnFilter("precioSort");
    const stockSort = useColumnFilter("stockSort");
    const brandFilter = useColumnFilter("brand");
    const activeFilter = useColumnFilter("isActive");
    const nuevoFilter = useColumnFilter("esNuevo");
    const destacadoFilter = useColumnFilter("esDestacado");
    const categoryFilter = useColumnFilter("category");

    const MIN_ROWS = 10;

    const tableRows = products?.products ?? [];
    const emptyRows = Math.max(0, MIN_ROWS - tableRows.length);
    const noProducts = tableRows.length === 0;

    const clearFilters = () => {
        [
            nameFilter,
            skuFilter,
            priceSort,
            stockSort,
            brandFilter,
            activeFilter,
            nuevoFilter,
            destacadoFilter,
            categoryFilter,
        ].forEach((f) => f.reset());

        router.replace(window.location.pathname);
    };

    return (
        <div className="flex h-full w-full flex-col bg-[var(--color-bg-primary)]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] px-4 py-3">
                <button
                    onClick={clearFilters}
                    className="
                        text-xs font-semibold
                        text-[var(--color-text-secondary)]
                        transition-colors
                        hover:text-[var(--color-text-primary)]
                    "
                >
                    Limpiar filtros
                </button>
            </div>

            {/* Table */}
            <div className="w-full overflow-x-auto">
                <Table
                    className="
                        min-w-[1200px]
                        w-full
                        table-auto
                        border-separate
                        border-spacing-0
                        text-sm
                        text-[var(--color-text-secondary)]
                    "
                >
                    <TableHeader
                        className="
                            sticky top-0 z-10
                            border-b
                            border-[var(--color-border-default)]
                            bg-[var(--color-bg-secondary)]
                            shadow-sm
                        "
                    >
                        <TableRow>
                            {[
                                nameFilter,
                                skuFilter,
                                priceSort,
                                stockSort,
                                brandFilter,
                                categoryFilter,
                                activeFilter,
                                nuevoFilter,
                                destacadoFilter,
                            ].map((filter, i) => (
                                <TableHead
                                    key={i}
                                    className="
                                        border-b
                                        border-[var(--color-border-default)]
                                        bg-[var(--color-bg-secondary)]
                                        p-2
                                        text-center
                                    "
                                >
                                    {i === 0 && (
                                        <Input
                                            placeholder="Nombre"
                                            value={nameFilter.value}
                                            onChange={(e) =>
                                                nameFilter.setValue(
                                                    e.target.value
                                                )
                                            }
                                            className="
                                                h-9 rounded-md border-[var(--color-border-default)]
                                                bg-[var(--color-bg-primary)]
                                                text-sm text-[var(--color-text-primary)]
                                            "
                                        />
                                    )}

                                    {i === 1 && (
                                        <Input
                                            placeholder="SKU"
                                            value={skuFilter.value}
                                            onChange={(e) =>
                                                skuFilter.setValue(
                                                    e.target.value
                                                )
                                            }
                                            className="
                                                h-9 rounded-md border-[var(--color-border-default)]
                                                bg-[var(--color-bg-primary)]
                                                text-sm text-[var(--color-text-primary)]
                                            "
                                        />
                                    )}

                                    {i === 2 && (
                                        <Select
                                            value={
                                                priceSort.value || undefined
                                            }
                                            onValueChange={
                                                priceSort.setValue
                                            }
                                        >
                                            <SelectTrigger
                                                className="
                                                    h-9 border-[var(--color-border-default)]
                                                    bg-[var(--color-bg-primary)]
                                                    text-sm text-[var(--color-text-primary)]
                                                "
                                            >
                                                <SelectValue placeholder="Precio" />
                                            </SelectTrigger>

                                            <SelectContent
                                                className="
                                                    border-[var(--color-border-default)]
                                                    bg-[var(--color-bg-primary)]
                                                    text-[var(--color-text-primary)]
                                                "
                                            >
                                                <SelectItem value="asc">
                                                    Asc
                                                </SelectItem>

                                                <SelectItem value="desc">
                                                    Desc
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}

                                    {i === 3 && (
                                        <Select
                                            value={
                                                stockSort.value || undefined
                                            }
                                            onValueChange={
                                                stockSort.setValue
                                            }
                                        >
                                            <SelectTrigger
                                                className="
                                                    h-9 border-[var(--color-border-default)]
                                                    bg-[var(--color-bg-primary)]
                                                    text-sm text-[var(--color-text-primary)]
                                                "
                                            >
                                                <SelectValue placeholder="Stock" />
                                            </SelectTrigger>

                                            <SelectContent
                                                className="
                                                    border-[var(--color-border-default)]
                                                    bg-[var(--color-bg-primary)]
                                                    text-[var(--color-text-primary)]
                                                "
                                            >
                                                <SelectItem value="asc">
                                                    Asc
                                                </SelectItem>

                                                <SelectItem value="desc">
                                                    Desc
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}

                                    {i === 4 && (
                                        <Select
                                            value={
                                                brandFilter.value || undefined
                                            }
                                            onValueChange={
                                                brandFilter.setValue
                                            }
                                        >
                                            <SelectTrigger
                                                className="
                                                    h-9 border-[var(--color-border-default)]
                                                    bg-[var(--color-bg-primary)]
                                                    text-sm text-[var(--color-text-primary)]
                                                "
                                            >
                                                <SelectValue placeholder="Marca" />
                                            </SelectTrigger>

                                            <SelectContent
                                                className="
                                                    max-h-60 overflow-auto
                                                    border-[var(--color-border-default)]
                                                    bg-[var(--color-bg-primary)]
                                                    text-[var(--color-text-primary)]
                                                "
                                            >
                                                {brands.map((b) => (
                                                    <SelectItem
                                                        key={b._id}
                                                        value={b._id}
                                                    >
                                                        {b.nombre}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}

                                    {i === 5 && (
                                        <Select
                                            value={
                                                categoryFilter.value ||
                                                undefined
                                            }
                                            onValueChange={
                                                categoryFilter.setValue
                                            }
                                        >
                                            <SelectTrigger
                                                className="
                                                    h-9 border-[var(--color-border-default)]
                                                    bg-[var(--color-bg-primary)]
                                                    text-sm text-[var(--color-text-primary)]
                                                "
                                            >
                                                <SelectValue placeholder="Categoría" />
                                            </SelectTrigger>

                                            <SelectContent
                                                className="
                                                    max-h-60 overflow-auto
                                                    border-[var(--color-border-default)]
                                                    bg-[var(--color-bg-primary)]
                                                    text-[var(--color-text-primary)]
                                                "
                                            >
                                                {categories.map((c) => (
                                                    <SelectItem
                                                        key={c._id}
                                                        value={c._id}
                                                    >
                                                        {c.nombre}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}

                                    {i === 6 && (
                                        <Select
                                            value={
                                                activeFilter.value ||
                                                undefined
                                            }
                                            onValueChange={
                                                activeFilter.setValue
                                            }
                                        >
                                            <SelectTrigger
                                                className="
                                                    h-9 border-[var(--color-border-default)]
                                                    bg-[var(--color-bg-primary)]
                                                    text-sm text-[var(--color-text-primary)]
                                                "
                                            >
                                                <SelectValue placeholder="Estado" />
                                            </SelectTrigger>

                                            <SelectContent
                                                className="
                                                    border-[var(--color-border-default)]
                                                    bg-[var(--color-bg-primary)]
                                                    text-[var(--color-text-primary)]
                                                "
                                            >
                                                <SelectItem value="true">
                                                    Activos
                                                </SelectItem>

                                                <SelectItem value="false">
                                                    Inactivos
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}

                                    {i === 7 && (
                                        <Select
                                            value={
                                                nuevoFilter.value || undefined
                                            }
                                            onValueChange={
                                                nuevoFilter.setValue
                                            }
                                        >
                                            <SelectTrigger
                                                className="
                                                    h-9 border-[var(--color-border-default)]
                                                    bg-[var(--color-bg-primary)]
                                                    text-sm text-[var(--color-text-primary)]
                                                "
                                            >
                                                <SelectValue placeholder="Nuevo" />
                                            </SelectTrigger>

                                            <SelectContent
                                                className="
                                                    border-[var(--color-border-default)]
                                                    bg-[var(--color-bg-primary)]
                                                    text-[var(--color-text-primary)]
                                                "
                                            >
                                                <SelectItem value="true">
                                                    Sí
                                                </SelectItem>

                                                <SelectItem value="false">
                                                    No
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}

                                    {i === 8 && (
                                        <Select
                                            value={
                                                destacadoFilter.value ||
                                                undefined
                                            }
                                            onValueChange={
                                                destacadoFilter.setValue
                                            }
                                        >
                                            <SelectTrigger
                                                className="
                                                    h-9 border-[var(--color-border-default)]
                                                    bg-[var(--color-bg-primary)]
                                                    text-sm text-[var(--color-text-primary)]
                                                "
                                            >
                                                <SelectValue placeholder="Destacado" />
                                            </SelectTrigger>

                                            <SelectContent
                                                className="
                                                    border-[var(--color-border-default)]
                                                    bg-[var(--color-bg-primary)]
                                                    text-[var(--color-text-primary)]
                                                "
                                            >
                                                <SelectItem value="true">
                                                    Sí
                                                </SelectItem>

                                                <SelectItem value="false">
                                                    No
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                </TableHead>
                            ))}

                            <TableHead
                                className="
                                    w-[80px]
                                    border-b
                                    border-[var(--color-border-default)]
                                    bg-[var(--color-bg-secondary)]
                                    p-2 text-center text-sm font-semibold
                                    text-[var(--color-text-primary)]
                                "
                            >
                                Acciones
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {noProducts ? (
                            <>
                                <TableRow>
                                    <TableCell
                                        colSpan={10}
                                        className="
                                            h-[62px]
                                            bg-[var(--color-bg-primary)]
                                            text-center text-sm
                                            text-[var(--color-text-secondary)]
                                        "
                                    >
                                        No se encontraron productos.
                                    </TableCell>
                                </TableRow>

                                {Array.from({
                                    length: MIN_ROWS - 1,
                                }).map((_, index) => (
                                    <TableRow
                                        key={`empty-no-products-${index}`}
                                        className="
                                            border-b
                                            border-[var(--color-border-subtle)]
                                        "
                                    >
                                        {Array.from({
                                            length: 10,
                                        }).map((_, cellIndex) => (
                                            <TableCell
                                                key={cellIndex}
                                                className="h-[62px]"
                                            />
                                        ))}
                                    </TableRow>
                                ))}
                            </>
                        ) : (
                            <>
                                {tableRows.map((p) => (
                                    <TableRow
                                        key={p._id}
                                        className="
                                            border-b
                                            border-[var(--color-border-subtle)]
                                            text-sm
                                            transition-colors
                                            hover:bg-[var(--color-bg-secondary)]
                                        "
                                    >
                                        <TableCell
                                            className="
                                                w-[260px]
                                                p-3 font-medium
                                                text-[var(--color-text-primary)]
                                            "
                                        >
                                            <Link
                                                href={`/admin/products/${p._id}`}
                                                className="
                                                    group flex items-center gap-3
                                                "
                                            >
                                                {p.imagenes?.[0] ? (
                                                    <div
                                                        className="
                                                            relative h-10 w-10
                                                            flex-shrink-0 overflow-hidden
                                                            rounded border
                                                            border-[var(--color-border-default)]
                                                            bg-[var(--color-bg-tertiary)]
                                                        "
                                                    >
                                                        <Image
                                                            src={
                                                                p.imagenes[0]
                                                            }
                                                            alt={p.nombre}
                                                            fill
                                                            sizes="40px"
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div
                                                        className="
                                                            flex h-10 w-10
                                                            flex-shrink-0 items-center
                                                            justify-center rounded
                                                            border border-[var(--color-border-default)]
                                                            bg-[var(--color-bg-tertiary)]
                                                            text-[10px] font-medium
                                                            uppercase
                                                            text-[var(--color-text-tertiary)]
                                                        "
                                                    >
                                                        S/I
                                                    </div>
                                                )}

                                                <div className="min-w-0 flex flex-col">
                                                    <span
                                                        className="
                                                            max-w-[180px]
                                                            truncate
                                                            transition-colors
                                                            group-hover:text-[var(--color-accent-hover)]
                                                        "
                                                    >
                                                        {p.isFrontPage && (
                                                            <span
                                                                className="
                                                                    mr-1 text-xs font-bold
                                                                    text-[var(--color-warning)]
                                                                "
                                                            >
                                                                [Inicio]
                                                            </span>
                                                        )}

                                                        {p.nombre}
                                                    </span>
                                                </div>
                                            </Link>
                                        </TableCell>

                                        <TableCell
                                            className="
                                                w-[120px]
                                                p-3 text-center
                                                font-mono text-xs
                                                text-[var(--color-text-secondary)]
                                            "
                                        >
                                            {p.sku}
                                        </TableCell>

                                        <TableCell
                                            className="
                                                w-[100px]
                                                p-3 text-center
                                                font-semibold
                                                text-[var(--color-text-primary)]
                                            "
                                        >
                                            S/{p.precio?.toFixed(2)}
                                        </TableCell>

                                        <TableCell
                                            className="
                                                w-[90px]
                                                p-3 text-center
                                                text-[var(--color-text-primary)]
                                            "
                                        >
                                            {p.stock}
                                        </TableCell>

                                        <TableCell
                                            className="
                                                max-w-[130px]
                                                w-[130px]
                                                truncate p-3 text-center
                                                text-[var(--color-text-secondary)]
                                            "
                                        >
                                            {p.brand?.nombre || "-"}
                                        </TableCell>

                                        <TableCell
                                            className="
                                                w-[130px]
                                                p-3 text-center
                                                text-[var(--color-text-tertiary)]
                                            "
                                        >
                                            -
                                        </TableCell>

                                        <TableCell
                                            className="
                                                w-[70px]
                                                p-3 text-center
                                            "
                                        >
                                            <div className="flex justify-center">
                                                {p.isActive ? (
                                                    <Check
                                                        className="
                                                            h-5 w-5
                                                            text-[var(--color-success)]
                                                        "
                                                    />
                                                ) : (
                                                    <X
                                                        className="
                                                            h-5 w-5
                                                            text-[var(--color-error)]
                                                        "
                                                    />
                                                )}
                                            </div>
                                        </TableCell>

                                        <TableCell
                                            className="
                                                w-[70px]
                                                p-3 text-center
                                            "
                                        >
                                            <div className="flex justify-center">
                                                {p.esNuevo ? (
                                                    <Check
                                                        className="
                                                            h-5 w-5
                                                            text-[var(--color-success)]
                                                        "
                                                    />
                                                ) : (
                                                    <X
                                                        className="
                                                            h-5 w-5
                                                            text-[var(--color-error)]
                                                        "
                                                    />
                                                )}
                                            </div>
                                        </TableCell>

                                        <TableCell
                                            className="
                                                w-[70px]
                                                p-3 text-center
                                            "
                                        >
                                            <div className="flex justify-center">
                                                {p.esDestacado ? (
                                                    <Check
                                                        className="
                                                            h-5 w-5
                                                            text-[var(--color-success)]
                                                        "
                                                    />
                                                ) : (
                                                    <X
                                                        className="
                                                            h-5 w-5
                                                            text-[var(--color-error)]
                                                        "
                                                    />
                                                )}
                                            </div>
                                        </TableCell>

                                        <TableCell
                                            className="
                                                w-[80px]
                                                p-3 text-center
                                            "
                                        >
                                            <ProductMenuAction
                                                productId={p._id}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}

                                {Array.from({
                                    length: emptyRows,
                                }).map((_, index) => (
                                    <TableRow
                                        key={`empty-row-${index}`}
                                        className="
                                            border-b
                                            border-[var(--color-border-subtle)]
                                        "
                                    >
                                        {Array.from({
                                            length: 10,
                                        }).map((_, cellIndex) => (
                                            <TableCell
                                                key={cellIndex}
                                                className="h-[62px]"
                                            />
                                        ))}
                                    </TableRow>
                                ))}
                            </>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}