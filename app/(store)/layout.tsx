// File: frontend/app/(store)/layout.tsx

import Footer from "@/components/home/Footer";
import NavBar from "@/components/navigation/NavBar";
import { metadata as globalMetadata } from "@/app/layout";
import type { Metadata } from "next";
import WhatsappButton from "@/components/home/WhatsappButton";

// Extendemos metadata global para esta sección
export const metadata: Metadata = {
    ...globalMetadata,
    title: {
        default: "S&C Mobile",
        template: "%s | S&C Mobile"
    },
    description:
        "Sección principal de la tienda S&C Mobile: productos, compras, cuenta y soporte.",
    openGraph: {
        ...globalMetadata.openGraph,
        title: "S&C Mobile",
        description:
            "Productos, compras, cuenta y soporte dentro de la tienda S&C Mobile.",
        url: "https://sycmobile.pe/productos",
        images: [
            {
                url: "https://sycmobile.pe/favicon.ico",
                width: 1200,
                height: 630,
                alt: "S&C Mobile Tienda"
            }
        ]
    },
    twitter: {
        ...globalMetadata.twitter,
        title: "S&C Mobile | Tienda",
        description:
            "Explora productos, compras y soporte en la tienda S&C Mobile.",
        images: ["https://sycmobile.pe/favicon.ico"]
    },
    alternates: {
        canonical: "https://sycmobile.pe/catalogo"
    }
};


// File: frontend/app/(store)/layout.tsx

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <section className="flex flex-col min-h-screen">
                <header className="relative z-40">
                    <NavBar />
                </header>

                {/* Ajusta el padding-top según tu navbar: 20 sin aviso, 24-28 con aviso */}
                <main className="flex-1 pt-20 md:pt-28">
                    {children}
                </main>

                <Footer />
            </section>

            <WhatsappButton />
        </>
    );
}