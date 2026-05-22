//File: frontend/app/(store)/hc/lista-blanca/page.tsx

import { Smartphone, ExternalLink } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Lista Blanca RENTESEG | SYC Mobile",
    description: "Infórmate sobre el registro de equipos en la Lista Blanca y evita el bloqueo de tu celular. Todo sobre RENTESEG en SYC Mobile.",
    alternates: { canonical: "https://sycmobile.pe/hc/lista-blanca" },
};

const BLOQUEOS = [
    {
        tag: "Ilegales",
        desc: "Equipos reportados como robados, perdidos o sustraídos.",
    },
    {
        tag: "IMEI alterado",
        desc: "Dispositivos con IMEI inválido, clonado o modificado.",
    },
    {
        tag: "No registrados",
        desc: "Equipos no importados legalmente o ausentes del RENTESEG.",
    },
    {
        tag: "Exceso de cuota",
        desc: "Superan la cantidad máxima permitida por persona natural.",
    },
];

export default function ListaBlancaPage() {
    return (
        <div className="min-h-screen" style={{ backgroundColor: "var(--color-bg-primary)" }}>

            {/* ── HERO ── */}
            <section
                className="relative border-b overflow-hidden"
                style={{ borderColor: "var(--color-border-default)" }}
            >
                {/* Línea acento lateral */}
                <div
                    className="absolute left-0 top-0 h-full w-1"
                    style={{ backgroundColor: "var(--color-error)" }}
                />

                {/* Grid de fondo */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.03]"
                    style={{
                        backgroundImage:
                            "linear-gradient(var(--color-border-strong) 1px, transparent 1px), linear-gradient(90deg, var(--color-border-strong) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />

                <div className="max-w-4xl mx-auto px-6 md:px-10 py-14 md:py-20 relative z-10">

                    

                    <div className="flex flex-col gap-5 max-w-2xl">
                        

                        <h1
                            className="text-4xl md:text-5xl font-extrabold leading-[1.06]"
                            style={{ color: "var(--color-text-primary)", letterSpacing: "-0.03em" }}
                        >
                            ¿Tu celular está en la<br />
                            <span style={{ color: "var(--color-error)" }}>Lista Blanca?</span>
                        </h1>

                        <p
                            className="text-sm leading-relaxed max-w-5xl"
                            style={{ color: "var(--color-text-secondary)" }}
                        >
                            En Perú, solo los equipos registrados en el <strong style={{ color: "var(--color-text-primary)" }}>RENTESEG de OSIPTEL</strong> pueden operar en redes móviles. Sin ese registro, tu teléfono puede quedar bloqueado permanentemente.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── CONTENIDO ── */}
            <div className="max-w-4xl mx-auto px-6 md:px-10 py-14 space-y-6">

                {/* ¿Qué es RENTESEG? */}
                <div
                    className="rounded-xl border p-7 flex flex-col sm:flex-row gap-6"
                    style={{
                        borderColor: "var(--color-border-default)",
                        backgroundColor: "var(--color-bg-secondary)",
                    }}
                >
                  
                    <div>
                        <h2
                            className="text-base font-bold mb-2"
                            style={{ color: "var(--color-text-primary)", letterSpacing: "-0.01em" }}
                        >
                            ¿Qué es el RENTESEG?
                        </h2>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                            El <strong style={{ color: "var(--color-text-primary)" }}>Registro Nacional de Equipos Terminales Móviles para la Seguridad</strong> es el sistema oficial del Estado peruano que controla qué dispositivos pueden operar en las redes móviles del país. Su fin es combatir el robo y la importación ilegal de equipos.
                        </p>
                        <div
                            className="mt-4 flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold w-fit"
                            style={{
                                backgroundColor: "var(--color-success-light)",
                                color: "var(--color-success)",
                            }}
                        >
                            Todos nuestros equipos cumplen esta normativa.
                        </div>
                    </div>
                </div>

                {/* Bloqueos — grid oscuro */}
                <div
                    className="rounded-xl p-7 space-y-6"
                    style={{ backgroundColor: "var(--color-bg-inverse)" }}
                >
                    <div className="flex items-center gap-2.5">
                        <Smartphone size={16} style={{ color: "var(--color-accent)" }} />
                        <h3
                            className="text-sm font-bold uppercase tracking-wide"
                            style={{ color: "#fff", letterSpacing: "0.06em" }}
                        >
                            Celulares que serán bloqueados definitivamente
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {BLOQUEOS.map(({ tag, desc }) => (
                            <div
                                key={tag}
                                className="flex items-start gap-3 rounded-lg p-4"
                                style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                            >
                                <span
                                    className="mt-0.5 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded whitespace-nowrap"
                                    style={{ backgroundColor: "var(--color-error)", color: "#fff" }}
                                >
                                    {tag}
                                </span>
                                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                                    {desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA OSIPTEL + Contacto — fila */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {/* OSIPTEL externo */}
                    <a
                        href="https://www.osiptel.gob.pe/portal-del-usuario/noticias/renteseg-conoce-todo-sobre-el-registro-de-equipos-terminales-moviles-para-la-seguridad/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl border p-6 flex flex-col justify-between gap-6 group transition-colors hover:border-current"
                        style={{
                            borderColor: "var(--color-border-default)",
                            backgroundColor: "var(--color-bg-primary)",
                        }}
                    >
                        <div>
                            <p
                                className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2"
                                style={{ color: "var(--color-text-tertiary)" }}
                            >
                                Portal oficial
                            </p>
                            <p className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>
                                Más información sobre el RENTESEG en OSIPTEL
                            </p>
                        </div>
                        <div
                            className="inline-flex items-center gap-1.5 text-xs font-bold"
                            style={{ color: "var(--color-accent)" }}
                        >
                            Ir al portal <ExternalLink size={11} />
                        </div>
                    </a>

                    {/* WhatsApp */}
                    <a
                        href="https://wa.me/51972416683"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl p-6 flex flex-col justify-between gap-6 transition-opacity hover:opacity-90"
                        style={{ backgroundColor: "var(--color-accent)", color: "#fff" }}
                    >
                        <div>
                            <p
                                className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2"
                                style={{ color: "rgba(255,255,255,0.6)" }}
                            >
                                ¿Tienes dudas?
                            </p>
                            <p className="text-sm font-semibold">
                                Asesórate con nosotros antes de comprar tu próximo equipo.
                            </p>
                        </div>
                        <div className="inline-flex items-center gap-2 text-xs font-bold">
                            <FaWhatsapp size={14} /> Escribir por WhatsApp
                        </div>
                    </a>
                </div>

                {/* Nota legal */}
                <p
                    className="text-[10px] leading-relaxed text-center pt-2"
                    style={{ color: "var(--color-text-tertiary)" }}
                >
                    Información basada en la normativa vigente del MTC y OSIPTEL. SYC Mobile Perú · San Vicente de Cañete.
                </p>

            </div>
        </div>
    );
}