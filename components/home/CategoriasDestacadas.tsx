"use client";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import Link from "next/link";
import { ImageOff, ChevronRight } from "lucide-react";
import type { CategoryListResponse } from "@/src/schemas/category.schema";
import { routes } from "@/lib/routes";

export default function ClientCarouselCategorias({ categorias }: { categorias: CategoryListResponse }) {
    const responsive = {
        desktop: { breakpoint: { max: 3000, min: 1280 }, items: 6 },
        laptop: { breakpoint: { max: 1280, min: 1024 }, items: 5 },
        tablet: { breakpoint: { max: 1024, min: 640 }, items: 4 },
        mobile: { breakpoint: { max: 640, min: 0 }, items: 4, partialVisibilityGutter: 10 }
    };

    return (
        <section className="w-full max-w-screen-2xl mx-auto px-4 md:px-12">
         

            <Carousel
                responsive={responsive}
                infinite
                autoPlay
                autoPlaySpeed={6000}
                arrows={false}
                itemClass="px-2 md:px-3"
                containerClass="w-full"
                partialVisible
                draggable
                swipeable
            >
                {categorias.map(c => (
                    <Link
                        key={c._id}
                        href={routes.catalog({ category: c.slug })}
                        className="group flex flex-col items-center text-center transition-all duration-300"
                    >
                        {/* Contenedor de Imagen Limpio */}
                        <div className="relative w-full aspect-square overflow-hidden  transition-all duration-300 ">
                            {c.image ? (
                                <Image
                                    src={c.image}
                                    alt={c.nombre}
                                    fill
                                    className="object-cover p-2 md:p-4 transition-transform duration-500 group-hover:scale-105"
                                    unoptimized
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-[var(--color-text-tertiary)] opacity-30">
                                    <ImageOff size={32} strokeWidth={1} />
                                </div>
                            )}
                        </div>

                        {/* Texto centrado */}
                        <div className="mt-3 flex items-center justify-center gap-0.5 min-h-[2rem] w-full px-1">
                            <h3 className="text-xs md:text-sm font-medium text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors duration-200 line-clamp-1">
                                {c.nombre}
                            </h3>
                            <ChevronRight
                                size={14}
                                className="text-[var(--color-accent)] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 hidden md:block"
                            />
                        </div>
                    </Link>
                ))}
            </Carousel>
        </section>
    );
}