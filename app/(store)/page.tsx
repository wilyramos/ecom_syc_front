import { Metadata } from "next";
import ProductosDestacados from "@/components/home/ProductosDestacados";
import CategoriasDestacadasWrapper from "@/components/home/CategoriasDestacadasWrapper";
import BrandsList from "@/components/home/BrandsList";
import CarruselPrincipal from "@/components/home/CarruselPrincipal";
import ColleccionesSection from "@/components/home/Colleccionessection";
import ProductosNuevos from "@/components/home/ProductosNuevos";
import VideosSection from "@/components/home/VideosSection";

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
        images: [{ url: "https://sycmobile.pe/favicon.ico", width: 1200, height: 630, alt: "S&C Mobile" }],
    },
};

export default function HomePage() {
    return (
        <div className="flex flex-col bg-[var(--color-bg-primary)] min-h-screen">
            {/* Carrusel Principal Hero */}
            <section className="w-full">
                <CarruselPrincipal />
            </section>

            {/* Secciones de Contenido con Espaciado Consistente */}
            <div className="space-y-12 md:space-y-20 py-12 md:py-20">
                <CategoriasDestacadasWrapper />

                <VideosSection />
                <ProductosNuevos />

                <section className="bg-[var(--color-bg-secondary)] py-12 md:py-16">
                    <ColleccionesSection />
                </section>

                <section className="py-4">
                    <ProductosDestacados />
                </section>

                <BrandsList />
            </div>
        </div>
    );
}