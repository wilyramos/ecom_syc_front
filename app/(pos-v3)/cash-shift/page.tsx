/* File: frontend/app/(pos-v3)/cash-shift/page.tsx */
import { verifySession } from "@/src/auth/dal";
import { CashService } from "@/src/services/cash-service";
import { CashOpeningModal } from "@/src/components/pos/CashOpeningModal"; // Importación del Modal
import { CashStats } from "@/src/components/cash-shift/CashStats";
import { MovementLog } from "@/src/components/cash-shift/MovementLog";
import { MovementActions } from "@/src/components/cash-shift/MovementActions";
import { Info } from "lucide-react";
import { CashStoreSync } from "@/src/components/cash-shift/CashStoreSync";

export default async function CashShiftPage() {
    const { user } = await verifySession();
    const { isOpen, shift } = await CashService.getStatus();

    // Si la caja no está abierta, mostramos el Modal industrial
    if (!isOpen || !shift) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-[var(--color-bg-primary)]">
                <CashOpeningModal userId={user._id} />

                {/* Opcional: Un placeholder visual de fondo mientras el modal está abierto */}
                <div className="text-center space-y-4 opacity-20 select-none">
                    <h2 className="text-4xl font-black uppercase italic text-[var(--color-text-primary)]">Terminal Bloqueada</h2>
                    <p className="text-sm font-bold text-[var(--color-text-secondary)]">Requiere apertura de turno para operar</p>
                </div>
            </div>
        );
    }

    const movements = await CashService.getMovements(shift._id);

    return (
        <div className="p-8 mx-auto space-y-6 max-w-[1600px] bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
            <CashStoreSync isOpen={isOpen} shiftId={shift._id} />

            <CashStats
                initial={shift.initialBalance}
                sales={shift.totalSalesCash}
                incomes={shift.totalIncomes}
                expenses={shift.totalExpenses}
                expected={shift.expectedBalance}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <aside className="lg:col-span-4 space-y-6">
                    <section className="p-6 bg-[var(--color-bg-primary)] border border-[var(--color-border-default)] rounded-md">
                        <h3 className="text-[10px] font-black tracking-[0.2em] uppercase text-[var(--color-text-tertiary)] mb-6 border-b border-[var(--color-border-subtle)] pb-3">
                            Ajustes de Efectivo
                        </h3>
                        <MovementActions shiftId={shift._id} />
                    </section>

                    <section className="p-5 bg-[var(--color-accent-light)] border border-[var(--color-border-subtle)] rounded-md flex gap-4">
                        <Info className="text-[var(--color-accent-hover)] shrink-0" size={18} />
                        <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase text-[var(--color-accent-hover)]">
                                Auditoría de Caja
                            </p>
                            <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
                                El saldo esperado refleja solo <strong className="font-bold text-[var(--color-text-primary)]">efectivo físico</strong>.
                                Los métodos digitales se concilian en el arqueo final.
                            </p>
                        </div>
                    </section>
                </aside>

                <main className="lg:col-span-8">
                    <div className="bg-[var(--color-bg-primary)] border border-[var(--color-border-default)] rounded-md overflow-hidden">
                        <div className="px-6 py-4 border-b border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]">
                            <h3 className="text-[10px] font-black uppercase tracking-wider text-[var(--color-text-secondary)]">
                                Registro de Movimientos
                            </h3>
                        </div>
                        <div className="p-0">
                            <MovementLog movements={movements} />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}