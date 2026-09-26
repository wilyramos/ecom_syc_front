/* File: src/components/pos/CartSidebar.tsx 
    @Description: Panel de resumen de orden y checkout con variables de diseño estandarizadas. 
    Maneja flujos de Venta Real e impresión, y Proforma.
*/

"use client";

import {
    Trash2, Plus, Minus, CreditCard, Banknote,
    ChevronRight, ShoppingBag, X, Calculator, Loader2, Tag, FileText
} from "lucide-react";

// Stores
import { usePosStore } from "@/src/store/usePosStore";
import { useCheckoutStore } from "@/src/store/useCheckoutStore";
import { useCashStore } from "@/src/store/useCashStore";

// Utils
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface CartSidebarProps {
    onClose?: () => void;
    userId: string;
}

export const CartSidebar = ({ onClose }: CartSidebarProps) => {
    const {
        cart, total, subtotal, itemsCount,
        paymentMethod, totalDiscountAmount, totalSurchargeAmount,
        updateQuantity, removeFromCart, clearCart, setPaymentMethod
    } = usePosStore();

    const { isOpen, currentShiftId } = useCashStore();
    const { executeCheckout, executeQuote, isPending } = useCheckoutStore();

    const handlePayment = async () => {
        if (cart.length === 0) return toast.error("El carrito está vacío");
        if (!isOpen || !currentShiftId) return toast.error("Debe abrir turno de caja primero");

        const result = await executeCheckout(
            cart,
            { subtotal, total, discount: totalDiscountAmount, surcharge: totalSurchargeAmount },
            paymentMethod as "CASH" | "CARD"
        );

        if (result.success) {
            toast.success("Venta procesada con éxito");
            clearCart();
            onClose?.();
        } else {
            toast.error(result.message);
        }
    };

    const handleQuote = async () => {
        if (cart.length === 0) return toast.error("Agregue productos para proformar");
        if (!isOpen || !currentShiftId) return toast.error("Caja requerida para proformas");

        const result = await executeQuote(
            cart,
            { subtotal, total, discount: totalDiscountAmount, surcharge: totalSurchargeAmount }
        );

        if (result.success) {
            toast.success("Proforma guardada correctamente");
            clearCart();
            onClose?.();
        } else {
            toast.error(result.message);
        }
    };

    return (
        <div className="flex flex-col h-full bg-[var(--color-bg-primary)] shadow-2xl border-l border-[var(--color-border-default)] overflow-hidden">
            <header className="p-6 border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)]">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-[var(--color-bg-inverse)] text-[var(--color-text-inverse)] p-2.5 rounded-2xl shadow-lg">
                            <ShoppingBag size={20} />
                        </div>
                        <div>
                            <h2 className="text-sm font-black uppercase tracking-tight text-[var(--color-text-primary)]">Orden Actual</h2>
                            <p className="text-[10px] font-bold text-[var(--color-accent)] uppercase tracking-widest mt-0.5">
                                {itemsCount} productos en lista
                            </p>
                        </div>
                    </div>
                    {onClose && (
                        <button onClick={onClose} className="lg:hidden p-2 hover:bg-[var(--color-bg-tertiary)] rounded-full transition-colors text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] cursor-pointer">
                            <X size={20} />
                        </button>
                    )}
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[var(--color-bg-primary)] custom-scrollbar">
                {cart.length > 0 ? (
                    cart.map((item) => (
                        <div key={`${item.productId}-${item.variantId}`} className="flex flex-col gap-3 group animate-in slide-in-from-right-4 duration-300">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-[11px] font-black uppercase text-[var(--color-text-primary)] truncate leading-tight group-hover:text-[var(--color-accent)] transition-colors">
                                        {item.nombre}
                                    </h4>

                                    {item.atributos && Object.entries(item.atributos).length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                                            {Object.entries(item.atributos).map(([key, value]) => (
                                                <span key={key} className="flex items-center gap-1 px-2 py-0.5 bg-[var(--color-bg-tertiary)] text-[8px] font-bold text-[var(--color-text-secondary)] rounded-md border border-[var(--color-border-subtle)] uppercase">
                                                    <Tag size={8} className="text-[var(--color-accent)]" />
                                                    {key}: {value}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.productId, item.variantId)}
                                    className="p-1.5 text-[var(--color-text-tertiary)] hover:text-[var(--color-error)] hover:bg-[var(--color-error-light)] rounded-lg transition-all cursor-pointer"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            <div className="flex items-center justify-between bg-[var(--color-bg-secondary)] p-2 rounded-2xl border border-dashed border-[var(--color-border-default)]">
                                <div className="flex items-center gap-1 bg-[var(--color-bg-primary)] rounded-xl p-1 border border-[var(--color-border-subtle)] shadow-sm">
                                    <button
                                        disabled={item.quantity <= 1}
                                        onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                                        className="p-1.5 hover:bg-[var(--color-bg-secondary)] rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-all disabled:opacity-20 cursor-pointer"
                                    >
                                        <Minus size={12} strokeWidth={3} />
                                    </button>

                                    <span className="w-8 text-center text-[11px] font-black font-mono text-[var(--color-accent)]">
                                        {item.quantity}
                                    </span>

                                    <button
                                        disabled={item.quantity >= item.maxStock}
                                        onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                                        className="p-1.5 hover:bg-[var(--color-bg-secondary)] rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-all disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
                                        title={item.quantity >= item.maxStock ? `Máximo stock: ${item.maxStock}` : undefined}
                                    >
                                        <Plus size={12} strokeWidth={3} />
                                    </button>
                                </div>
                                <div className="text-right">
                                    <p className="text-[12px] font-black text-[var(--color-text-primary)] tracking-tighter">
                                        S/ {item.subtotal.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-[var(--color-text-tertiary)] space-y-4">
                        <div className="h-20 w-20 bg-[var(--color-bg-secondary)] rounded-full flex items-center justify-center border border-[var(--color-border-subtle)]">
                            <Calculator size={40} strokeWidth={1.5} className="text-[var(--color-text-tertiary)]" />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-tertiary)]">Carrito vacío</p>
                    </div>
                )}
            </div>

            {/* Footer con contraste alto (Fondo negro / inverso) */}
            <footer className="p-6 bg-[var(--color-bg-inverse)] text-[var(--color-text-inverse)] rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.15)] space-y-5 relative z-10">
                <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { id: 'CASH', label: 'Efectivo', icon: Banknote },
                            { id: 'CARD', label: 'Tarjeta', icon: CreditCard },
                        ].map((method) => (
                            <button
                                key={method.id}
                                onClick={() => setPaymentMethod(method.id)}
                                className={cn(
                                    "flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 transition-all duration-300 cursor-pointer",
                                    paymentMethod === method.id
                                        ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-text-inverse)] shadow-[0_4px_15px_rgba(48,152,179,0.4)]"
                                        : "border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] text-[var(--color-text-tertiary)] hover:border-[rgba(255,255,255,0.3)] hover:text-[var(--color-text-inverse)]"
                                )}
                            >
                                <method.icon size={16} />
                                <span className="text-[10px] font-black uppercase tracking-widest">{method.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-2 border-t border-[rgba(255,255,255,0.1)] pt-5">
                    <div className="flex justify-between items-center text-[var(--color-text-tertiary)]">
                        <span className="text-[10px] font-bold uppercase tracking-widest">Subtotal</span>
                        <span className="text-sm font-bold font-mono text-[var(--color-text-inverse)]">S/ {subtotal.toFixed(2)}</span>
                    </div>
                    {totalDiscountAmount > 0 && (
                        <div className="flex justify-between items-center text-[var(--color-accent)]">
                            <span className="text-[10px] font-bold uppercase tracking-widest">Descuento</span>
                            <span className="text-sm font-bold font-mono">- S/ {totalDiscountAmount.toFixed(2)}</span>
                        </div>
                    )}
                    <div className="flex justify-between items-center pt-2">
                        <span className="text-sm font-black uppercase tracking-tighter text-[var(--color-text-inverse)]">Monto Total</span>
                        <span className="text-3xl font-black tracking-tighter text-[var(--color-success)]">
                            S/ {total.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3">
                    <button
                        disabled={cart.length === 0 || isPending || !isOpen || !currentShiftId}
                        onClick={handlePayment}
                        className={cn(
                            "py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] font-black uppercase tracking-widest text-[11px] shadow-xl cursor-pointer",
                            cart.length > 0 && !isPending && isOpen && currentShiftId
                                ? "bg-[var(--color-success)] text-white hover:brightness-110 shadow-[0_4px_20px_rgba(16,185,129,0.4)]"
                                : "bg-[rgba(255,255,255,0.05)] text-[rgba(255,255,255,0.3)] cursor-not-allowed"
                        )}
                    >
                        {isPending ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            <div className="flex items-center gap-2">
                                <span>Cobrar</span>
                                <ChevronRight size={16} strokeWidth={3} />
                            </div>
                        )}
                    </button>

                    <button
                        disabled={cart.length === 0 || isPending || !isOpen || !currentShiftId}
                        onClick={handleQuote}
                        className="py-4 rounded-2xl flex items-center justify-center gap-2 border-2 border-[rgba(255,255,255,0.2)] text-[var(--color-text-tertiary)] hover:text-white hover:border-white hover:bg-[rgba(255,255,255,0.05)] transition-all font-bold uppercase tracking-widest text-[10px] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                        <FileText size={16} />
                        Proforma
                    </button>
                </div>

                {cart.length > 0 && !isPending && (
                    <button
                        onClick={clearCart}
                        className="w-full text-[10px] font-black uppercase text-[var(--color-text-tertiary)] hover:text-[var(--color-error)] transition-colors pt-3 pb-1 cursor-pointer tracking-widest"
                    >
                        Anular Orden
                    </button>
                )}
            </footer>
        </div>
    );
};