// File: frontend/app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from 'sonner';
import { GoogleOAuthProvider } from '@react-oauth/google';
import MercadoPagoProvider from "@/components/provider/MercadoPagoProvider";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://sycmobile.pe"),
    title: {
        default: "S&C Mobile | iPhones y Tecnología en Cañete",
        template: "%s | S&C Mobile"
    },
    description: "Tienda líder en iPhones, accesorios y repuestos. Tecnología original con garantía y envío rápido en Perú. Especialistas en Cañete.",
    keywords: ["S&C Mobile", "iPhone Perú", "Apple", "Accesorios iPhone", "Tecnología Cañete", "Smartphones"],
    authors: [{ name: "S&C Mobile", url: "https://sycmobile.pe" }],
    creator: "S&C Mobile",
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: "S&C Mobile - Tecnología Original",
        description: "Compra iPhones y accesorios con garantía y envío rápido a nivel nacional.",
        url: "https://sycmobile.pe",
        siteName: "S&C Mobile",
        locale: "es_PE",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "S&C Mobile",
        description: "Tecnología original, garantía y envío rápido en todo el Perú.",
    },
    icons: {
        icon: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body
                className={`${inter.className} bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]`}
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
                <Analytics />
            </body>
        </html>
    );
}