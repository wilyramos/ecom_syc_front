"use client";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import Link from "next/link";
import { ImageOff, ChevronRight } from "lucide-react";
import HeaderConTituloConControles from "../ui/HeaderConTituloConControles";
import type { CategoryListResponse } from "@/src/schemas";
import { routes } from "@/lib/routes";

export default function ClientCarouselCategorias({ categorias }: { categorias: CategoryListResponse }) {
    const responsive = {
        desktop: { breakpoint: { max: 3000, min: 1280 }, items: 6 },
        laptop: { breakpoint: { max: 1280, min: 1024 }, items: 4 },
        tablet: { breakpoint: { max: 1024, min: 640 }, items: 3 },
        mobile: { breakpoint: { max: 640, min: 0 }, items: 2, partialVisibilityGutter: 20 }
    };

    return (
        <section className="w-full max-w-screen-2xl mx-auto px-4 md:px-8 ">
            {/* Encabezado sin rellenos internos, solo margen inferior */}
            <HeaderConTituloConControles
                viewAllHref="/categorias"
                title={
                    <>
                        Categorías
                    </>
                }
            />

            <Carousel
                responsive={responsive}
                infinite
                autoPlay
                autoPlaySpeed={6000}
                arrows={false}
                itemClass="p-6 md:p-10"
                containerClass="w-full"
                partialVisible
                draggable
                swipeable
            >
                {categorias.map(c => (
                    <Link
                        key={c._id}
                        href={routes.catalog({ category: c.slug })}
                        className="group flex flex-col transition-all duration-500"
                    >
                        {/* Contenedor de Imagen Limpio */}
                        <div className="relative aspect-square overflow-hidden bg-[var(--color-bg-secondary)] rounded-sm">
                            {c.image ? (
                                <Image
                                    src={c.image}
                                    alt={c.nombre}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    unoptimized
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-[var(--color-text-tertiary)] opacity-20">
                                    <ImageOff size={40} strokeWidth={1} />
                                </div>
                            )}
                        </div>

                        {/* Textos con altura fija mínima para evitar saltos */}
                        <div className="mt-4 flex items-center justify-center gap-1 min-h-[2.5rem]">
                            <h3 className="text-lg font-norma text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors duration-300">
                                {c.nombre}
                            </h3>
                            <ChevronRight
                                size={16}
                                className="text-[var(--color-text-tertiary)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                            />
                        </div>
                    </Link>
                ))}
            </Carousel>
        </section>
    );
}