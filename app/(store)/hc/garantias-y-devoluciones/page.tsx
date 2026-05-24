
import { Undo2, PackageCheck, AlertTriangle } from "lucide-react";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Garantías y Devoluciones | S&C Mobile",
    description: "Políticas de garantía y devoluciones. Conoce tus derechos y procesos.",
};

export default function GarantiasDevolucionesPage() {
    return (
        <section className="max-w-3xl mx-auto px-4 py-10 space-y-8">
            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-foreground">Garantías y Devoluciones</h1>
                <p className="text-sm text-muted-foreground">Transparencia y respaldo para tu compra.</p>
            </header>

            {/* Derecho de Desistimiento */}
            <div className="p-6 bg-card border border-border rounded-lg space-y-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 text-primary rounded-md"><Undo2 size={20} /></div>
                    <h2 className="font-bold">Derecho de Desistimiento</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                    Tienes <strong>3 días hábiles</strong> tras la entrega. El producto debe estar nuevo, sellado y sin activación. No aplica para equipos usados o sellos rotos.
                </p>
            </div>

            {/* Requisitos y Exclusiones */}
            <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-6 bg-card border border-border rounded-lg space-y-4">
                    <h3 className="flex items-center gap-2 font-bold text-sm"><PackageCheck size={18} className="text-primary" /> Requisitos</h3>
                    <ul className="text-xs text-muted-foreground space-y-2">
                        <li>• Producto sin uso ni manipulación.</li>
                        <li>• Caja y accesorios completos.</li>
                        <li>• Comprobante de pago original.</li>
                    </ul>
                </div>
                <div className="p-6 bg-card border border-border rounded-lg space-y-4">
                    <h3 className="flex items-center gap-2 font-bold text-sm"><AlertTriangle size={18} className="text-destructive" /> No cubierto</h3>
                    <ul className="text-xs text-muted-foreground space-y-2">
                        <li>• Daños por golpes o humedad.</li>
                        <li>• Software no oficial.</li>
                        <li>• Productos de higiene abiertos.</li>
                    </ul>
                </div>
            </div>

            {/* Proceso */}
            <div className="bg-foreground text-background p-6 rounded-lg">
                <h2 className="font-bold mb-6 text-sm uppercase tracking-wider">Cómo iniciar el proceso</h2>
                <div className="grid sm:grid-cols-3 gap-6 text-xs">
                    {["Contacta por WhatsApp con fotos del pedido.", "Evaluación técnica (3-7 días hábiles).", "Cambio o reembolso validado."].map((step, i) => (
                        <div key={i} className="space-y-2">
                            <span className="font-bold text-primary">0{i + 1}</span>
                            <p className="text-background/80">{step}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contacto */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                <Link href="https://wa.me/51972416683" className="flex items-center justify-center gap-2 flex-1 p-3 bg-secondary rounded-lg text-xs font-bold hover:bg-secondary/80">
                    <FaWhatsapp className="text-green-600" size={16} /> +51 972 416 683
                </Link>
                <Link href="mailto:sycmobilecanete@gmail.com" className="flex items-center justify-center gap-2 flex-1 p-3 bg-secondary rounded-lg text-xs font-bold hover:bg-secondary/80">
                    <FaEnvelope size={16} /> sycmobilecanete@gmail.com
                </Link>
            </div>
        </section>
    );
}