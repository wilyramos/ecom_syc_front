"use client";

import type { TOrder } from "@/src/schemas";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import OrderStatusBadge from "@/components/ui/OrderStatusBadge";
import PaymentStatusBadge from "@/components/ui/PaymentStatusBadge";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { FaEye } from "react-icons/fa";

interface OrdersTableProps {
    orders: TOrder[];
}

export default function OrdersTable({ orders }: OrdersTableProps) {
    if (!orders || orders.length === 0) {
        return (
            <div className="flex justify-center items-center py-12 bg-[var(--color-bg-primary)]">
                <h2 className="text-sm font-medium text-[var(--color-text-secondary)]">
                    No hay pedidos disponibles.
                </h2>
            </div>
        );
    }

    return (
        <div className="w-full overflow-x-auto touch-pan-x bg-[var(--color-bg-primary)]">
            <Table className="min-w-[850px] w-full table-auto border-separate border-spacing-0 text-sm text-[var(--color-text-secondary)]">
                <TableHeader className="bg-[var(--color-bg-secondary)] border-b border-[var(--color-border-default)]">
                    <TableRow>
                        <TableHead className="p-3 text-center w-[100px] font-semibold text-[var(--color-text-primary)]">
                            Pedido
                        </TableHead>
                        <TableHead className="p-3 text-center w-[130px] font-semibold text-[var(--color-text-primary)]">
                            Fecha
                        </TableHead>
                        <TableHead className="p-3 text-center w-[140px] font-semibold text-[var(--color-text-primary)]">
                            Pago
                        </TableHead>
                        <TableHead className="p-3 text-left w-[240px] font-semibold text-[var(--color-text-primary)]">
                            Envío
                        </TableHead>
                        <TableHead className="p-3 text-center w-[120px] font-semibold text-[var(--color-text-primary)]">
                            Estado
                        </TableHead>
                        <TableHead className="p-3 text-center w-[80px] font-semibold text-[var(--color-text-primary)]">
                            Opciones
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {orders.map((order) => (
                        <TableRow
                            key={order._id}
                            className="border-b border-[var(--color-border-subtle)] hover:bg-[var(--color-bg-secondary)] transition-colors duration-150"
                        >
                            {/* Número de Pedido */}
                            <TableCell className="p-3 text-center font-semibold text-[var(--color-text-primary)]">
                                <Link
                                    href={`/admin/orders/${order._id}`}
                                    className="hover:text-[var(--color-accent-hover)] hover:underline transition-colors"
                                >
                                    {order.orderNumber || order._id.slice(0, 8)}
                                </Link>
                            </TableCell>

                            {/* Fecha */}
                            <TableCell className="p-3 text-center text-[var(--color-text-secondary)] whitespace-nowrap">
                                {formatDate(order.createdAt)}
                            </TableCell>

                            {/* Pago (Monto + Badge) */}
                            <TableCell className="p-3 text-center">
                                <div className="flex flex-col items-center gap-1.5">
                                    <span className="font-semibold text-[var(--color-text-primary)]">
                                        S/. {order.totalPrice.toFixed(2)}
                                    </span>
                                    <PaymentStatusBadge status={order.payment.status} />
                                </div>
                            </TableCell>

                            {/* Dirección de Envío */}
                            <TableCell className="p-3 text-left text-[var(--color-text-secondary)] max-w-[240px] truncate">
                                {order.shippingAddress?.direccion && (
                                    <>
                                        {order.shippingAddress.direccion}
                                        <span className="block text-xs text-[var(--color-text-tertiary)] font-medium">
                                            {order.shippingAddress.distrito}
                                        </span>
                                    </>
                                )}
                            </TableCell>

                            {/* Estado del Pedido */}
                            <TableCell className="p-3 text-center">
                                <div className="flex justify-center">
                                    <OrderStatusBadge status={order.status} />
                                </div>
                            </TableCell>

                            {/* Opciones */}
                            <TableCell className="p-3 text-center">
                                <div className="flex justify-center">
                                    <Link
                                        href={`/admin/orders/${order._id}`}
                                        className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors p-1"
                                    >
                                        <FaEye className="w-4 h-4" />
                                    </Link>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}