import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Términos | S&C Mobile",
    description: "Términos de uso de S&C Mobile.",
};

export default function TerminosPage() {
    return (
        <main className=" px-4 py-8 text-sm text-muted-foreground bg-background">
            <h1 className="text-xl font-bold text-primary mb-1">Términos y Condiciones</h1>
            <p className="text-xs mb-6">Actualizado: 1 de mayo de 2026</p>

            <div className="space-y-4 leading-snug">
                <p>
                    Al navegar por este sitio web, aceptas cumplir con nuestras normas de uso, políticas de compra y la legislación vigente.
                </p>
                <p>
                    Todo el material, diseño y logotipos son propiedad exclusiva de S&C Mobile y no está permitida su copia o distribución sin autorización.
                </p>
                <p>
                    Los plazos de entrega y costos de envío se calculan al finalizar la compra y quedan sujetos a disponibilidad y cobertura logística.
                </p>
            </div>
        </main>
    );
}