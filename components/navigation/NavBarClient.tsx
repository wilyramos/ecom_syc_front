"use client";

import { ReactNode, useState, useEffect } from "react";
import { Truck } from "lucide-react";

export default function NavBarClient({ children }: { children: ReactNode }) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="fixed left-0 top-0 w-full z-50">
            {/* Aviso superior */}
            <div
                className={`
                    overflow-hidden transition-all duration-300
                    ${isScrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100"}
                `}
            >
                <div className="bg-[var(--color-accent)] text-[var(--color-text-inverse)] border-b border-white/10">
                    <div className="flex items-center justify-center gap-2 px-4">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                            <Truck size={15} strokeWidth={2} />
                        </div>

                        <p className="text-[10px] md:text-xs font-medium tracking-tight">
                            Envíos gratis en compras mayores a{" "}
                            <span className="font-bold text-white">
                                S/. 100
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Navbar */}
            <div className="bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)]">
                {children}
            </div>
        </div>
    );
}