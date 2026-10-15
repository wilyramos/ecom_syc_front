// File: frontend/app/(store)/layout.tsx
import Footer from "@/components/home/Footer";
import NavBar from "@/components/navigation/NavBar";
import { metadata as globalMetadata } from "@/app/layout";
import type { Metadata } from "next";
import WhatsappButton from "@/components/home/WhatsappButton";
import TikTokPixel from "@/components/tiktok/TikTokPixel";
import HalloweenDecor from "@/src/components/halloween/HalloweenDecor";

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

const SHOW_HALLOWEEN = true; // Cambiar a false para desactivar la decoración de Halloween


export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`flex flex-col min-h-screen ${SHOW_HALLOWEEN ? "halloween-theme" : ""}`}>
      <TikTokPixel />
      <header className="fixed w-full top-0 z-50">
        <NavBar />
      </header>

      <main className="flex-1 pt-20 md:pt-28">
        {children}
      </main>

      <Footer />
      <WhatsappButton />

      {SHOW_HALLOWEEN && <HalloweenDecor />}
    </div>
  );
}