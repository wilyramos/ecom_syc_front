/* File: src/components/pos/SaleSuccessModal.tsx */
"use client";

import { useCheckoutStore } from "@/src/store/useCheckoutStore";
import { CheckCircle2, Printer, ArrowRight, FileText, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const SaleSuccessModal = () => {
    const { lastResult } = useCheckoutStore();

    const handleClose = () => {
        useCheckoutStore.setState({ lastResult: null });
    };

    const handlePrintTicket = () => {
        if (!lastResult?._id) return;
        const printUrl = `/api/sales/${lastResult._id}/ticket`;
        window.open(printUrl, "_blank", "noopener,noreferrer");
    };

    const handlePrintPdf = () => {
        if (!lastResult?._id) return;
        const pdfUrl = `/api/sales/${lastResult._id}/pdf`;
        window.open(pdfUrl, "_blank", "noopener,noreferrer");
    };

    if (!lastResult) return null;

    const isQuote = lastResult.isQuote || lastResult.status === "QUOTE";
    const displayId = lastResult.receiptNumber || lastResult._id?.toString().slice(-6);

    return (
        <Dialog open={Boolean(lastResult)} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="max-w-md p-8 rounded-[2.5rem] bg-white border border-slate-200 shadow-2xl text-center">
                <DialogHeader className="flex flex-col items-center space-y-0">
                    {/* Status Icon Dinámico */}
                    <div className="flex justify-center mb-5">
                        <div
                            className={cn(
                                "h-20 w-20 rounded-[2.2rem] flex items-center justify-center border-2 shadow-inner animate-bounce-short",
                                isQuote
                                    ? "bg-blue-50 text-blue-500 border-blue-100"
                                    : "bg-emerald-50 text-emerald-500 border-emerald-100"
                            )}
                        >
                            {isQuote ? (
                                <FileText size={40} strokeWidth={2.5} />
                            ) : (
                                <CheckCircle2 size={40} strokeWidth={2.5} />
                            )}
                        </div>
                    </div>

                    <DialogTitle className="text-2xl font-black uppercase tracking-tighter text-black text-center">
                        {isQuote ? "Proforma Generada" : "Venta Exitosa"}
                    </DialogTitle>

                    <DialogDescription className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1 text-center">
                        Transacción #{displayId}
                    </DialogDescription>
                </DialogHeader>

                {/* Resumen del Monto */}
                <div className="bg-slate-50 rounded-2xl p-5 my-6 border border-slate-100">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest block">
                        {isQuote ? "Total Cotizado" : "Total Cobrado"}
                    </span>
                    <div className="text-3xl font-black tracking-tighter text-black mt-1">
                        S/ {lastResult.totalPrice.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
                    </div>

                    {!isQuote && (
                        <div className="inline-flex items-center gap-2 mt-2 px-3 py-0.5 bg-white border border-slate-200 rounded-full">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            <span className="text-[9px] font-black uppercase text-slate-500">
                                {lastResult.paymentMethod}
                            </span>
                        </div>
                    )}
                </div>

                {/* Acciones con componentes Button de Shadcn UI */}
                <div className="grid grid-cols-1 gap-2.5">
                    <div className="grid grid-cols-2 gap-2">
                        {/* Imprimir Ticket 80mm */}
                        <Button
                            type="button"
                            onClick={handlePrintTicket}
                            className={cn(
                                "h-12 text-white rounded-2xl font-black uppercase tracking-wider text-[10px] shadow-md transition-all active:scale-95 gap-2",
                                isQuote ? "bg-blue-600 hover:bg-blue-700 shadow-blue-600/20" : "bg-black hover:bg-neutral-800 shadow-black/10"
                            )}
                        >
                            <Printer size={15} />
                            Ticket (80mm)
                        </Button>

                        {/* Descargar/Ver Comprobante A4 */}
                        <Button
                            type="button"
                            onClick={handlePrintPdf}
                            className="h-12 bg-slate-900 text-white hover:bg-slate-800 rounded-2xl font-black uppercase tracking-wider text-[10px] shadow-md transition-all active:scale-95 gap-2"
                        >
                            <Download size={15} />
                            Formato A4
                        </Button>
                    </div>

                    {/* Continuar / Cerrar Modal */}
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={handleClose}
                        className="h-11 w-full bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-2xl font-black uppercase tracking-widest text-[10px] gap-2"
                    >
                        Continuar
                        <ArrowRight size={15} />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};