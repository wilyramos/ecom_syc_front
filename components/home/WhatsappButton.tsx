"use client";

import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsappButton() {
    return (
        <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2.5 group">
            <Link
                href="https://wa.me/51972416683?text=Hola%20S%26C%20Mobile%2C%20estoy%20viendo%20su%20tienda%20web%20y%20deseo%20hacer%20una%20consulta"
                target="_blank"
                rel="noopener noreferrer"
                className="
                    flex items-center justify-center p-3.5
                    bg-[#25D366] 
                    rounded-full 
                    shadow-[0_4px_14px_rgba(37,211,102,0.35)]
                    hover:shadow-[0_6px_20px_rgba(37,211,102,0.5)]
                    hover:bg-[#20ba59]
                    transition-all duration-300 ease-out
                    hover:-translate-y-0.5
                "
                aria-label="Chat en WhatsApp"
            >
                <div className="flex items-center justify-center w-6 h-6 text-white shrink-0">
                    <FaWhatsapp className="w-6 h-6 transition-transform duration-300 group-hover:scale-105" />
                </div>
            </Link>
        </div>
    );
}