"use client";

import { useCartStore } from "@/src/store/cartStore";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";
import type { TApiProduct } from "@/src/schemas";
import { useState } from "react";

interface Props {
    product: TApiProduct;
}

export default function AddToCartButton({ product }: Props) {
    const [isAdding, setIsAdding] = useState(false);
    const addToCart = useCartStore((state) => state.addToCart);
    const setCartOpen = useCartStore((state) => state.setCartOpen);

    const stock = product.stock ?? 0;
    const isOutOfStock = stock <= 0;

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isOutOfStock) {
            toast.error("Producto agotado");
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
                <Loader2 className="w-4 h-4 animate-spin" />
            ) : isOutOfStock ? (
                "Agotado"
            ) : (
                <>
                    <ShoppingCart className="w-4 h-4 mr-2 text-xs md:text-sm" />
                    <span>Agregar al Carrito</span>
                </>
            )}
        </Button>
    );
}