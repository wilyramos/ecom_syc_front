"use client";

import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { ExternalLink } from "lucide-react";

const NAV = [
    { label: "Catálogo", href: "/catalogo" },
    { label: "Novedades", href: "/novedades" },
    { label: "Ofertas", href: "/ofertas" },
    { label: "Nosotros", href: "/nosotros" },
    { label: "Ayuda", href: "/hc/contacto-y-soporte" },
    { label: "Garantía", href: "/hc/garantias-y-devoluciones" },
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
        <footer className="relative bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] border-t border-[var(--color-border-subtle)]">
            
            {/* Línea de acento sutil en la parte superior */}
            <div className="h-px w-full bg-gradient-to-r from-[var(--color-accent)] to-transparent opacity-60" />

            <div className="max-w-screen-2xl mx-auto px-4 md:px-12 py-12 space-y-8">

                {/* ── FILA 1: logo · dirección · redes ── */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">

                    {/* Wordmark compacto */}
                    <div className="flex items-center gap-2 select-none">
                        <span className="text-xs font-black uppercase tracking-[0.22em] text-[var(--color-accent)]">
                            S&C
                        </span>
                        <span className="w-px h-3.5 rounded-full bg-[var(--color-border-strong)]" />
                        <span className="text-xs font-semibold tracking-[0.14em] text-[var(--color-text-primary)]">
                            Mobile Perú
                        </span>
                    </div>

                    {/* Dirección */}
                    <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-[var(--color-text-secondary)]">
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
                                className="w-7 h-7 rounded flex items-center justify-center border border-[var(--color-border-default)] text-[var(--color-text-secondary)] transition-all duration-200 hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] hover:text-[var(--color-text-inverse)]"
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* ── DIVISOR ── */}
                <div className="h-px bg-[var(--color-border-subtle)]" />

                {/* ── FILA 2: nav · seguridad ── */}
                <div className="flex flex-col sm:flex-row gap-8 sm:items-start justify-between">

                    {/* Links de navegación en línea */}
                    <div className="space-y-2.5">
                        <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">
                            Navegación
                        </p>
                        <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                            {NAV.map((l) => (
                                <Link
                                    key={l.label}
                                    href={l.href}
                                    className="text-[11px] font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
                                >
                                    {l.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Links de seguridad */}
                    <div className="space-y-2.5 shrink-0">
                        <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">
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
                                        className="text-[11px] font-medium inline-flex items-center gap-0.5 text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
                                    >
                                        {l.label} <ExternalLink size={9} />
                                    </a>
                                ) : (
                                    <Link
                                        key={l.label}
                                        href={l.href}
                                        className="text-[11px] font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
                                    >
                                        {l.label}
                                    </Link>
                                )
                            )}
                        </div>
                    </div>
                </div>

                {/* ── DIVISOR ── */}
                <div className="h-px bg-[var(--color-border-subtle)]" />

                {/* ── FILA 3: copyright ── */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] uppercase tracking-wider text-[var(--color-text-tertiary)]">
                        <span className="font-medium">© {new Date().getFullYear()} SYC Mobile Perú</span>
                        <Link href="/hc/politicas-de-privacidad" className="hover:text-[var(--color-text-primary)] transition-colors">Privacidad</Link>
                        <Link href="/terminos" className="hover:text-[var(--color-text-primary)] transition-colors">Términos</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}