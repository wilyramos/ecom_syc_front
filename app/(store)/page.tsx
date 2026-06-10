// File: frontend/app/(store)/page.tsx

import { Metadata } from "next";
import ProductosDestacados from "@/components/home/ProductosDestacados";
import CategoriasDestacadasWrapper from "@/components/home/CategoriasDestacadasWrapper";
import BrandsList from "@/components/home/BrandsList";
import CarruselPrincipal from "@/components/home/CarruselPrincipal";
import ColleccionesSection from "@/components/home/Colleccionessection";
import ProductosNuevos from "@/components/home/ProductosNuevos";

// Metadata for SEO and social sharing
export const metadata: Metadata = {
    title: "S&C Mobile | Venta de iPhones y Tecnología en Cañete",
    description: "Tienda líder en Cañete para la compra de iPhones, accesorios y repuestos originales. Tecnología con garantía, envío rápido y atención personalizada.",
    alternates: {
        canonical: "https://sycmobile.pe",
    },
    openGraph: {
        title: "S&C Mobile | Tecnología y iPhones en Cañete",
        description: "Tu tienda de confianza para comprar iPhones, accesorios y gadgets con garantía y envío rápido en Perú.",
        url: "https://sycmobile.pe",
        siteName: "S&C Mobile",
        type: "website",
        // Nota: Asegúrate de usar una imagen de al menos 1200x630, no el favicon.
        images: [{ url: "https://sycmobile.pe/favicon.ico", width: 1200, height: 630, alt: "S&C Mobile" }],
    },
};

export default function HomePage() {
    return (
        <div className="flex flex-col divide-y-2 divide-gray-50">
            {/* El Carrusel suele ir sin margen superior para pegar al nav */}
            <section className="">
                <CarruselPrincipal />
            </section>
            <section className="py-5">
                <CategoriasDestacadasWrapper />
            </section>

            <section className="py-5">
                <ProductosNuevos />
            </section>

            <section className="bg-[var(--color-bg-primary)] py-5">
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