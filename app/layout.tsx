//File: frontend/app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Toaster } from 'sonner';
import { GoogleOAuthProvider } from '@react-oauth/google';
import MercadoPagoProvider from "@/components/provider/MercadoPagoProvider";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["500"],
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://sycmobile.pe"),
    title: {
        default: "S&C Mobile",
        template: "%s | S&C Mobile"
    },
    description:
        "iPhones, accesorios, repuestos y tecnología con envío rápido en Perú. S&C Mobile: calidad, garantía y atención personalizada desde Cañete.",
    keywords: [
        "S&C Mobile",
        "iPhone Perú",
        "Apple",
        "Accesorios iPhone",
        "Tecnología",
        "Repuestos iPhone",
        "Tienda online",
        "Cañete",
        "San Vicente",
        "Imperial",
        "Asia",
        "Lunahuana",
        "Electrónica",
        "Smartphones",
        "Gadgets",
        "Ofertas",
        "Promociones",
        "Envío rápido",
        "Garantía"
    ],
    authors: [{ name: "S&C Mobile", url: "https://sycmobile.pe" }],
    creator: "S&C Mobile",
    openGraph: {
        title: "S&C Mobile",
        description:
            "Compra iPhones, accesorios y repuestos con garantía y envío rápido. S&C Mobile: tecnología confiable desde Cañete para todo el Perú.",
        url: "https://sycmobile.pe",
        siteName: "S&C Mobile",
        locale: "es_PE",
        type: "website",
        images: [
            {
                url: "https://sycmobile.pe/logob.svg",
                width: 1200,
                height: 630,
                alt: "S&C Mobile Perú - iPhones y Tecnología"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "S&C Mobile",
        description:
            "Tecnología con garantía, precios competitivos y atención personalizada. Compra iPhones y accesorios con envío rápido.",
        images: ["https://sycmobile.pe/logoblanco.svg"]
    },
    icons: {
        icon: "/favicon.ico",
        apple: "/logoblanco.svg",
        shortcut: "/favicon.ico"
    },
    alternates: {
        canonical: "https://sycmobile.pe"
    },
    category: "technology"
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="es">
            <body
                className={`${poppins.className} bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]`}
            >
                <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
                    <MercadoPagoProvider />
                    {children}
                    <Toaster
                        theme="dark"
                        expand
                        position="top-center"
                        duration={5000}
                    />
                </GoogleOAuthProvider>
            </body>
        </html>
    );
}