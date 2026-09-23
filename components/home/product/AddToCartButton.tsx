"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/src/store/cartStore";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";
import { FaPlus } from "react-icons/fa6";
import { cn } from "@/lib/utils"; // Asegúrate de tener esta utilidad (típica en shadcn)
import type { TApiProduct } from "@/src/schemas";

interface Props {
    product: TApiProduct;
}

export default function AddToCartButton({ product }: Props) {
    const [isAdding, setIsAdding] = useState(false);
    const addToCart = useCartStore((state) => state.addToCart);
    const setCartOpen = useCartStore((state) => state.setCartOpen);
    const router = useRouter();

    const stock = product.stock ?? 0;
    const isOutOfStock = stock <= 0;
    const hasVariants = product.variants && product.variants.length > 0;

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isOutOfStock) {
            toast.error("Producto agotado");
            return;
        }

        if (hasVariants) {
            toast.info("Por favor, selecciona las opciones antes de añadir.");
            router.push(`/productos/${product.slug}`);
            return;
        }

        setIsAdding(true);
        addToCart(product as TApiProduct);

        await new Promise((resolve) => setTimeout(resolve, 600));

        toast.success("Añadido al carrito");
        setIsAdding(false);
        setCartOpen(true);
    };

    return (
        <Button
            onClick={handleClick}
            disabled={isOutOfStock || isAdding}
            // Cambiamos la variante base dinámicamente para evitar conflictos con Tailwind
            variant={isOutOfStock ? "outline" : "default"}
            className={cn(
                "group relative w-full h-10 md:h-[42px] flex items-center justify-center overflow-hidden rounded-full font-semibold transition-all duration-300",
                "text-[11px] sm:text-xs md:text-sm", // Tipografía responsive
                
                // --- ESTADO: AGOTADO ---
                isOutOfStock && "opacity-60 cursor-not-allowed border-dashed bg-neutral-50 text-neutral-500 hover:bg-neutral-50 hover:text-neutral-500",
                
                // --- ESTADO: CON VARIANTES (Redirige) ---
                !isOutOfStock && hasVariants && "bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm hover:shadow-md hover:-translate-y-[1px] active:translate-y-0",
                
                // --- ESTADO: AGREGAR DIRECTO ---
                !isOutOfStock && !hasVariants && "bg-[var(--color-accent)] text-white hover:brightness-110 shadow-sm hover:shadow-[0_4px_12px_rgba(48,152,179,0.25)] hover:-translate-y-[1px] active:translate-y-0"
            )}
        >
            {isAdding ? (
                <div className="flex items-center gap-2 animate-in fade-in zoom-in duration-200">
                    <Loader2 className="w-4 h-4 md:w-4 md:h-4 animate-spin opacity-80" />
                    <span>Agregando...</span>
                </div>
            ) : isOutOfStock ? (
                <span className="uppercase  text-[10px] md:text-xs font-semibold">
                    Agotado
                </span>
            ) : (
                <div className="flex items-center justify-center gap-1.5 md:gap-2">
                    {hasVariants ? (
                        <ShoppingCart className="w-4 h-4 md:w-[18px] md:h-[18px] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" />
                    ) : (
                        <FaPlus className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform duration-300 group-hover:rotate-90" />
                    )}
                    <span>
                        {hasVariants ? "Ver opciones" : "Agregar al Carrito"}
                    </span>
                </div>
            )}
        </Button>
    );
}