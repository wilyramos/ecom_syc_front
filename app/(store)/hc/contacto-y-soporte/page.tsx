"use client";

import {
    Mail,
    MapPin,
    MessageSquare,
    Clock
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

export default function ContactoSoportePage() {
    const contactMethods = [
        {
            title: "WhatsApp",
            value: "+51 925 054 636",
            description: "Respuesta inmediata por chat.",
            href: "https://wa.me/51925054636",
            icon: FaWhatsapp,
            color: "text-green-600"
        },
        {
            title: "Email",
            value: "contacto@gophone.pe",
            description: "Consultas técnicas y ventas.",
            href: "mailto:contacto@gophone.pe",
            icon: Mail,
            color: "text-[var(--store-primary)]"
        },
        {
            title: "Ubicación",
            value: "Jr. O Higgins 120",
            description: "San Vicente de Cañete, Perú.",
            href: "#",
            icon: MapPin,
            color: "text-red-500"
        },
        {
            title: "Horario",
            value: "Lun–Sáb 10am – 7pm",
            description: "Atención personalizada.",
            icon: Clock,
            color: "text-[var(--store-text)]"
        }
    ];

    return (
        <section className="max-w-4xl mx-auto px-4 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* --- HEADER EDITORIAL --- */}
            <header className="mb-16 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--store-primary)]/10 text-[var(--store-primary)] text-[10px] font-bold uppercase tracking-widest mb-6">
                    <MessageSquare size={14} />
                    <span>Centro de Ayuda</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-[var(--store-text)] tracking-tight mb-4 leading-[1.1]">
                    Estamos aquí para <br className="hidden md:block" /> ayudarte.
                </h1>
                <p className="text-lg text-[var(--store-text-muted)] max-w-2xl leading-relaxed mt-4">
                    Ya sea una duda técnica o una consulta sobre tu pedido, nuestro equipo de especialistas está listo para asistirte.
                </p>
            </header>

            {/* --- GRID DE CONTACTO --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
                {contactMethods.map((method, index) => (
                    <div
                        key={index}
                        className="p-8 rounded-[2rem] bg-[var(--store-surface)] border border-[var(--store-border)] shadow-sm hover:border-[var(--store-primary)] transition-all duration-300 group"
                    >
                        <method.icon className={`${method.color} mb-6 transition-transform group-hover:scale-110`} size={28} />
                        <h3 className="text-sm font-bold text-[var(--store-text-muted)] uppercase tracking-wider mb-2">
                            {method.title}
                        </h3>
                        {method.href ? (
                            <a href={method.href} className="text-lg font-bold text-[var(--store-text)] hover:text-[var(--store-primary)] transition-colors block mb-1">
                                {method.value}
                            </a>
                        ) : (
                            <p className="text-lg font-bold text-[var(--store-text)] mb-1">
                                {method.value}
                            </p>
                        )}
                        <p className="text-sm text-[var(--store-text-muted)]">
                            {method.description}
                        </p>
                    </div>
                ))}
            </div>

            {/* --- FORMULARIO Y SOPORTE --- */}
            

            <footer className="mt-20 text-center">
                <p className="text-[10px] text-[var(--store-text-muted)] font-bold tracking-[0.25em] uppercase mb-8">
                    GoPhone · San Vicente de Cañete
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center justify-center px-10 py-4 bg-[var(--store-surface)] text-[var(--store-text)] border border-[var(--store-border)] rounded-full font-semibold text-sm hover:bg-[var(--store-bg)] transition-all active:scale-95"
                >
                    Volver a la tienda
                </Link>
            </footer>
        </section>
    );
}