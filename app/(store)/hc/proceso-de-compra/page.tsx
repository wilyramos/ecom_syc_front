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
            title: "Selección",
            description: "Agrega tus productos y variantes favoritos a la bolsa de compra."
        },
        {
            icon: CreditCard,
            title: "Pago seguro",
            description: "Paga con tarjeta, yape, plin , transferencia o en efectivo.",
        },
        {
            icon: CheckCircle2,
            title: "Confirmación",
            description: "Recibe el resumen detallado y tu número de orden por correo o WhatsApp."
        },
        {
            icon: Package,
            title: "Preparación",
            description: "Pasamos cada dispositivo por control de calidad y un embalaje seguro."
        },
        {
            icon: Truck,
            title: "Envío",
            description: "Entrega prioritaria el mismo día en Cañete y de 48h a 72h en provincias."
        }
    ];

    return (
        <section className="max-w-3xl mx-auto px-4 py-12 text-foreground bg-background">
            <header className="mb-12">
                <h1 className="text-3xl font-bold tracking-tight text-primary mb-2">
                    Proceso de Compra
                </h1>
                <p className="text-sm text-muted-foreground">
                    Un flujo transparente y sencillo para recibir tu nuevo dispositivo de forma segura.
                </p>
            </header>

            <div className="space-y-8 relative">
                {pasos.map((paso, index) => (
                    <div key={index} className="relative flex gap-4">
                        {index !== pasos.length - 1 && (
                            <div className="absolute left-5 top-10 bottom-[-2rem] w-px bg-border" />
                        )}

                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center">
                            <paso.icon className="w-5 h-5 text-primary" />
                        </div>

                        <div className="pt-1">
                            <h2 className="text-base font-semibold text-primary mb-1">
                                {index + 1}. {paso.title}
                            </h2>
                            <p className="text-sm text-muted-foreground leading-normal">
                                {paso.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 p-6 rounded-xl bg-card border border-border relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 text-foreground pointer-events-none">
                    <ShieldCheck size={120} />
                </div>
                <h3 className="text-base font-bold text-primary mb-2">Garantía y tranquilidad</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Verifica el estado del empaque al recibirlo y conserva tu comprobante de compra para cualquier gestión inmediata.
                </p>
                <Link 
                    href="/hc/contacto-y-soporte" 
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-foreground hover:underline"
                >
                    Soporte especializado <ArrowRight size={14} className="text-primary" />
                </Link>
            </div>
        </section>
    );
}