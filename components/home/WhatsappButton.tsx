"use client";

import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsappButton() {
    return (
        <div className="fixed bottom-6 left-6 z-50 group">
            <Link
                href="https://wa.me/51972416683?text=Hola%2C%20queria%20consultar%20sobre%20"
                target="_blank"
                rel="noopener noreferrer"
                className="
                    flex items-center gap-3 p-3
                    bg-white dark:bg-neutral-900 
                    rounded-full border border-neutral-200/80 dark:border-neutral-800/80
                    shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]
                    backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90
                    hover:shadow-[0_4px_24px_rgba(37,211,102,0.15)]
                    hover:border-neutral-300 dark:hover:border-neutral-700
                    transition-all duration-300 ease-out
                    hover:-translate-y-0.5
                "
                aria-label="Chat en WhatsApp"
            >
                <div className="relative flex items-center justify-center w-5 h-5 text-[#25D366] dark:text-[#4ff388] shrink-0">
                    <FaWhatsapp className="w-5 h-5 transition-transform duration-300 group-hover:scale-105" />
                </div>
            </Link>
        </div>
    );
}