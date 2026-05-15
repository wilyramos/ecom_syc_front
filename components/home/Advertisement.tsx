"use client";

import { Truck, CreditCard, ShieldCheck, Clock, Smartphone } from "lucide-react";

const items = [
  { icon: <Truck size={14} />, text: "Envío gratis", accent: true },
  { icon: <Truck size={14} />, text: "Envíos a todo Perú · SHALOM", accent: false },
  { icon: <CreditCard size={14} />, text: "Paga con tarjeta o Yape", accent: false },
  { icon: <ShieldCheck size={14} />, text: "Productos 100% originales", accent: false },
  { icon: <Clock size={14} />, text: "Atención Lun–Sáb 9am – 7pm", accent: false },
  { icon: <Smartphone size={14} />, text: "Garantía oficial", accent: true },
];

export default function AnnouncementBar() {

  // Triplicamos para asegurar un scroll infinito fluido
  const tripled = [...items, ...items, ...items];

  return (
    <div className="w-full bg-[var(--color-bg-primary)] border-b border-[var(--color-bg-tertiary)] fixed top-0 left-0 right-0 z-[40] overflow-hidden">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="relative h-8 md:h-10 flex items-center">
        {/* Difuminado en los extremos para suavizar el texto al entrar/salir */}
        <div className="absolute left-0 inset-y-0 w-12 md:w-24 bg-gradient-to-r from-[var(--color-bg-primary)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-10 md:right-12 inset-y-0 w-12 md:w-24 bg-gradient-to-l from-[var(--color-bg-primary)] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center whitespace-nowrap">
          {tripled.map((item, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-2.5 px-6 md:px-10 group"
            >
              <span 
                className={`flex-shrink-0 transition-colors ${
                  item.accent ? "text-[var(--color-accent-warm)]" : "text-[var(--color-text-secondary)]"
                }`}
              >
                {item.icon}
              </span>
              <span className={`text-[11px] md:text-[12px] font-semibold tracking-tight uppercase transition-colors ${                  item.accent ? "text-[var(--color-accent-warm)]" : "text-[var(--color-text-secondary)]"
                }`}>
                {item.text}
              </span>
              {/* Separador minimalista */}
              <span className="ml-6 md:ml-10 w-1 h-1 rounded-full bg-[var(--color-bg-tertiary)]" />
            </div>
          ))}
        </div>

        {/* Botón de cierre integrado al diseño */}
        
      </div>
    </div>
  );
} 