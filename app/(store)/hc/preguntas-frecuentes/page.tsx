
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, MessageCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function PreguntasFrecuentesPage() {
    const faqs = [
        { q: "¿Cómo realizar una compra?", a: "Selecciona el producto, agrégalo a la bolsa y finaliza con tu método de pago preferido. Recibirás una notificación instantánea." },
        { q: "¿Hacen envíos a todo el Perú?", a: "Sí, a nivel nacional mediante couriers certificados. Entregas en 24h para Cañete y de 48h a 72h a otras provincias." },
        { q: "¿Qué hacer ante daños de fábrica?", a: "Puedes solicitar cambio o devolución en los primeros 3 días hábiles. Es obligatorio conservar empaque, sellos y accesorios originales." },
        { q: "¿Qué métodos de pago aceptan?", a: "Visa, Mastercard, American Express, Mercado Pago, Yape y Plin. Todas las transacciones son seguras y cifradas." },
        { q: "¿Se puede devolver un equipo activado?", a: "No. Por seguridad, dispositivos abiertos, encendidos o activados no admiten devolución por arrepentimiento, solo por fallas técnicas." },
        { q: "¿Horario de atención?", a: "Lunes a Sábado de 10:00 am a 7:00 pm. Fuera de este horario, déjanos un mensaje por WhatsApp." }
    ];

    return (
        <section className="max-w-3xl mx-auto px-4 py-10 space-y-10">
            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-foreground">Preguntas Frecuentes</h1>
                <p className="text-sm text-muted-foreground">Todo lo que necesitas saber sobre tus compras.</p>
            </header>

            <div className="bg-card border border-border rounded-lg p-2">
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, i) => (
                        <AccordionItem key={i} value={`i-${i}`} className="border-b last:border-0 px-4">
                            <AccordionTrigger className="text-sm font-semibold hover:no-underline">{faq.q}</AccordionTrigger>
                            <AccordionContent className="text-xs text-muted-foreground leading-relaxed">
                                {faq.a}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
                <Link href="/hc/contacto-y-soporte" className="p-6 bg-card border border-border rounded-lg space-y-3 hover:border-primary transition-colors">
                    <MessageCircle className="text-primary" size={24} />
                    <h3 className="font-bold text-sm">¿Aún tienes dudas?</h3>
                    <p className="text-xs text-muted-foreground">Asesoría personalizada en tiempo real.</p>
                    <span className="flex items-center gap-1 text-xs font-bold text-primary">Chatear <ArrowRight size={14} /></span>
                </Link>

                <Link href="/hc/garantias-y-devoluciones" className="p-6 bg-foreground text-background rounded-lg space-y-3 hover:opacity-90">
                    <ShieldCheck size={24} />
                    <h3 className="font-bold text-sm">Garantía S&C Mobile</h3>
                    <p className="text-xs text-background/70">Respaldo oficial y soporte técnico local.</p>
                    <span className="flex items-center gap-1 text-xs font-bold">Ver términos <ArrowRight size={14} /></span>
                </Link>
            </div>
        </section>
    );
}