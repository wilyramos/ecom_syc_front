// File: frontend/app/(store)/layout.tsx
import Footer from "@/components/home/Footer";
import NavBar from "@/components/navigation/NavBar";
import { metadata as globalMetadata } from "@/app/layout";
import type { Metadata } from "next";
import WhatsappButton from "@/components/home/WhatsappButton";

export const metadata: Metadata = {
    ...globalMetadata,
    title: {
        default: "S&C Mobile",
        template: "%s | S&C Mobile"
    },
    description: "Tienda online de tecnología, iPhones y accesorios originales en Perú. Garantía y soporte oficial.",
    openGraph: {
        ...globalMetadata.openGraph,
        siteName: "S&C Mobile",
        type: "website",
    }
};

export default function StoreLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="fixed w-full top-0 z-50">
                <NavBar />
            </header>

            {/* Main content con espaciado consistente */}
            <main className="flex-1 pt-20 md:pt-28">
                {children}
            </main>

            <Footer />
            <WhatsappButton />
        </div>
    );
}