import { User, Lock, Mail, Eye, FileCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacidad | S&C Mobile",
    description: "Cómo protegemos tus datos personales con total transparencia.",
};

export default function PoliticasPrivacidadPage() {
    const info = [
        { icon: User, title: "Recopilación", list: ["Datos de contacto", "Dirección de envío", "Historial de compras"] },
        { icon: FileCheck, title: "Uso", list: ["Procesar pagos", "Gestión de envíos", "Soporte técnico"] },
        { icon: Eye, title: "Tus Derechos", list: ["Acceso y rectificación", "Eliminación de datos", "Retiro de consentimiento"] }
    ];

    return (
        <section className="max-w-3xl mx-auto px-4 py-10 space-y-8">
            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-foreground">Tu privacidad es nuestra responsabilidad</h1>
                <p className="text-sm text-muted-foreground">Protegemos tus datos bajo altos estándares de seguridad.</p>
            </header>

            {/* Grid de Secciones */}
            <div className="grid sm:grid-cols-3 gap-4">
                {info.map((s, i) => (
                    <div key={i} className="p-5 bg-card border border-border rounded-lg space-y-3">
                        <s.icon className="text-primary" size={20} />
                        <h2 className="font-bold text-xs uppercase tracking-wider">{s.title}</h2>
                        <ul className="text-[11px] text-muted-foreground space-y-1.5">
                            {s.list.map((item, j) => <li key={j}>• {item}</li>)}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Protección Avanzada */}
            <div className="p-6 bg-foreground text-background rounded-lg flex items-center gap-6">
                <Lock className="text-primary shrink-0" size={32} />
                <div className="space-y-1">
                    <h2 className="font-bold text-sm">Protección Avanzada</h2>
                    <p className="text-xs text-background/70 leading-relaxed">
                        Usamos encriptación SSL 256-bit. Tus datos nunca serán vendidos. Solo compartimos la información estrictamente necesaria para logística y pagos.
                    </p>
                </div>
            </div>

            {/* Contacto */}
            <div className="p-6 bg-card border border-border rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                    <h3 className="font-bold text-sm">¿Dudas sobre tus datos?</h3>
                    <p className="text-xs text-muted-foreground">Actualiza o elimina tu información aquí.</p>
                </div>
                <div className="flex gap-2">
                    <Link href="mailto:sycmobilecanete@gmail.com" className="p-2.5 bg-secondary rounded-lg hover:bg-secondary/80">
                        <Mail size={18} />
                    </Link>
                    <Link href="/hc/contacto-y-soporte" className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-bold hover:opacity-90">
                        Soporte <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </section>
    );
}