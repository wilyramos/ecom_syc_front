"use client";

import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { ExternalLink, MapPin, ShieldCheck, Smartphone } from "lucide-react";
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
                label: "Consulta IMEI Osiptel", 
                href: "https://checatuimei.renteseg.osiptel.gob.pe/consultaIMEI.xhtml",
                desc: "Verifica la legalidad de tu equipo"
            },
            { 
                label: "Equipos Homologados", 
                href: "https://www.gob.pe/institucion/mtc/colecciones/334-homologacion-de-equipos-de-telecomunicaciones",
                desc: "Normativa MTC vigente"
            },
        ],
        soporte: [
            { label: "Centro de ayuda", href: "/hc/contacto-y-soporte" },
            { label: "Garantía oficial", href: "/hc/garantias-y-devoluciones" },
            { label: "Preguntas", href: "/hc/preguntas-frecuentes" },
        ]
    };

    return (
        <footer className="bg-white border-t border-neutral-100 font-sans">
            <div className="max-w-7xl mx-auto px-6 py-16">
                
                {/* 1. TOP SECTION: GRID REVERTIDO */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
                    
                    {/* COLUMNA IZQUIERDA: Navegación Limpia */}
                    <div className="md:col-span-8 grid grid-cols-2 lg:grid-cols-3 gap-8">
                        
                        <div className="space-y-6">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-900 flex items-center gap-2">
                                <Smartphone size={14} /> Explorar
                            </h3>
                            <ul className="space-y-4">
                                {sections.explorar.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="text-sm text-neutral-500 hover:text-black transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-900 flex items-center gap-2">
                                <ShieldCheck size={14} /> Seguridad
                            </h3>
                            <ul className="space-y-4">
                                {sections.recursos.map((link) => (
                                    <li key={link.label}>
                                        <a href={link.href} target="_blank" rel="noreferrer" className="group block">
                                            <p className="text-sm text-neutral-500 group-hover:text-black flex items-center gap-1 transition-colors">
                                                {link.label} <ExternalLink size={10} />
                                            </p>
                                            <span className="text-[10px] text-neutral-400 block">{link.desc}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-900">Ayuda</h3>
                            <ul className="space-y-4">
                                {sections.soporte.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="text-sm text-neutral-500 hover:text-black transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* COLUMNA DERECHA: Branding & Ubicación (Highlight) */}
                    <div className="md:col-span-4 space-y-10 bg-black p-8 rounded-2xl border border-neutral-100">
                        <div className="space-y-4">
                            <Logo color="white" />
                         
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <MapPin className="text-neutral-50 shrink-0 mt-1" size={18} />
                                <div className="text-sm">
                                    <p className="font-bold text-neutral-200">Ubicación</p>
                                    <p className="text-neutral-100 italic">Av. Benavidas 12345, Cañete</p>
                                </div>
                            </div>
                            
                            <div className="flex gap-3">
                                {[
                                    { icon: <FaInstagram />, href: "https://instagram.com/gophone.pe" },
                                    { icon: <FaFacebookF />, href: "https://facebook.com/gophone.pe" },
                                    { icon: <FaWhatsapp />, href: "https://wa.me/51925054636" }
                                ].map((soc, i) => (
                                    <a key={i} href={soc.href} className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-black hover:text-white hover:border-black transition-all">
                                        {soc.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. BOTTOM BAR: MÍNIMALISTA */}
                <div className="mt-20 pt-8 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center gap-8">
                    
                    {/* Legal y Copyright */}
                    <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-8 gap-y-4 text-[11px] font-medium text-neutral-400">
                        <span className="text-neutral-900">© {new Date().getFullYear()} S&C Mobile</span>
                        <Link href="/hc/politicas-de-privacidad" className="hover:text-black uppercase tracking-widest">Privacidad</Link>
                        <Link href="/terminos" className="hover:text-black uppercase tracking-widest">Términos</Link>
                    </div>

                    {/* Pagos - Alineado a la derecha y sutil */}
                    <div className="flex items-center">
                        <div className="opacity-30 hover:opacity-100 transition-opacity duration-500">
                            <PaymentMethods />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}