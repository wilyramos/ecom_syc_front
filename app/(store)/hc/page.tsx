"use client";

import Link from "next/link";
import {
    RiHeadphoneLine,
    RiShoppingBag3Line,
    RiShieldCheckLine,
    RiChat1Line,
    RiFileShieldLine,
    RiArrowRightSLine,
    RiTruckLine,
    RiWallet3Line
} from "react-icons/ri";

export default function PageCentroAyuda() {
    const categories = [
        { title: "Pedidos", desc: "Rastreo y estados", href: "/hc/proceso-de-compra", icon: RiShoppingBag3Line },
        { title: "Envíos", desc: "Plazos y entrega", href: "/hc/proceso-de-compra", icon: RiTruckLine },
        { title: "Reembolsos", desc: "Devolución de dinero", href: "/hc/garantias-y-devoluciones", icon: RiWallet3Line },
        { title: "Soporte", desc: "Chat en vivo 24/7", href: "/hc/contacto-y-soporte", icon: RiHeadphoneLine }
    ];

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 space-y-10">
            <header className="space-y-1">
                <h1 className="text-2xl font-bold text-foreground">Centro de Ayuda</h1>
                <p className="text-sm text-muted-foreground">Asistencia para tus compras en S&C Mobile.</p>
            </header>

            <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {categories.map((cat, idx) => (
                    <Link key={idx} href={cat.href} className="p-4 bg-card border border-border rounded-lg hover:border-primary transition-colors flex flex-col items-center text-center gap-2">
                        <cat.icon className="text-primary" size={24} />
                        <div className="space-y-0.5">
                            <h3 className="text-xs font-bold uppercase">{cat.title}</h3>
                            <p className="text-[10px] text-muted-foreground">{cat.desc}</p>
                        </div>
                    </Link>
                ))}
            </section>

            <section className="space-y-2">
                <h2 className="text-sm font-bold text-foreground mb-3">Temas comunes</h2>
                {[
                    { title: "Preguntas frecuentes", href: "/hc/preguntas-frecuentes", icon: RiChat1Line },
                    { title: "Garantías de productos", href: "/hc/garantias-y-devoluciones", icon: RiShieldCheckLine },
                    { title: "Políticas de privacidad", href: "/hc/politicas-de-privacidad", icon: RiFileShieldLine },
                ].map((item, i) => (
                    <Link key={i} href={item.href} className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:bg-secondary transition-colors">
                        <div className="flex items-center gap-3">
                            <item.icon className="text-muted-foreground" size={18} />
                            <span className="text-sm font-medium">{item.title}</span>
                        </div>
                        <RiArrowRightSLine className="text-muted-foreground" size={18} />
                    </Link>
                ))}
            </section>

            <footer className="p-6 bg-foreground text-background rounded-lg text-center space-y-4">
                <div className="space-y-1">
                    <h3 className="font-bold">¿Necesitas más ayuda?</h3>
                    <p className="text-xs text-background/70">Nuestro equipo está disponible para asistirte.</p>
                </div>
                <Link href="/hc/contacto-y-soporte" className="inline-block bg-background text-foreground px-6 py-2 rounded-md text-xs font-bold hover:opacity-90 transition-opacity">
                    Contáctanos
                </Link>
            </footer>
        </div>
    );
}