import Link from "next/link";
import Image from "next/image";
import { getActiveCollections } from "@/src/services/collection-service";
import type { Metadata } from "next";
import type { Collection } from "@/src/schemas/collection.schema";

export const metadata: Metadata = {
    title: "Colecciones | S&C Mobile",
    description: "Explora nuestras colecciones temáticas de productos en S&C Mobile.",
};

function CollectionCard({ col }: { col: Collection }) {
    const heroImage = col.bannerImage || col.image;

    return (
        <Link
            href={`/colecciones/${col.slug}`}
            className="group relative block aspect-[16/9] overflow-hidden rounded-lg border border-[var(--color-border-subtle)] transition-all duration-200 hover:shadow-md"
            style={{ backgroundColor: col.color ?? "var(--color-bg-secondary)" }}
        >
            {heroImage && (
                <Image
                    src={heroImage}
                    alt={col.name}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
            )}

            {/* Gradiente sutil inferior para legibilidad del texto */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Contenido superpuesto */}
            <div className="absolute inset-0 flex flex-col justify-end p-3 z-10">
                <div className="flex items-center gap-1.5 min-w-0">
                    {col.icon && (
                        <span className="text-sm shrink-0" aria-hidden="true">
                            {col.icon}
                        </span>
                    )}
                    <p className="text-sm font-bold text-white truncate leading-tight">
                        {col.name}
                    </p>
                </div>
                {col.description && (
                    <p className="text-[11px] text-white/80 line-clamp-1 mt-0.5">
                        {col.description}
                    </p>
                )}
            </div>
        </Link>
    );
}

export default async function CollectionsIndexPage() {
    const collections = await getActiveCollections();

    return (
        <section className="container mx-auto px-4 md:px-6 max-w-[1440px] py-8 space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-foreground mb-1">Colecciones</h1>
                <p className="text-sm text-muted-foreground">
                    Explora nuestras selecciones temáticas
                </p>
            </div>

            {collections.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                    No hay colecciones disponibles por el momento.
                </p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {collections.map(col => (
                        <CollectionCard key={col._id} col={col} />
                    ))}
                </div>
            )}
        </section>
    );
}