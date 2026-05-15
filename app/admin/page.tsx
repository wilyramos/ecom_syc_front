import Link from "next/link";
import {
    LayoutDashboard,
    Package2,
    Users2,
    ReceiptText,
    BadgeDollarSign,
    Tag,
    Layers,
    Shapes,
    BarChart3,
    Users,
    ShieldAlert,
    Store
} from "lucide-react";
import AdminPageWrapper from "@/components/admin/AdminPageWrapper";

export default async function AdminPage() {
    const links = [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
        { href: "/admin/products", label: "Productos", icon: Package2 },
        { href: "/admin/clients", label: "Clientes", icon: Users2 },
        { href: "/admin/orders", label: "Órdenes", icon: ReceiptText },
        { href: "/admin/slider", label: "Slider", icon: BadgeDollarSign },
        { href: "/admin/brands", label: "Marcas", icon: Tag },
        { href: "/admin/lines", label: "Líneas", icon: Layers },
        { href: "/admin/products/category", label: "Categorías", icon: Shapes },
        { href: "/admin/reports", label: "Reportes", icon: BarChart3 },
        { href: "/admin/users", label: "Lista de usuarios", icon: Users },
        { href: "/admin/users/roles", label: "Roles y permisos", icon: ShieldAlert },
        { href: "/pos", label: "POS", icon: Store },
    ];

    return (
        <AdminPageWrapper
            title="Panel de administración"
            showBackButton={false}
        >
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {links.map(({ href, label, icon: Icon }) => (
                    <Link
                        key={href}
                        href={href}
                        className="
                            group flex flex-col items-center gap-3 p-6 rounded-lg transition-colors duration-200
                            bg-[var(--color-bg-primary)] 
                            border border-[var(--color-border-default)] 
                            text-[var(--color-text-primary)]
                            hover:bg-[var(--color-surface-hover)]
                            active:bg-[var(--color-surface-active)]
                        "
                    >
                        <Icon className="h-8 w-8 text-[var(--color-text-secondary)] transition-colors group-hover:text-[var(--color-accent)]" />
                        <span className="text-sm font-medium text-center line-clamp-2">
                            {label}
                        </span>
                    </Link>
                ))}
            </div>
        </AdminPageWrapper>
    );
}