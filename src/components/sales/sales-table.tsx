/* File: frontend/src/components/sales/sales-table.tsx */
"use client";

import { Sale, SaleItem } from "@/src/schemas/sale.schema";
import { SaleDetailsModal } from "./sale-details-modal";
import { cn } from "@/lib/utils";
import { Package } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const statusStyles: Record<string, string> = {
    COMPLETED: "bg-emerald-50 text-emerald-700 border-emerald-200",
    REFUNDED: "bg-red-50 text-red-700 border-red-200",
    QUOTE: "bg-blue-50 text-blue-700 border-blue-200",
    CANCELED: "bg-gray-100 text-gray-600 border-gray-200",
    PARTIALLY_REFUNDED: "bg-amber-50 text-amber-700 border-amber-200",
};

/**
 * Formateador determinista forzado a UTC-5 (Perú).
 * Extrae partes numéricas para evitar caracteres invisibles (NNBSP \u202F)
 * que provocan errores de hidratación entre SSR y el navegador.
 */
function formatPeruDate(dateInput: Date | string | undefined): string {
    if (!dateInput) return "-";
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return "-";

    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Lima",
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    }).formatToParts(date);

    const get = (type: string) => parts.find((p) => p.type === type)?.value || "";

    const day = get("day");
    const month = get("month");
    const year = get("year");
    const hour = get("hour");
    const minute = get("minute");
    const dayPeriod = get("dayPeriod").toLowerCase(); // "am" o "pm"

    return `${day}/${month}/${year}, ${hour}:${minute} ${dayPeriod}`;
}

function getProductName(item: SaleItem): string {
    if (typeof item.product === "object" && item.product?.nombre) {
        return item.product.nombre;
    }
    return "Producto";
}

export function SalesTable({ initialData }: { initialData: Sale[] }) {
    return (
        <div className="w-full bg-[var(--color-bg-primary)] rounded-2xl border border-[var(--color-border-default)] shadow-xs overflow-hidden">
            <Table className="w-full text-sm">
                <TableHeader className="bg-[var(--color-bg-secondary)] border-b border-[var(--color-border-default)]">
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="px-4 py-3 text-[11px] font-black uppercase text-[var(--color-text-secondary)]">Fecha / Hora</TableHead>
                        <TableHead className="px-4 py-3 text-[11px] font-black uppercase text-[var(--color-text-secondary)]">Comprobante</TableHead>
                        <TableHead className="px-4 py-3 text-[11px] font-black uppercase text-[var(--color-text-secondary)]">Cliente</TableHead>
                        <TableHead className="px-4 py-3 text-[11px] font-black uppercase text-[var(--color-text-secondary)] min-w-[220px]">Productos</TableHead>
                        <TableHead className="px-4 py-3 text-[11px] font-black uppercase text-[var(--color-text-secondary)]">Método</TableHead>
                        <TableHead className="px-4 py-3 text-[11px] font-black uppercase text-[var(--color-text-secondary)]">Estado</TableHead>
                        <TableHead className="px-4 py-3 text-[11px] font-black uppercase text-[var(--color-text-secondary)] text-right">Total</TableHead>
                        <TableHead className="px-4 py-3 text-[11px] font-black uppercase text-[var(--color-text-secondary)] text-center">Acción</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody className="divide-y divide-[var(--color-border-subtle)]">
                    {initialData.length === 0 ? (
                        <TableRow className="hover:bg-transparent">
                            <TableCell colSpan={8} className="px-4 py-12 text-center text-[var(--color-text-tertiary)]">
                                <Package size={32} className="mx-auto mb-2 opacity-30" />
                                <p className="text-xs font-bold uppercase tracking-widest">No se encontraron ventas con los filtros aplicados</p>
                            </TableCell>
                        </TableRow>
                    ) : (
                        initialData.map((sale) => {
                            const firstItems = sale.items.slice(0, 2);
                            const remainingCount = sale.items.length - 2;

                            return (
                                <TableRow
                                    key={sale._id}
                                    className="hover:bg-[var(--color-bg-secondary)] transition-colors border-b border-[var(--color-border-subtle)]"
                                >
                                    {/* Fecha con suppressHydrationWarning */}
                                    <TableCell 
                                        className="px-4 py-3 text-xs text-[var(--color-text-secondary)] whitespace-nowrap"
                                        suppressHydrationWarning
                                    >
                                        {formatPeruDate(sale.createdAt)}
                                    </TableCell>

                                    {/* Comprobante */}
                                    <TableCell className="px-4 py-3 font-mono text-xs font-black text-[var(--color-text-primary)] whitespace-nowrap">
                                        {sale.receiptNumber || "—"}
                                    </TableCell>

                                    {/* Cliente */}
                                    <TableCell className="px-4 py-3">
                                        <div className="flex flex-col min-w-[130px]">
                                            <span className="font-bold text-xs text-[var(--color-text-primary)] truncate">
                                                {sale.customerSnapshot?.nombre || "Clientes Varios"}
                                            </span>
                                            <span className="text-[10px] text-[var(--color-text-tertiary)] font-mono">
                                                {sale.customerSnapshot?.numeroDocumento || "Sin Documento"}
                                            </span>
                                        </div>
                                    </TableCell>

                                    {/* Productos incluidos */}
                                    <TableCell className="px-4 py-3">
                                        <div className="flex flex-col gap-1 max-w-[280px]">
                                            {firstItems.map((item, idx) => (
                                                <div
                                                    key={`${sale._id}-item-${idx}`}
                                                    className="flex items-center gap-1.5 text-xs text-[var(--color-text-primary)] truncate"
                                                >
                                                    <span className="bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] px-1.5 py-0.2 rounded text-[10px] font-black text-[var(--color-text-secondary)]">
                                                        {item.quantity}x
                                                    </span>
                                                    <span className="truncate" title={getProductName(item)}>
                                                        {getProductName(item)}
                                                    </span>
                                                </div>
                                            ))}
                                            {remainingCount > 0 && (
                                                <span className="text-[10px] font-bold text-[var(--color-accent)] pl-6">
                                                    +{remainingCount} producto{remainingCount > 1 ? "s" : ""} más...
                                                </span>
                                            )}
                                        </div>
                                    </TableCell>

                                    {/* Método de Pago */}
                                    <TableCell className="px-4 py-3 text-xs whitespace-nowrap">
                                        <span className="bg-[var(--color-bg-secondary)] px-2 py-1 rounded-md border border-[var(--color-border-subtle)] text-[10px] font-bold text-[var(--color-text-secondary)] uppercase">
                                            {sale.paymentMethod}
                                        </span>
                                    </TableCell>

                                    {/* Estado */}
                                    <TableCell className="px-4 py-3 whitespace-nowrap">
                                        <span className={cn(
                                            "px-2 py-0.5 rounded-full text-[10px] font-black border tracking-wide uppercase",
                                            statusStyles[sale.status] || "bg-gray-100 text-gray-700 border-gray-200"
                                        )}>
                                            {sale.status}
                                        </span>
                                    </TableCell>

                                    {/* Total */}
                                    <TableCell className="px-4 py-3 text-right font-black text-xs text-[var(--color-text-primary)] whitespace-nowrap">
                                        S/ {sale.totalPrice.toFixed(2)}
                                    </TableCell>

                                    {/* Modal Detalle */}
                                    <TableCell className="px-4 py-3 text-center whitespace-nowrap">
                                        <SaleDetailsModal sale={sale} />
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    )}
                </TableBody>
            </Table>
        </div>
    );
}