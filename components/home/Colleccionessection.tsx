// File: frontend/components/home/ColleccionesSection.tsx

import Link from "next/link";
import Image from "next/image";
import { getActiveCollections } from "@/src/services/collection-service";
import HeaderConTituloConControles from "../ui/HeaderConTituloConControles";

export default async function ColleccionesSection() {
    const collections = await getActiveCollections();
    if (!collections || collections.length === 0) return null;

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
            <HeaderConTituloConControles
                label="Selecciones"
                title="Colecciones"
                viewAllHref="/colecciones"
            />

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6">
                {collections.slice(0, 4).map((col, i) => (
                    <Link
                        key={col._id}
                        href={`/colecciones/${col.slug}`}
                        className="group relative overflow-hidden rounded-lg border transition-shadow duration-200 hover:shadow-md"
                        style={{
                            backgroundColor: col.color ?? "var(--color-bg-secondary)",
                            borderColor: "var(--color-border-subtle)",
                            minHeight: "110px",
                        }}
                    >
                        {/* Imagen de fondo — ocupa todo */}
                        {col.image && (
                            <Image
                                src={col.image}
                                alt={col.name}
                                fill
                                unoptimized
                                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 768px) 50vw, 33vw"
                            />
                        )}

                        {/* Overlay degradado para legibilidad del texto */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                        {/* Texto encima */}
                        <div className="relative z-10 flex flex-col justify-between h-full px-4 py-3">
                            <span className="text-[9px] font-black tabular-nums text-white/40">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <div>
                                <p className="text-sm font-bold text-white leading-tight" style={{ letterSpacing: "-0.01em" }}>
                                    {col.name}
                                </p>
                                <span className="text-[11px] font-bold text-white/0 group-hover:text-white/80 transition-colors duration-200 block mt-0.5">
                                    Explorar →
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}