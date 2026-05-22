
import { Smartphone, ExternalLink } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Lista Blanca RENTESEG | SYC Mobile",
    description: "Infórmate sobre el registro de equipos en la Lista Blanca y evita el bloqueo de tu celular. Todo sobre RENTESEG en SYC Mobile.",
    alternates: { canonical: "https://sycmobile.pe/hc/lista-blanca" },
};

const BLOQUEOS = [
    { tag: "Ilegales", desc: "Reportados como robados, perdidos o sustraídos." },
    { tag: "IMEI alterado", desc: "Dispositivos con IMEI inválido, clonado o modificado." },
    { tag: "No registrados", desc: "No importados legalmente o ausentes del RENTESEG." },
    { tag: "Exceso de cuota", desc: "Superan la cantidad máxima permitida por persona." },
];

export default function ListaBlancaPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* ── HERO ── */}
            <section className="relative border-b border-border overflow-hidden">
                <div className="absolute left-0 top-0 h-full w-1 bg-destructive" />
                <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 relative z-10">
                    <div className="flex flex-col gap-4 max-w-2xl">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                            ¿Tu celular está en la<br />
                            <span className="text-destructive">Lista Blanca?</span>
                        </h1>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Solo los equipos registrados en el <strong className="text-foreground">RENTESEG de OSIPTEL</strong> operan legalmente en Perú. Sin este registro, tu equipo corre riesgo de bloqueo permanente.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── CONTENIDO ── */}
            <div className="max-w-4xl mx-auto px-6 py-14 space-y-6">
                {/* ¿Qué es RENTESEG? */}
                <div className="rounded-lg border border-border bg-secondary/50 p-6 flex flex-col sm:flex-row gap-6">
                    <div>
                        <h2 className="text-base font-bold mb-2">¿Qué es el RENTESEG?</h2>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            El <strong className="text-foreground">Registro Nacional de Equipos Terminales Móviles para la Seguridad</strong> es el sistema oficial del Estado peruano que controla la operatividad de los dispositivos en redes móviles para combatir el robo y la ilegalidad.
                        </p>
                        <div className="mt-4 flex items-center gap-2 px-4 py-2 rounded-md text-[11px] font-bold w-fit bg-emerald-500/10 text-emerald-600">
                            Todos nuestros equipos cumplen esta normativa.
                        </div>
                    </div>
                </div>

                {/* Bloqueos */}
                <div className="rounded-lg p-6 space-y-6 bg-foreground text-background">
                    <div className="flex items-center gap-2">
                        <Smartphone size={16} className="text-accent" />
                        <h3 className="text-xs font-bold uppercase tracking-widest">
                            Equipos sujetos a bloqueo definitivo
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {BLOQUEOS.map(({ tag, desc }) => (
                            <div key={tag} className="flex items-start gap-3 rounded-md p-3 bg-white/5 border border-white/10">
                                <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-destructive text-white">
                                    {tag}
                                </span>
                                <p className="text-xs text-white/60">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link href="https://www.osiptel.gob.pe/portal-del-usuario/noticias/renteseg-conoce-todo-sobre-el-registro-de-equipos-terminales-moviles-para-la-seguridad/" target="_blank" className="rounded-lg border border-border p-5 flex flex-col justify-between gap-4 hover:border-primary transition-colors">
                        <div>
                            <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Portal oficial</p>
                            <p className="text-sm font-semibold">Más información en OSIPTEL</p>
                        </div>
                        <span className="text-xs font-bold text-accent flex items-center gap-1">Ir al portal <ExternalLink size={12} /></span>
                    </Link>

                    <Link href="https://wa.me/51972416683" target="_blank" className="rounded-lg p-5 flex flex-col justify-between gap-4 bg-accent text-white hover:opacity-90">
                        <div>
                            <p className="text-[10px] font-bold uppercase text-white/70 mb-1">¿Tienes dudas?</p>
                            <p className="text-sm font-semibold">Asesórate con nosotros antes de comprar.</p>
                        </div>
                        <span className="text-xs font-bold flex items-center gap-2"><FaWhatsapp size={14} /> Escribir por WhatsApp</span>
                    </Link>
                </div>

                <p className="text-[10px] text-center text-muted-foreground pt-4">
                    Normativa vigente del MTC y OSIPTEL. SYC Mobile Perú · San Vicente de Cañete.
                </p>
            </div>
        </div>
    );
}