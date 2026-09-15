"use client";

import { useCartStore } from "@/src/store/cartStore";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";
import type { TApiProduct } from "@/src/schemas";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useRouter } from "next/navigation";

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
            toast.info("Por favor, selecciona las variantes antes de añadir al carrito.");
            router.push(`/productos/${product.slug}`);
            return;
        }

        setIsAdding(true);
        addToCart(product as TApiProduct);

        // Simulación de feedback inmediato
        await new Promise((resolve) => setTimeout(resolve, 600));

        toast.success("Añadido al carrito");
        setIsAdding(false);
        setCartOpen(true);
    };

    return (
        <Button
            onClick={handleClick}
            disabled={isOutOfStock || isAdding}
            variant={isOutOfStock ? "outline" : "default"}
            size="sm"
            className={`
                w-full transition-all duration-300 rounded-full font-medium tracking-wide
                ${isOutOfStock
                    ? "opacity-50 cursor-not-allowed border-dashed"
                    : "hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md"
                }
            `}
        >
            {isAdding ? (
                <Loader2 className="w-2 h-2 md:w-4 md:h-4 animate-spin" />
            ) : isOutOfStock ? (
                "Agotado"
            ) : (
                <>
                    <div className="flex items-center justify-center gap-1.5">
                        <ShoppingCart className="md:hidden w-4 h-4" />
                        {!hasVariants && <FaPlus className="hidden md:block" />}
                        <span className="hidden md:inline">
                            {hasVariants ? "Ver opciones" : "Agregar al Carrito"}
                        </span>
                    </div>
                </>
            )}
        </Button>
    );
}