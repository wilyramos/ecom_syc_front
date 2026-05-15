"use client";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "@/components/home/product/ProductCard";
import type { ProductResponse } from "@/src/schemas";
import HeaderConTituloConControles from "../ui/HeaderConTituloConControles";

interface Props {
    products: ProductResponse[];
}

export default function ClientCarouselProductosNuevos({ products }: Props) {
    const responsive = {
        desktop: { breakpoint: { max: 3000, min: 1280 }, items: 4 },
        laptop: { breakpoint: { max: 1280, min: 1024 }, items: 4 },
        tablet: { breakpoint: { max: 1024, min: 640 }, items: 3 },
        mobile: { breakpoint: { max: 640, min: 0 }, items: 2 },
    };

    return (
        <section className="w-full max-w-7xl mx-auto relative px-4 lg:px-0">
            {/* Encabezado simple sin controles de flechas */}
            <HeaderConTituloConControles
                label="Novedades"
                title={
                    <>
                        Nuevos
                    </>
                }
                viewAllHref="/novedades"
            />

            <Carousel
                responsive={responsive}
                infinite
                autoPlay
                autoPlaySpeed={5000}
                arrows={false} // Aseguramos que no haya flechas nativas
                itemClass="px-2 md:px-3"
                containerClass="pb-4"
                partialVisible
                draggable
                swipeable
            >
                {products.map((product) => (
                    <div key={product._id} className="h-full transition-all duration-500 hover:translate-y-[-4px]">
                        <ProductCard product={product} />
                    </div>
                ))}
            </Carousel>
        </section>
    );
}