// File: frontend/app/(store)/page.tsx

import { Metadata } from "next";
import { metadata as globalMetadata } from "@/app/layout";
import ProductosNuevos from "@/components/home/ProductosNuevos";
import ProductosDestacados from "@/components/home/ProductosDestacados";
import CategoriasDestacadasWrapper from "@/components/home/CategoriasDestacadasWrapper";
import FeaturesList from "@/components/home/FeaturesList";
import BrandsList from "@/components/home/BrandsList";
import HeroNewArrivals from "@/components/catalog/HeroNewArrivals";
import HeroFlashSale from "@/components/home/FlashSaleBanner";
import CarruselPrincipal from "@/components/home/CarruselPrincipal";

// Metadata for SEO and social sharing
export const metadata: Metadata = {
    ...globalMetadata,
    title: {
        default: "S&C Mobile",
        template: "%s | S&C Mobile",
    },
    description:
        "S&C Mobile es tu tienda de confianza en Cañete para la compra de celulares, accesorios y más. Ofrecemos productos de calidad, envío rápido y atención personalizada.",
    keywords: [
        "GoPhone",
        "tienda iPhone Cañete",
        "venta de celulares Cañete",
        "accesorios para celulares",
        "tecnología en Cañete",
        "comprar iPhone Cañete",
        "gadgets Cañete",
        "tienda online Cañete",
        "GoPhone Perú",
        "cases y fundas Cañete",
        "cargadores y cables Cañete",
        "auriculares y audífonos Cañete",
        "repuestos y reparación de celulares",
        "ofertas de tecnología Cañete",
        "smartphones en Cañete",
        "tienda de tecnología en Cañete",
        "iPhone",
        "audífonos",
        "cases"
    ],
    openGraph: {
        ...globalMetadata.openGraph,
        title: "S&C Mobile",
        description:
            "En S&C Mobile encontrarás una amplia variedad de accesorios y productos tecnológicos en Cañete. ¡Visítanos y descubre nuestras ofertas!",
        url: "https://sycmobile.pe",
        images: [
            {
                url: "https://sycmobile.pe/favicon.ico",
                width: 1200,
                height: 630,
                alt: "GoPhone Home - Accesorios y Tecnología",
            },
        ],
    },
    twitter: {
        ...globalMetadata.twitter,
        title: "GoPhone - Venta de accesorios y tecnología en Cañete",
        description:
            "Compra iPhones, accesorios y más en GoPhone, tu tienda online de confianza en Cañete.",
        images: ["https://gophone.pe/favicon.ico"],
    }
};

export default function HomePage() {
    return (
        <div className="flex flex-col divide-y-2 divide-gray-200">
            {/* El Carrusel suele ir sin margen superior para pegar al nav */}
            <section className="">
                <CarruselPrincipal />
            </section>
            <section className="py-10">
                <CategoriasDestacadasWrapper />
            </section>


            <section className="py-10 bg-[var(--color-bg-secondary)]">
                <ProductosNuevos />
            </section>

            <section className=" bg-[var(--color-bg-primary)]">
                <div className="max-w-7xl mx-auto border-t border-l border-[var(--color-border-subtle)]">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Fila 1 */}
                        <HeroFlashSale />
                        <HeroNewArrivals />
                    </div>
                </div>
            </section>



            <section className="py-10 bg-[var(--color-bg-secondary)]">
                <ProductosDestacados />
            </section>


            <section className="py-10">
                <BrandsList />
            </section>

            <section className="py-10 bg-[var(--color-bg-secondary)]">
                <FeaturesList />
            </section>
        </div>
    );
}