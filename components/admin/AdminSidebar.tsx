"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Package2, Shapes,
    BarChart3, Store,
    ChevronDown
} from "lucide-react";
import { User } from "@/src/schemas";
import Logo from "../ui/Logo";
import { RiSlideshow2Line } from "react-icons/ri";
import AdminMenu from "@/components/admin/AdminMenu"; // Asegúrate que la ruta sea correcta

type NavLink = {
    href?: string;
    icon: React.ElementType;
    label: string;
    children?: { href: string; label: string }[];
};

const links: NavLink[] = [
    { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/products", icon: Package2, label: "Productos" },
    { href: "/admin/slider", icon: RiSlideshow2Line, label: "Slider" },
    {
        icon: Shapes,
        label: "Catálogo",
        children: [
            { href: "/admin/brands", label: "Marcas" },
            { href: "/admin/lines", label: "Líneas" },
            { href: "/admin/products/category", label: "Categorías" },
        ],
    },
    { href: "/admin/reports", icon: BarChart3, label: "Reportes" },
    { href: "/pos", icon: Store, label: "POS" },
];

export default function AdminSidebar({ user }: { user: User }) {
    const pathname = usePathname();
    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

    const toggleMenu = (label: string) => {
        setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
    };

    const isLinkActive = (href: string) => pathname === href;

    const isMenuActive = (children: Array<{ href: string; label: string }>) =>
        children.some((child) => isLinkActive(child.href));

    return (
        <aside className="h-screen w-64 border-r border-[var(--sl-border)] bg-[var(--color-bg-inverse)] flex flex-col">
            {/* Logo */}
            <div className="h-24 border-b border-[var(--sl-border)] flex items-center justify-center px-6">
                <Logo size="lg" color="white" className="w-full h-full" />
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
                {links.map((item) => {
                    const { href, icon: Icon, label, children } = item;

                    if (children) {
                        const isOpen = openMenus[label];
                        const isActive = isMenuActive(children);

                        return (
                            <div key={label}>
                                <button
                                    onClick={() => toggleMenu(label)}
                                    className={cn(
                                        "w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-[var(--sl-surface)] text-[var(--color-accent)]"
                                            : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-inverse)] hover:bg-[var(--sl-surface)]"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon className="h-5 w-5" />
                                        <span>{label}</span>
                                    </div>
                                    <ChevronDown
                                        className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")}
                                    />
                                </button>

                                {isOpen && (
                                    <div className="mt-1 ml-6 space-y-1 border-l border-[var(--sl-border)] pl-3">
                                        {children.map((child) => {
                                            const isActive = isLinkActive(child.href);
                                            return (
                                                <Link
                                                    key={child.href}
                                                    href={child.href}
                                                    className={cn(
                                                        "block rounded-md px-3 py-2 text-sm transition-colors",
                                                        isActive
                                                            ? "bg-[var(--color-accent)] text-[var(--color-bg-inverse)] font-medium"
                                                            : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-inverse)] hover:bg-[var(--sl-surface)]"
                                                    )}
                                                >
                                                    {child.label}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    }

                    const isActive = isLinkActive(href!);

                    return (
                        <Link
                            key={label}
                            href={href!}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-[var(--sl-surface)] text-[var(--color-accent)]"
                                    : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-inverse)] hover:bg-[var(--sl-surface)]"
                            )}
                        >
                            <Icon className="h-5 w-5" />
                            <span>{label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* User Footer */}
            <div className="border-t border-[var(--sl-border)] p-4">
                <div className="flex items-center justify-between rounded-lg p-2 hover:bg-[var(--sl-surface)] transition-colors group">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="h-9 w-9 rounded-full bg-[var(--sl-surface)] border border-[var(--sl-border)] flex items-center justify-center text-sm font-bold text-[var(--color-text-inverse)] flex-shrink-0">
                            {user?.nombre?.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-[var(--color-text-inverse)] truncate">
                                {user?.nombre}
                            </p>
                            <p className="text-xs text-[var(--color-text-tertiary)] truncate">
                                {user?.email}
                            </p>
                        </div>
                    </div>

                    {/* Componente AdminMenu integrado aquí */}
                    <AdminMenu user={user} />
                </div>
            </div>
        </aside>
    );
}