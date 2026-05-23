"use client";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import Link from "next/link";
import { ImageOff } from "lucide-react";
import type { TBrand } from "@/src/schemas/brands";
import HeaderConTituloConControles from "../ui/HeaderConTituloConControles";
import { routes } from "@/lib/routes";

export default function BrandsCarousel({ brands }: { brands: TBrand[] }) {
    const responsive = {
        desktop: { breakpoint: { max: 3000, min: 1280 }, items: 6 },
        laptop: { breakpoint: { max: 1280, min: 1024 }, items: 5 },
        tablet: { breakpoint: { max: 1024, min: 640 }, items: 4 },
        mobile: { breakpoint: { max: 640, min: 0 }, items: 3, partialVisibilityGutter: 20 }
    };

    if (!brands.length) return null;

    return (
        <section className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-10">
            {/* Encabezado Estandarizado */}
            <HeaderConTituloConControles 
                title="Marcas" 
                viewAllHref="/catalogo"
            />

            <div className="mt-6">
                <Carousel 
                    responsive={responsive} 
                    infinite 
                    autoPlay 
                    autoPlaySpeed={4800}
                    arrows={false} 
                    itemClass="px-2"
                    containerClass="w-full"
                    partialVisible
                    draggable
                    swipeable
                >
                    {brands.map(b => (
                        <Link 
                            key={b._id} 
                            href={routes.catalog({ brand: b.slug })}
                            className="group relative flex items-center justify-center py-4"
                        >
                            <div className="relative h-12 md:h-16 w-full flex items-center justify-center">
                                {b.logo ? (
                                    <Image 
                                        src={b.logo} 
                                        alt={b.nombre} 
                                        fill 
                                        className="object-contain transition-transform duration-700 group-hover:scale-105" 
                                        unoptimized
                                    />
                                ) : (
                                    <div className="flex flex-col items-center text-[var(--color-text-tertiary)] opacity-30">
                                        <ImageOff size={16} strokeWidth={1.5} />
                                        <span className="text-[10px] font-bold uppercase tracking-widest mt-1">{b.nombre}</span>
                                    </div>
                                )}
                            </div>
                        </Link>
                    ))}
                </Carousel>
            </div>
        </section>
    );
}