"use client";

import { Mail, MapPin, Clock } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function ContactoSoportePage() {
    const methods = [
        { title: "Canal Digital", val: "+51 972 416 683", desc: "Atención comercial inmediata", href: "https://wa.me/51972416683", icon: FaWhatsapp, color: "text-green-600 dark:text-green-400" },
        { title: "Buzón Oficial", val: "sycmobilecanete@gmail.com", desc: "Gestiones, garantías y soporte técnico", href: "mailto:sycmobilecanete@gmail.com", icon: Mail, color: "text-primary" },
        { title: "Sede Central", val: "Av. Mariscal Benavides 713", desc: "San Vicente de Cañete, Perú", icon: MapPin, color: "text-destructive" },
        { title: "Disponibilidad", val: "Lun–Sáb 10am – 7pm", desc: "Horario de atención presencial", icon: Clock, color: "text-muted-foreground" }
    ];

    return (
        <section className="max-w-4xl mx-auto px-4 py-10 space-y-8">
            <header className="text-center md:text-left">
                <h1 className="text-2xl font-bold tracking-tight text-foreground mb-1">Atención al Cliente</h1>
                <p className="text-sm text-muted-foreground">Canales oficiales de comunicación y asistencia para tus solicitudes.</p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {methods.map((m, idx) => {
                    const Tag = m.href ? "a" : "div";
                    return (
                        <Tag key={idx} href={m.href} className={`p-4 rounded-lg bg-card border border-border flex items-center gap-4 ${m.href ? "hover:border-primary transition-colors" : ""}`}>
                            <div className={`p-2 rounded-md bg-secondary ${m.color}`}><m.icon size={18} /></div>
                            <div className="min-w-0 text-sm">
                                <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">{m.title}</h3>
                                <p className="font-medium text-foreground truncate">{m.val}</p>
                                <p className="text-xs text-muted-foreground">{m.desc}</p>
                            </div>
                        </Tag>
                    );
                })}
            </div>

            <div className="w-full bg-neutral-100 dark:bg-neutral-800 relative rounded-lg overflow-hidden aspect-video max-h-[240px] border border-border">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d918.4!2d-76.378026!3d-13.0751543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x910ff91c690bec53%3A0xc4cf99c4e2a85b45!2sSYC%20Mobile%20Per%C3%BA!5e0!3m2!1ses!2spe!4v1"
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade" title="Ubicación SYC Mobile Perú" className="absolute inset-0 w-full h-full"
                />
            </div>
        </section>
    );
}