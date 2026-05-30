"use client";

import Link from "next/link";
import { TicketPercent, Truck, ShieldCheck, ArrowLeftRight, ChevronRight } from "lucide-react";

type Feature = {
    title: string;
    description: string;
    icon: typeof TicketPercent;
    url?: string;
};

const features: Feature[] = [
    {
        title: "Ofertas exclusivas",
        description: "Precios especiales para ti.",
        icon: TicketPercent,
        url: "/ofertas"
    },
    {
        title: "Envíos rápidos",
        description: "A todo el país en tiempo récord.",
        icon: Truck,
        url: "/hc/proceso-de-compra"
    },
    {
        title: "Pago 100% seguro",
        description: "Tus datos protegidos con nivel bancario.",
        icon: ShieldCheck,
        url: "/hc/preguntas-frecuentes"
    },
    {
        title: "Cambios y devoluciones",
        description: "Garantía de satisfacción total.",
        icon: ArrowLeftRight,
        url: "/hc/garantias-y-devoluciones"
    },
];

export default function MinimalFeatures() {
    return (
        <section className="w-full ">
            <div className="max-w-screen-2xl mx-auto px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {features.map((feature, idx) => {
                        const Icon = feature.icon;

                        return (
                            <div key={idx} className="group relative">
                                {feature.url ? (
                                    <Link href={feature.url} className="flex flex-col gap-4">
                                        <div className="flex items-center gap-3">
                                            <Icon size={20} strokeWidth={1.5} className="text-[var(--color-text-primary)]" />
                                            <h3 className="text-sm font-bold tracking-tight text-[var(--color-text-primary)]">
                                                {feature.title}
                                            </h3>
                                        </div>
                                        <p className="text-xs text-[var(--color-text-tertiary)] leading-relaxed max-w-[200px]">
                                            {feature.description}
                                        </p>
                                        <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-primary)] opacity-0 group-hover:opacity-100 transition-all duration-300">
                                            Más info <ChevronRight size={12} />
                                        </div>
                                    </Link>
                                ) : (
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center gap-3">
                                            <Icon size={20} strokeWidth={1.5} className="text-[var(--color-text-primary)]" />
                                            <h3 className="text-sm font-bold tracking-tight text-[var(--color-text-primary)]">
                                                {feature.title}
                                            </h3>
                                        </div>
                                        <p className="text-xs text-[var(--color-text-tertiary)] leading-relaxed max-w-[200px]">
                                            {feature.description}
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}