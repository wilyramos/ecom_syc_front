// File: frontend/app/(store)/page.tsx

import { Metadata } from "next";
import { metadata as globalMetadata } from "@/app/layout";
import ProductosDestacados from "@/components/home/ProductosDestacados";
import CategoriasDestacadasWrapper from "@/components/home/CategoriasDestacadasWrapper";
import BrandsList from "@/components/home/BrandsList";
import CarruselPrincipal from "@/components/home/CarruselPrincipal";
import ColleccionesSection from "@/components/home/Colleccionessection";

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
        "S&C Mobile",
        "tienda iPhone Cañete",
        "venta de celulares Cañete",
        "accesorios para celulares",
        "tecnología en Cañete",
        "comprar iPhone Cañete",
        "gadgets Cañete",
        "tienda online Cañete",
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
                alt: "S&C Mobile Home - Accesorios y Tecnología",
            },
        ],
    },
    twitter: {
        ...globalMetadata.twitter,
        title: "S&C Mobile - Venta de accesorios y tecnología en Cañete",
        description:
            "Compra iPhones, accesorios y más en S&C Mobile, tu tienda online de confianza en Cañete.",
        images: ["https://sycmobile.pe/favicon.ico"],
    }
};

export default function HomePage() {
    return (
        <div className="flex flex-col divide-y-2 divide-gray-100">
            {/* El Carrusel suele ir sin margen superior para pegar al nav */}
            <section className="">
                <CarruselPrincipal />
            </section>
            <section className="py-5">
                <CategoriasDestacadasWrapper />
            </section>
            {/* 
            <section className="py-5 bg-[var(--color-bg-secondary)]">
                <ProductosNuevos />
            </section> */}

            <section className="bg-[var(--color-bg-primary) py-5">
                <ColleccionesSection />
            </section>



            <section className="py-5 bg-[var(--color-bg-secondary)]">
                <ProductosDestacados />
            </section>


            <section className="py-5">
                <BrandsList />
            </section>

            {/* <section className="py-5 bg-[var(--color-bg-secondary)]">
                <FeaturesList />
            </section> */}
        </div>
    );
}