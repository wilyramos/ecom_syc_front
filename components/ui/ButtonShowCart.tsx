"use client";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import { ShoppingCart, MessageCircle } from "lucide-react";
import { useCartStore } from "@/src/store/cartStore";
import ItemCarrito from "../cart/ItemCarrito";
import { toast } from "sonner";
import { Button } from '@/components/ui/button';
import { IoMdCart } from "react-icons/io";


export default function ButtonShowCart() {
    const carrito = useCartStore((state) => state.cart);
    const isCartOpen = useCartStore((state) => state.isCartOpen);
    const setCartOpen = useCartStore((state) => state.setCartOpen);

    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0).toLocaleString('es-PE', { minimumFractionDigits: 2 });

    const handleCheckout = () => {
        if (carrito.length === 0) {
            toast.error("Tu carrito está vacío.");
            return;
        }

        const itemsMessage = carrito.map(item => {
            const variantInfo = item.variant
                ? Object.entries(item.variant.atributos)
                    .map(([key, val]) => `${key}: ${val}`)
                    .join(", ")
                : "";

            return `• ${item.nombre} ${variantInfo ? `(${variantInfo})` : ""} \n  Cant: ${item.cantidad} - Subtotal: S/ ${(item.precio * item.cantidad).toFixed(2)}`;
        }).join("\n\n");

        const message = `Hola S&C Mobile! 📱 Me gustaría realizar el siguiente pedido:\n\n${itemsMessage}\n\n*Total a pagar: S/ ${total}*\n\n¿Podrían confirmarme la disponibilidad para coordinar el pago y envío?`;
        const whatsappUrl = `https://wa.me/51972416683?text=${encodeURIComponent(message)}`;

        setCartOpen(false);
        window.open(whatsappUrl, '_blank');
    };

    return (
        <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
            <SheetTrigger asChild>
                <button className="relative p-2 rounded-full transition-all duration-300 hover:bg-[var(--color-bg-secondary)] group cursor-pointer active:scale-95">
                    <IoMdCart
                        size={20}
                        className="text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors"
                    />
                    {carrito.length > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 bg-[var(--color-accent)] text-[var(--color-text-inverse)] text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-sm animate-in zoom-in duration-200">
                            {carrito.length}
                        </span>
                    )}
                </button>
            </SheetTrigger>

            <SheetContent
                side="right"
                className="flex flex-col h-full p-0 border-l border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] overflow-hidden"
            >
                <SheetHeader className="p-5 border-b border-[var(--color-border-subtle)]">
                    <div className="flex items-center justify-between">
                        <SheetTitle className="text-lg font-bold text-[var(--color-text-primary)]">
                            Carrito
                        </SheetTitle>
                        <span className="bg-[var(--color-bg-tertiary)] px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[var(--color-text-secondary)]">
                            {carrito.length} {carrito.length === 1 ? 'Ítem' : 'Ítems'}
                        </span>
                    </div>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto overflow-x-hidden px-5 py-2 scrollbar-hide">
                    {carrito.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center space-y-4">
                            <div className="p-6 rounded-full bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)]">
                                <ShoppingCart size={40} strokeWidth={1.5} />
                            </div>
                            <div className="text-center space-y-1">
                                <h3 className="text-md font-bold text-[var(--color-text-primary)] tracking-tight">
                                    Tu Carrito está vacío
                                </h3>
                                <p className="text-xs text-[var(--color-text-secondary)] max-w-[200px] mx-auto">
                                    Explora nuestra tienda y añade los mejores productos.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="divide-y divide-[var(--color-border-subtle)]">
                            {carrito.map((item) => (
                                <div
                                    key={`${item._id}-${item.variant?._id ?? "no-variant"}`}
                                    className="py-3 w-full overflow-hidden"
                                >
                                    <ItemCarrito item={item} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {carrito.length > 0 && (
                    <div className="p-5 bg-[var(--color-bg-primary)] border-t border-[var(--color-border-default)]">
                        <div className="flex justify-between items-baseline mb-4">
                            <span className="text-md font-bold tracking-tight text-[var(--color-text-primary)]">Total</span>
                            <span className="text-lg font-bold text-[var(--color-text-primary)] tracking-tight">
                                S/ {total}
                            </span>
                        </div>

                        <div className="grid gap-2">
                            <Button
                                onClick={handleCheckout}
                                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold transition-colors duration-200 shadow-sm flex items-center justify-center gap-2 h-10"
                            >
                                Pedir por WhatsApp <MessageCircle size={18} />
                            </Button>

                            <button
                                onClick={() => setCartOpen(false)}
                                className="w-full py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
                            >
                                Continuar Explorando
                            </button>
                        </div>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}