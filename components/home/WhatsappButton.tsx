"use client";

import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsappButton() {
    return (
        <div className="fixed bottom-24 md:bottom-6 left-4 md:left-6 z-50 group">
            <Link
                href="https://wa.me/51972416683?text=Hola%2C%20queria%20consultar%20sobre%20"
                target="_blank"
                rel="noopener noreferrer"
                className="
                    flex items-center
                    bg-white dark:bg-neutral-900 
                    p-2 md:pl-2 md:pr-5 md:py-2
                    rounded-full
                    shadow-[0_8px_30px_rgb(0,0,0,0.12)]
                    border border-neutral-100 dark:border-neutral-800
                    hover:border-[#25D366]
                    transition-all duration-500
                    hover:-translate-y-1
                "
                aria-label="Chat en WhatsApp"
            >
                {/* Contenedor del Icono con efecto de estado online */}
                <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#25D366] text-white shrink-0 shadow-sm">
                    <FaWhatsapp className="w-5 h-5 transition-transform duration-500 group-hover:rotate-[12deg]" />
                    
                    {/* Punto verde de 'En línea' */}
                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-[#25D366] ring-2 ring-white" />
                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-[#25D366] animate-ping" />
                </div>

                {/* Texto descriptivo: Oculto en móvil, visible en desktop */}
                <div className="hidden md:flex flex-col leading-none ml-3">
                    <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">
                        ¿Necesitas ayuda?
                    </span>
                    <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                        Chatea con nosotros
                    </span>
                </div>
            </Link>

            {/* Efecto decorativo sutil (solo desktop para evitar lag en móviles gama baja) */}
            <div className="hidden md:block absolute -z-10 inset-0 bg-[#25D366]/10 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700" />
        </div>
    );
}