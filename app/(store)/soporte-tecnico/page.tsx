"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Clock, MessageSquare, Cpu, Smartphone } from "lucide-react";

export default function SoporteTecnicoPage() {
  return (
    <div className="min-h-screen text-foreground">
      {/* --- HERO SECTION --- */}
      <section className="relative border-b border-border py-16 bg-card">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="space-y-6 flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent-light)] text-[var(--color-accent)] text-[10px] font-bold uppercase tracking-widest">
                <span>Especialistas Apple</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter leading-[1.1]">
                Soporte Técnico <br />
                <span style={{ color: "var(--color-accent)" }}>Especialista Apple.</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Tu iPhone, iPad o Mac en las mejores manos. Diagnóstico preciso, tecnología de vanguardia y el cuidado que tu equipo Apple merece.
              </p>
              <Link href="/hc/contacto-y-soporte" className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-lg font-bold transition-opacity hover:opacity-90" style={{ backgroundColor: "var(--color-accent)" }}>
                Agenda un diagnóstico <MessageSquare size={14} />
              </Link>
            </div>

            <div className="relative w-full md:w-1/3 aspect-[9/16]">
              <Image
                src="/DiagnosticoiPhone.webp"
                alt="Soporte Apple SYC Mobile"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- DETALLES DE SERVICIO --- */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Cpu, title: "Hardware correcto", desc: "Repuestos certificados para mantener la integridad de tu dispositivo." },
            { icon: Smartphone, title: "Software & Diagnóstico", desc: "Solucionamos errores de sistema, actualizaciones y seguridad." },
            { icon: CheckCircle2, title: "Garantía", desc: "Respaldamos cada intervención con garantía escrita." }
          ].map((feat, i) => (
            <div key={i} className="p-8 rounded-2xl border border-border bg-card">
              <feat.icon className="mb-4" size={20} style={{ color: "var(--color-accent)" }} />
              <h3 className="text-lg font-bold mb-2">{feat.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- INFO ADICIONAL --- */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="p-10 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-8" style={{ backgroundColor: "var(--color-bg-secondary)" }}>
          <div className="flex items-center gap-6">
            <Clock size={32} style={{ color: "var(--color-accent)" }} />
            <div>
              <h3 className="text-xl font-bold">Tiempo de entrega</h3>
              <p className="text-muted-foreground text-sm">Tu equipo listo entre 48h y 72h hábiles.</p>
            </div>
          </div>
          <p className="text-xs italic text-muted-foreground max-w-sm">
            *Los tiempos varían según la complejidad de la reparación y disponibilidad de repuestos.
          </p>
        </div>
      </section>
    </div>
  );
}