import React from "react";
import { ShieldAlert, Smartphone, CheckCircle2, Info, ExternalLink, AlertTriangle } from "lucide-react";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Lista Blanca RENTESEG | Gophone",
    description: "Infórmate sobre el registro de equipos en la Lista Blanca y evita el bloqueo de tu celular. Todo sobre RENTESEG en Gophone.",
    alternates: { canonical: "https://gophone.pe/hc/lista-blanca" },
};

export default function ListaBlancaPage() {
    return (
        <section className="max-w-4xl mx-auto px-4 py-12 md:py-20 animate-in fade-in duration-700">
            
            {/* --- CABECERA EDITORIAL --- */}
            <header className="mb-16 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-error-light)] text-[var(--color-error)] text-[10px] font-bold uppercase tracking-widest mb-6">
                    <ShieldAlert size={14} />
                    <span>Seguridad del Equipo</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] tracking-tight mb-4 leading-[1.1]">
                    ¡Ten CUIDADO donde <br />
                    <span className="text-[var(--color-action-primary)]">COMPRAS CELULARES!</span>
                </h1>
                <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl leading-relaxed mt-6">
                    Asegúrate de que tu equipo esté registrado en la <strong>Lista Blanca</strong>. Solo así tu celular estará habilitado para operar en la red del servicio público móvil en Perú.
                </p>
            </header>

            <div className="grid gap-8">
                
                {/* --- SECCIÓN: ALERTA RENTESEG --- */}
                <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-bg-tertiary)] rounded-[2.5rem] p-8 md:p-12 shadow-sm flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[var(--color-bg-primary)] border border-[var(--color-bg-tertiary)] flex items-center justify-center text-[var(--color-error)]">
                        <AlertTriangle size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4 tracking-tight">¿Qué es el RENTESEG?</h2>
                        <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                            Es el Registro Nacional de Equipos Terminales Móviles para la Seguridad. Su objetivo es prevenir el comercio ilegal de dispositivos y garantizar que los usuarios utilicen equipos con procedencia legal.
                        </p>
                        <div className="flex items-center gap-2 p-4 bg-[var(--color-action-primary-light)] rounded-2xl border border-[var(--color-action-primary)]/10">
                            <Info className="w-4 h-4 text-[var(--color-action-primary)] flex-shrink-0" />
                            <p className="text-[11px] font-semibold text-[var(--color-action-primary)] uppercase tracking-wider">
                                Todos nuestros equipos en Gophone cumplen con esta normativa.
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- SECCIÓN: MOTIVOS DE BLOQUEO (GRID) --- */}
                <div className="bg-[var(--color-bg-inverse)] text-[var(--color-text-inverse)] rounded-[2.5rem] p-8 md:p-12">
                    <h3 className="text-xl font-bold mb-8 flex items-center gap-2 tracking-tight">
                        <Smartphone className="text-[var(--color-action-primary)]" size={24} />
                        ¿Qué celulares serán bloqueados?
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { t: "Ilegales", d: "Equipos robados, perdidos o sustraídos." },
                            { t: "Alterados", d: "Equipos con IMEI inválido o clonado." },
                            { t: "No Registrados", d: "Equipos no importados legalmente o fuera de RENTESEG." },
                            { t: "Excesos", d: "Equipos que excedan la cantidad permitida por persona natural." }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 p-4 rounded-2xl border border-white/10 hover:bg-white/5 transition-colors">
                                <CheckCircle2 className="w-5 h-5 text-[var(--color-success)] flex-shrink-0" />
                                <div>
                                    <h4 className="text-sm font-bold mb-1">{item.t}</h4>
                                    <p className="text-xs text-[var(--color-text-tertiary)] leading-relaxed">{item.d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- ENLACE EXTERNO --- */}
                <div className="p-8 rounded-[2.5rem] border border-[var(--color-bg-tertiary)] bg-[var(--color-bg-primary)] flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-sm font-medium text-[var(--color-text-secondary)] text-center md:text-left">
                        Para más detalles técnicos y consultas oficiales, visita el portal de OSIPTEL.
                    </p>
                    <a 
                        href="https://www.osiptel.gob.pe/portal-del-usuario/noticias/renteseg-conoce-todo-sobre-el-registro-de-equipos-terminales-moviles-para-la-seguridad/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-[var(--color-bg-inverse)] text-[var(--color-text-inverse)] rounded-full text-xs font-bold hover:scale-105 transition-all"
                    >
                        Más información sobre RENTESEG
                        <ExternalLink size={14} />
                    </a>
                </div>

                {/* --- SECCIÓN: CONTACTO --- */}
                <section className="mt-12 p-8 md:p-10 rounded-[2.5rem] border border-[var(--color-bg-tertiary)] bg-[var(--color-bg-secondary)] flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2 tracking-tight">¿Tienes dudas sobre tu equipo?</h3>
                        <p className="text-[var(--color-text-secondary)] text-sm font-medium">Estamos para asesorarte en tu compra segura.</p>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href="https://wa.me/51972416683" className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-primary)] rounded-full border border-[var(--color-bg-tertiary)] text-xs font-bold text-[var(--color-text-primary)] hover:shadow-md transition-all">
                            <FaWhatsapp className="text-[var(--color-success)]" size={16} />
                            +51 925 054 636
                        </a>
                        <a href="mailto:ventas@gophone.pe" className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-primary)] rounded-full border border-[var(--color-bg-tertiary)] text-xs font-bold text-[var(--color-text-primary)] hover:shadow-md transition-all">
                            <FaEnvelope size={14} />
                            ventas@gophone.pe
                        </a>
                    </div>
                </section>
            </div>

            <footer className="mt-24 text-center">
                <Link
                    href="/"
                    className="inline-flex items-center justify-center px-10 py-4 bg-[var(--color-action-primary)] text-[var(--color-text-inverse)] rounded-full font-semibold text-sm hover:bg-[var(--color-action-primary-hover)] transition-all active:scale-95 shadow-lg shadow-[var(--color-action-primary)]/10"
                >
                    Volver a la tienda
                </Link>
                <p className="mt-8 text-[10px] text-[var(--color-text-tertiary)] font-bold tracking-[0.25em] uppercase">
                    GoPhone · San Vicente de Cañete
                </p>
            </footer>
        </section>
    );
}