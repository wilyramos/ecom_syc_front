'use client';

import { ProductWithCategoryResponse, VariantCart } from "@/src/schemas";
import { FaWhatsapp } from "react-icons/fa";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface Props {
    product: ProductWithCategoryResponse;
    variant?: VariantCart;
    disabled?: boolean;
}

export default function ShopNowButton({ product, variant, disabled }: Props) {
    const stock = variant?.stock ?? product.stock ?? 0;

    // Validaciones de estado
    const hasVariants = product.variants && product.variants.length > 0;
    const isSelectionIncomplete = hasVariants && !variant;
    const isVisuallyDisabled = disabled || stock <= 0 || isSelectionIncomplete;

    const handleWhatsAppRedirect = () => {
        // 1. Validaciones previas
        if (isSelectionIncomplete) {
            toast.error("Por favor, selecciona las opciones del producto.");
            return;
        }

        if (stock <= 0) {
            toast.error("Este producto no tiene stock disponible.");
            return;
        }

        // 2. Construcción del mensaje
        const precioFinal = variant?.precio ?? product.precio ?? 0;

        // Formatear detalles de la variante (ej: "Color: Negro, Almacenamiento: 128GB")
        const detallesVariante = variant?.atributos
            ? Object.entries(variant.atributos)
                .map(([key, val]) => `*${key}:* ${val}`)
                .join("\n")
            : "";

        const mensaje = `Hola GoPhone! Me interesa comprar este producto:
\n*Producto:* ${product.nombre}
${detallesVariante ? detallesVariante + "\n" : ""}*Precio:* S/ ${precioFinal.toFixed(2)}
\n¿Podrían confirmarme la disponibilidad para concretar el pedido?`;

        // 3. Generar URL y redireccionar
        const whatsappUrl = `https://wa.me/51972416683?text=${encodeURIComponent(mensaje)}`;

        toast.success("Redirigiendo a WhatsApp...");
        window.open(whatsappUrl, '_blank');
    };

    return (
        <Button
            onClick={handleWhatsAppRedirect}
            disabled={isVisuallyDisabled}
            // Usamos un estilo verde esmeralda para evocar WhatsApp pero respetando tu sistema
            className={`w-full gap-2 transition-transform active:scale-95 ${stock <= 0
                ? "bg-[var(--color-error-light)] text-[var(--color-error)]"
                : "bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-lg shadow-green-500/20"
                }`}
        >
            {stock <= 0 ? (
                "Agotado"
            ) : (
                <>
                    <FaWhatsapp size={20} />
                    <span className="font-bold">Comprar por WhatsApp</span>
                </>
            )}
        </Button>
    );
}