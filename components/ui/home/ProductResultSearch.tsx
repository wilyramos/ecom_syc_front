"use client";

import Link from "next/link";
import Image from "next/image";
import type { TProductListSchema } from "@/src/schemas";
import { MdOutlineImageNotSupported } from "react-icons/md";

interface Props {
    item: TProductListSchema;
}

export default function ProductResultSearch({ item }: Props) {
    const precio = item.precio ?? 0;
    const imagen = item.imagenes?.[0];
    const tieneDescuento = (item.precioComparativo ?? 0) > precio;

    return (
        <Link
            href={`/productos/${item.slug}`}
            className="
                group relative flex flex-col p-3 rounded-2xl transition-all duration-300
                bg-transparent hover:bg-[var(--store-surface-hover)]
            "
        >
            {/* --- IMAGEN CON FONDO "ATHENS GRAY" --- */}
            <div className="relative aspect-square w-full mb-3">
                {imagen ? (
                    <Image
                        src={imagen}
                        alt={item.nombre}
                        fill
                        sizes="(max-width: 640px) 33vw, 20vw"
                        className="object-contain p-3 transition-transform duration-500 group-hover:scale-105 mix-blend-multiply"
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full text-[var(--store-text-muted)]">
                        <MdOutlineImageNotSupported size={20} />
                    </div>
                )}
            </div>

            {/* --- INFORMACIÓN --- */}
            <div className="flex flex-col gap-1.5">
                {/* Marca: Texto Muted + Tracking Apple */}
                {item.brand && (
                    <span className="text-[9px] font-bold text-[var(--color-text-primary)] uppercase tracking-[0.15em] truncate">
                        {typeof item.brand === 'object' ? item.brand.nombre : ''}
                    </span>
                )}

                {/* Título: Seminegro */}
                <h4 className="text-xs font-medium text-[var(--color-text-secondary)] line-clamp-2 leading-snug min-h-[2.4em]">
                    {item.nombre}
                </h4>

                {/* Precios */}
                <div className="flex items-baseline gap-2 mt-auto">
                    <span className="text-sm font-bold text-[var(--color-text-primary)]">
                        S/ {precio.toFixed(2)}
                    </span>

                    {tieneDescuento && (
                        <span className="text-[10px] text-[var(--color-text-tertiary)] line-through decoration-[var(--color-text-tertiary)]">
                            S/ {item.precioComparativo?.toFixed(2)}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}