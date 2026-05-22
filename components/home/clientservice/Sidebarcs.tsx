"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    RiHeadphoneLine, RiHeadphoneFill,
    RiShoppingBag3Line, RiShoppingBag3Fill,
    RiShieldCheckLine, RiShieldCheckFill,
    RiChat1Line, RiChat1Fill,
    RiFileShieldLine, RiFileShieldFill,
    RiServiceLine, RiServiceFill,
    RiSmartphoneLine, RiSmartphoneFill,
    RiExternalLinkLine
} from "react-icons/ri";

export default function Sidebarcs() {
    const pathname = usePathname();

    const navItems = [
        { name: "Centro de ayuda", href: "/hc", icon: RiServiceLine, iconFill: RiServiceFill },
        { name: "Lista Blanca", href: "/hc/lista-blanca", icon: RiSmartphoneLine, iconFill: RiSmartphoneFill },
        { name: "Contacto y soporte", href: "/hc/contacto-y-soporte", icon: RiHeadphoneLine, iconFill: RiHeadphoneFill },
        { name: "Proceso de compra", href: "/hc/proceso-de-compra", icon: RiShoppingBag3Line, iconFill: RiShoppingBag3Fill },
        { name: "Garantías y devoluciones", href: "/hc/garantias-y-devoluciones", icon: RiShieldCheckLine, iconFill: RiShieldCheckFill },
        { name: "Preguntas frecuentes", href: "/hc/preguntas-frecuentes", icon: RiChat1Line, iconFill: RiChat1Fill },
        { name: "Políticas de privacidad", href: "/hc/politicas-de-privacidad", icon: RiFileShieldLine, iconFill: RiFileShieldFill },
    ];

    return (
        <>
            <aside className="sticky top-24 hidden md:flex md:flex-col w-72 h-fit text-sidebar-foreground">
                <nav className="flex-1 pr-6 border-r border-sidebar-border space-y-6">
                    <div>
                        <h2 className="px-4 mb-3 text-[11px] uppercase tracking-[0.2em] font-semibold text-muted-foreground">
                            Soporte
                        </h2>
                        <div className="space-y-1">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                const Icon = isActive ? item.iconFill : item.icon;

                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors duration-200 group
                                            ${isActive
                                                ? "font-medium text-sidebar-primary-foreground bg-sidebar-primary"
                                                : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                            }
                                        `}
                                    >
                                        <Icon className="w-5 h-5 shrink-0" />
                                        <span>{item.name}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    <div className="pt-2">
                        <h2 className="px-4 mb-3 text-[11px] uppercase tracking-[0.2em] font-semibold text-muted-foreground">
                            Legal
                        </h2>
                        <Link
                            href="/terminos"
                            className="flex items-center justify-between px-4 py-3 rounded-lg border border-sidebar-border bg-card hover:bg-sidebar-accent transition-colors duration-200 group"
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <RiFileShieldLine className="w-5 h-5 shrink-0 text-muted-foreground group-hover:text-sidebar-accent-foreground" />
                                <span className="text-xs font-medium truncate">Información Legal</span>
                            </div>
                            <RiExternalLinkLine className="w-4 h-4 shrink-0 text-muted-foreground group-hover:text-sidebar-accent-foreground transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                </nav>
            </aside>

            {/* 📌 Mobile Bottom Navigation */}
            <aside className="md:hidden fixed bottom-0 left-0 right-0 bg-background/80 dark:bg-background/90 backdrop-blur-md border-t border-sidebar-border z-50 pb-safe">
                <nav className="flex justify-around items-center h-14 px-2">
                    {navItems.slice(0, 5).map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = isActive ? item.iconFill : item.icon;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex flex-col items-center justify-center gap-0.5 w-full h-full transition-colors
                                    ${isActive ? "text-primary" : "text-muted-foreground"}
                                `}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="text-[9px] font-medium tracking-tight text-center leading-none max-w-full truncate px-1">
                                    {item.name.includes("Lista") ? "RENTESEG" : item.name.split(" ")[0]}
                                </span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}