"use client";

import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { ExternalLink, MapPin } from "lucide-react";
import PaymentMethods from "./PaymentMethods";

const NAV = [
    { label: "Catálogo", href: "/catalogo" },
    { label: "Novedades", href: "/novedades" },
    { label: "Ofertas", href: "/ofertas" },
    { label: "Nosotros", href: "/nosotros" },
    { label: "Ayuda", href: "/hc/contacto-y-soporte" },
    { label: "Garantía", href: "/hc/garantias-y-devoluciones" },
    { label: "Envíos", href: "/politicas-de-envio" },
];

const LEGAL = [
    { label: "Lista blanca", href: "/hc/lista-blanca", external: false },
    { label: "Consulta IMEI", href: "https://checatuimei.renteseg.osiptel.gob.pe/consultaIMEI.xhtml", external: true },
    { label: "Equipos homologados", href: "https://www.gob.pe/institucion/mtc/colecciones/334-homologacion-de-equipos-de-telecomunicaciones", external: true },
];

const SOCIAL = [
    { icon: <FaInstagram size={14} />, href: "https://instagram.com/sycmobile.peru", label: "Instagram" },
    { icon: <FaFacebookF size={13} />, href: "https://www.facebook.com/p/SYC-Mobile-Per%C3%BA-100090151432838/", label: "Facebook" },
    { icon: <FaWhatsapp size={14} />, href: "https://wa.me/51972416683", label: "WhatsApp" },
];

export default function Footer() {
    return (
        <footer className="relative" style={{ backgroundColor: "#0a0a0a", color: "#fff" }}>

            {/* Línea acento top */}
            <div className="h-px w-full" style={{ background: "linear-gradient(90deg, var(--color-accent) 0%, transparent 60%)" }} />

            <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">

                {/* ── FILA 1: logo · dirección · redes ── */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">

                    {/* Wordmark compacto */}
                    <div className="flex items-center gap-2 select-none">
                        <span
                            className="text-xs font-black uppercase tracking-[0.22em]"
                            style={{ color: "var(--color-accent)" }}
                        >
                            SYC
                        </span>
                        <span
                            className="w-px h-3.5 rounded-full"
                            style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                        />
                        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white">
                            Mobile Perú
                        </span>
                    </div>

                    {/* Dirección */}
                    <div className="flex items-center gap-1.5">
                        <MapPin size={11} style={{ color: "var(--color-accent)" }} />
                        <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.45)" }}>
                            Av. Mariscal Benavides 713, San Vicente de Cañete
                        </span>
                    </div>

                    {/* Redes */}
                    <div className="flex items-center gap-1.5">
                        {SOCIAL.map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={s.label}
                                className="w-7 h-7 rounded flex items-center justify-center transition-all duration-150"
                                style={{
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    color: "rgba(255,255,255,0.5)",
                                }}
                                onMouseEnter={(e) => {
                                    const el = e.currentTarget as HTMLAnchorElement;
                                    el.style.backgroundColor = "var(--color-accent)";
                                    el.style.borderColor = "var(--color-accent)";
                                    el.style.color = "#fff";
                                }}
                                onMouseLeave={(e) => {
                                    const el = e.currentTarget as HTMLAnchorElement;
                                    el.style.backgroundColor = "transparent";
                                    el.style.borderColor = "rgba(255,255,255,0.1)";
                                    el.style.color = "rgba(255,255,255,0.5)";
                                }}
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* ── DIVISOR ── */}
                <div className="h-px" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />

                {/* ── FILA 2: nav · seguridad ── */}
                <div className="flex flex-col sm:flex-row gap-8 sm:items-start justify-between">

                    {/* Links de navegación en línea */}
                    <div className="space-y-2">
                        <p className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: "rgba(255,255,255,0.3)" }}>
                            Navegación
                        </p>
                        <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                            {NAV.map((l) => (
                                <Link
                                    key={l.label}
                                    href={l.href}
                                    className="text-[11px] transition-colors hover:text-white"
                                    style={{ color: "rgba(255,255,255,0.5)" }}
                                >
                                    {l.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Links de seguridad */}
                    <div className="space-y-2 shrink-0">
                        <p className="text-[9px] font-bold uppercase tracking-[0.22em] flex items-center gap-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                            Seguridad OSIPTEL
                        </p>
                        <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                            {LEGAL.map((l) =>
                                l.external ? (
                                    <a
                                        key={l.label}
                                        href={l.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-[11px] inline-flex items-center gap-0.5 transition-colors hover:text-white"
                                        style={{ color: "rgba(255,255,255,0.5)" }}
                                    >
                                        {l.label} <ExternalLink size={9} />
                                    </a>
                                ) : (
                                    <Link
                                        key={l.label}
                                        href={l.href}
                                        className="text-[11px] transition-colors hover:text-white"
                                        style={{ color: "rgba(255,255,255,0.5)" }}
                                    >
                                        {l.label}
                                    </Link>
                                )
                            )}
                        </div>
                    </div>
                </div>

                {/* ── DIVISOR ── */}
                <div className="h-px" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />

                {/* ── FILA 3: copyright · métodos de pago ── */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.25)" }}>
                        <span>© {new Date().getFullYear()} SYC Mobile Perú</span>
                        <Link href="/hc/politicas-de-privacidad" className="hover:text-white transition-colors">Privacidad</Link>
                        <Link href="/terminos" className="hover:text-white transition-colors">Términos</Link>
                    </div>
                    <div className="opacity-50 hover:opacity-80 transition-opacity duration-200">
                        <PaymentMethods />
                    </div>
                </div>

            </div>
        </footer>
    );
}