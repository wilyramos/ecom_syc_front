"use client";

import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { ExternalLink, MapPin, ShieldCheck } from "lucide-react";
import PaymentMethods from "./PaymentMethods";
import Logo from "../ui/Logo";
import { routes } from "@/lib/routes";

export default function Footer() {
    const sections = {
        explorar: [
            { label: "Catálogo completo", href: routes.catalog() },
            { label: "Novedades", href: "/novedades" },
            { label: "Ofertas exclusivas", href: "/ofertas" },
        ],
        recursos: [
            {
                label: "Lista blanca Osiptel",
                href: "/hc/lista-blanca",
                desc: "Consulta IMEIs autorizados",
                external: false,
            },
            {
                label: "Consulta IMEI",
                href: "https://checatuimei.renteseg.osiptel.gob.pe/consultaIMEI.xhtml",
                desc: "Verifica la legalidad del equipo",
                external: true,
            },
            {
                label: "Equipos homologados",
                href: "https://www.gob.pe/institucion/mtc/colecciones/334-homologacion-de-equipos-de-telecomunicaciones",
                desc: "Normativa vigente MTC",
                external: true,
            },
        ],
        soporte: [
            { label: "Centro de ayuda", href: "/hc/contacto-y-soporte" },
            { label: "Garantía oficial", href: "/hc/garantias-y-devoluciones" },
            { label: "Preguntas frecuentes", href: "/hc/preguntas-frecuentes" },
        ],
    };

    return (
        <footer className="bg-neutral-950 text-neutral-300 border-t border-neutral-800">
            <div className="max-w-7xl mx-auto px-6 py-14">

                {/* TOP */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">

                    {/* BRAND */}
                    <div className="lg:col-span-4">
                        <div className="space-y-8">
                            <Logo color="white" />

                            <p className="text-sm leading-relaxed text-neutral-400 max-w-sm">
                                Smartphones originales, homologados y con garantía.
                            </p>

                            <div className="flex items-start gap-3">
                                <MapPin size={18} className="mt-0.5 shrink-0 text-neutral-500" />

                                <div className="space-y-1 text-sm">
                                    <p className="font-medium text-white">
                                        San Vicente de Cañete
                                    </p>

                                    <p className="text-neutral-400 leading-relaxed">
                                        Av. Mariscal Benavides 713,
                                        San Vicente de Cañete, Perú
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pt-2">
                                {[
                                    {
                                        icon: <FaInstagram size={16} />,
                                        href: "https://instagram.com/gophone.pe",
                                    },
                                    {
                                        icon: <FaFacebookF size={15} />,
                                        href: "https://facebook.com/gophone.pe",
                                    },
                                    {
                                        icon: <FaWhatsapp size={16} />,
                                        href: "https://wa.me/51972416683",
                                    },
                                ].map((soc, i) => (
                                    <a
                                        key={i}
                                        href={soc.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                                    >
                                        {soc.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* LINKS */}
                    <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-10">

                        {/* EXPLORAR */}
                        <div className="space-y-5">
                            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
                                Explorar
                            </h3>

                            <ul className="space-y-3">
                                {sections.explorar.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-neutral-400 hover:text-white transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* SEGURIDAD */}
                        <div className="space-y-5">
                            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-white flex items-center gap-2">
                                <ShieldCheck size={14} />
                                Seguridad
                            </h3>

                            <ul className="space-y-4">
                                {sections.recursos.map((link) => {
                                    const classes =
                                        "group block text-sm text-neutral-400 hover:text-white transition-colors";

                                    return (
                                        <li key={link.label}>
                                            {link.external ? (
                                                <a
                                                    href={link.href}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className={classes}
                                                >
                                                    <div className="flex items-center gap-1">
                                                        {link.label}
                                                        <ExternalLink size={11} />
                                                    </div>

                                                    <span className="block text-[11px] text-neutral-500 mt-1 leading-relaxed">
                                                        {link.desc}
                                                    </span>
                                                </a>
                                            ) : (
                                                <Link href={link.href} className={classes}>
                                                    <div>{link.label}</div>

                                                    <span className="block text-[11px] text-neutral-500 mt-1 leading-relaxed">
                                                        {link.desc}
                                                    </span>
                                                </Link>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        {/* SOPORTE */}
                        <div className="space-y-5">
                            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
                                Ayuda
                            </h3>

                            <ul className="space-y-3">
                                {sections.soporte.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-neutral-400 hover:text-white transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* BOTTOM */}
                <div className="mt-14 pt-8 border-t border-neutral-800 flex flex-col lg:flex-row items-center justify-between gap-6">

                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 text-[11px] uppercase tracking-wider text-neutral-500">
                        <span className="text-neutral-400">
                            © {new Date().getFullYear()} S&C Mobile
                        </span>

                        <Link
                            href="/hc/politicas-de-privacidad"
                            className="hover:text-white transition-colors"
                        >
                            Privacidad
                        </Link>

                        <Link
                            href="/terminos"
                            className="hover:text-white transition-colors"
                        >
                            Términos
                        </Link>
                    </div>

                    <div className="opacity-70 hover:opacity-100 transition-opacity duration-300">
                        <PaymentMethods />
                    </div>
                </div>
            </div>
        </footer>
    );
}