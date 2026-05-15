import {
    ShoppingCart,
    CreditCard,
    CheckCircle2,
    Package,
    Truck,
    ShieldCheck,
    ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function ProcesoCompraPage() {
    const pasos = [
        {
            icon: ShoppingCart,
            title: "Selección de productos",
            description: "Explora nuestras categorías y variantes. Una vez encuentres lo que buscas, agrégalo a tu bolsa de compra."
        },
        {
            icon: CreditCard,
            title: "Pago seguro",
            description: "Finaliza tu pedido utilizando Visa, Mastercard, Mercado Pago o Yape. Procesamos tu pago con cifrado de nivel bancario.",
            extra: ["Cifrado SSL de 256 bits", "Privacidad garantizada"]
        },
        {
            icon: CheckCircle2,
            title: "Confirmación",
            description: "Recibirás un correo electrónico automático con el resumen detallado y número de orden. También podemos notificarte vía WhatsApp."
        },
        {
            icon: Package,
            title: "Preparación",
            description: "Cada dispositivo pasa por un estricto control de calidad y un embalaje protector antes de salir de nuestro centro de distribución."
        },
        {
            icon: Truck,
            title: "Envío y Seguimiento",
            description: "Despachamos a nivel nacional. Si estás en Cañete, disfruta de nuestra entrega prioritaria el mismo día.",
            extra: ["Cañete: < 24h", "Provincias: 48h - 72h"]
        }
    ];

    return (
        <section className="max-w-4xl mx-auto px-4 py-12 md:py-20 animate-in fade-in duration-700">
            
            {/* --- CABECERA EDITORIAL --- */}
            <header className="mb-16 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-action-primary-light)] text-[var(--color-action-primary)] text-[10px] font-bold uppercase tracking-widest mb-6">
                    <Package size={14} />
                    <span>Experiencia de Compra</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] tracking-tight mb-4 leading-[1.1]">
                    Comprar es tan simple <br />
                    <span className="text-[var(--color-text-secondary)] text-2xl md:text-3xl font-medium">como debería ser.</span>
                </h1>
                <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl leading-relaxed mt-6 font-medium">
                    Hemos diseñado un proceso fluido y transparente para que tu única preocupación sea disfrutar de tu nuevo dispositivo.
                </p>
            </header>

            {/* --- TIMELINE DE PASOS --- */}
            <div className="space-y-0 relative">
                {pasos.map((paso, index) => (
                    <div key={index} className="relative flex gap-6 md:gap-10 group">
                        
                        {/* Línea conectora visual */}
                        {index !== pasos.length - 1 && (
                            <div className="absolute left-[23px] md:left-[27px] top-12 bottom-0 w-px bg-[var(--color-bg-tertiary)]" />
                        )}

                        {/* Icono con contenedor */}
                        <div className="relative z-10 flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[var(--color-bg-primary)] border border-[var(--color-bg-tertiary)] flex items-center justify-center shadow-sm group-hover:border-[var(--color-action-primary)] transition-all duration-500 group-hover:scale-105">
                            <paso.icon className="w-5 h-5 md:w-6 md:h-6 text-[var(--color-text-primary)] group-hover:text-[var(--color-action-primary)] transition-colors" />
                        </div>

                        {/* Contenido */}
                        <div className="pt-2 md:pt-3 flex-1 pb-16">
                            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-3 tracking-tight">
                                {index + 1}. {paso.title}
                            </h2>
                            <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm md:text-base max-w-2xl mb-4 font-medium">
                                {paso.description}
                            </p>
                            
                            {paso.extra && (
                                <div className="flex flex-wrap gap-2">
                                    {paso.extra.map((ex, i) => (
                                        <span key={i} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[var(--color-bg-secondary)] text-[var(--color-text-tertiary)] border border-[var(--color-bg-tertiary)]">
                                            {ex}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* --- BLOQUE DE SATISFACCIÓN (INVERSO) --- */}
            <div className="mt-12 p-8 md:p-12 rounded-[2.5rem] bg-[var(--color-bg-inverse)] text-[var(--color-text-inverse)] relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <ShieldCheck size={180} />
                </div>
                <div className="relative z-10 max-w-xl">
                    <h3 className="text-2xl font-bold mb-4 tracking-tight">Tu tranquilidad es nuestra prioridad.</h3>
                    <p className="text-[var(--color-text-tertiary)] text-sm md:text-base leading-relaxed mb-8 font-medium">
                        Recomendamos verificar el estado del empaque al recibirlo. Conserva siempre tu comprobante para gestionar cualquier garantía de forma inmediata.
                    </p>
                    <Link 
                        href="/hc/contacto-y-soporte" 
                        className="inline-flex items-center gap-2 text-[var(--color-action-primary)] font-bold hover:gap-3 transition-all"
                    >
                        Hablar con un especialista <ArrowRight size={18} />
                    </Link>
                </div>
            </div>

            {/* --- FOOTER DE PÁGINA --- */}
            <footer className="mt-24 text-center">
                <p className="text-[10px] text-[var(--color-text-tertiary)] font-bold tracking-[0.25em] uppercase mb-8">
                    GoPhone · Tecnología con Garantía Real
                </p>
                <div className="flex flex-col md:flex-row justify-center gap-4">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-10 py-4 bg-[var(--color-action-primary)] text-[var(--color-text-inverse)] rounded-full font-semibold text-sm hover:bg-[var(--color-action-primary-hover)] transition-all active:scale-95 shadow-lg shadow-[var(--color-action-primary)]/20"
                    >
                        Empezar a comprar
                    </Link>
                    <Link
                        href="/hc"
                        className="inline-flex items-center justify-center px-10 py-4 bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] border border-[var(--color-bg-tertiary)] rounded-full font-semibold text-sm hover:bg-[var(--color-bg-tertiary)] transition-all"
                    >
                        Volver al Centro de Ayuda
                    </Link>
                </div>
            </footer>
        </section>
    );
}