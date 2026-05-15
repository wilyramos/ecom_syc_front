import type { Metadata } from "next";
import {
    Shield,
    User,
    Lock,
    Mail,
    Eye,
    FileCheck,
    ArrowRight
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Políticas de Privacidad | Gophone",
    description: "Conoce cómo Gophone recopila, utiliza y protege tu información personal con total transparencia.",
    alternates: { canonical: "https://gophone.pe/hc/politicas-de-privacidad" },
};

export default function PoliticasPrivacidadPage() {
    const secciones = [
        {
            icon: User,
            title: "Información que recopilamos",
            items: ["Nombre y apellidos", "Correo electrónico", "Número de teléfono", "Dirección de envío", "Historial de compras"]
        },
        {
            icon: FileCheck,
            title: "¿Para qué la utilizamos?",
            items: ["Procesar tus compras y pagos", "Coordinar envíos y entregas", "Soporte personalizado", "Notificaciones de pedido", "Mejorar tu experiencia"]
        },
        {
            icon: Eye,
            title: "Tus derechos",
            items: ["Acceder a tus datos personales", "Solicitar corrección", "Pedir la eliminación", "Retirar tu consentimiento"]
        }
    ];

    return (
        <section className="max-w-4xl mx-auto px-4 py-12 md:py-20 animate-in fade-in duration-700">
            
            {/* --- CABECERA EDITORIAL --- */}
            <header className="mb-16 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-action-primary-light)] text-[var(--color-action-primary)] text-[10px] font-bold uppercase tracking-widest mb-6">
                    <Shield size={14} />
                    <span>Privacidad Garantizada</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] tracking-tight mb-4 leading-[1.1]">
                    Tu privacidad. <br />
                    <span className="text-[var(--color-text-secondary)] text-2xl md:text-3xl font-medium">Nuestra responsabilidad.</span>
                </h1>
                <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl leading-relaxed mt-6 font-medium">
                    En GoPhone, protegemos tus datos personales bajo los más altos estándares de seguridad y transparencia, cumpliendo con la normativa vigente en Perú.
                </p>
            </header>

            <div className="grid gap-12">
                
                {/* --- BLOQUES DE INFORMACIÓN --- */}
                <div className="grid md:grid-cols-2 gap-8">
                    {secciones.map((sec, idx) => (
                        <div key={idx} className="bg-[var(--color-bg-secondary)] border border-[var(--color-bg-tertiary)] rounded-[2.5rem] p-8 md:p-10 shadow-sm group hover:border-[var(--color-action-primary)]/30 transition-all">
                            <div className="w-12 h-12 rounded-2xl bg-[var(--color-bg-primary)] border border-[var(--color-bg-tertiary)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm">
                                <sec.icon className="text-[var(--color-text-primary)]" size={22} />
                            </div>
                            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-4 tracking-tight">
                                {sec.title}
                            </h2>
                            <ul className="space-y-3">
                                {sec.items.map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] font-medium">
                                        <div className="w-1 h-1 rounded-full bg-[var(--color-action-primary)]" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* --- BLOQUE: PROTECCIÓN DE DATOS (INVERSO) --- */}
                    <div className="bg-[var(--color-bg-inverse)] text-[var(--color-text-inverse)] rounded-[2.5rem] p-8 md:p-10 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 text-[var(--color-action-primary)]">
                                <Lock size={22} />
                            </div>
                            <h2 className="text-xl font-bold mb-4 tracking-tight">Protección avanzada</h2>
                            <p className="text-sm text-[var(--color-text-tertiary)] leading-relaxed font-medium">
                                Implementamos medidas de seguridad de nivel bancario. Tus datos jamás serán vendidos ni compartidos con terceros, salvo para el procesamiento logístico estrictamente necesario.
                            </p>
                        </div>
                        <div className="mt-8 flex items-center gap-2 text-[var(--color-action-primary)] text-xs font-bold uppercase tracking-widest">
                            Encriptación SSL 256-bit
                        </div>
                    </div>
                </div>

                {/* --- SECCIÓN: CONTACTO / EJERCER DERECHOS --- */}
                <div className="mt-8 p-10 rounded-[2.5rem] border border-[var(--color-bg-tertiary)] bg-[var(--color-bg-primary)]">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                        <div>
                            <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2 tracking-tight">Ejerce tus derechos</h3>
                            <p className="text-[var(--color-text-secondary)] text-sm font-medium">¿Deseas actualizar, rectificar o eliminar tu información?</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a href="mailto:contacto@gophone.pe" className="flex items-center gap-3 px-6 py-3 bg-[var(--color-bg-secondary)] rounded-full border border-[var(--color-bg-tertiary)] text-[13px] font-bold text-[var(--color-text-primary)] hover:shadow-md transition-all">
                                <Mail size={16} />
                                contacto@gophone.pe
                            </a>
                            <Link href="/hc/contacto-y-soporte" className="flex items-center gap-2 px-6 py-3 bg-[var(--color-action-primary)] text-[var(--color-text-inverse)] rounded-full text-[13px] font-bold hover:bg-[var(--color-action-primary-hover)] transition-all">
                                Centro de Soporte <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- FOOTER --- */}
            <footer className="mt-24 text-center">
                <p className="text-[10px] text-[var(--color-text-tertiary)] font-bold tracking-[0.25em] uppercase mb-8">
                    GoPhone · Privacidad y Confianza Garantizada
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center justify-center px-10 py-4 bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] border border-[var(--color-bg-tertiary)] rounded-full font-semibold text-sm hover:bg-[var(--color-bg-tertiary)] transition-all active:scale-95"
                >
                    Volver al inicio
                </Link>
            </footer>
        </section>
    );
}