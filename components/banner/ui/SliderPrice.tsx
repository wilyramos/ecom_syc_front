//File: frontend/components/banner/ui/SliderPrice.tsx

import type { SliderPrice as TSliderPrice } from "@/src/schemas/slider.schema";

interface Props {
    price: TSliderPrice;
    textColor: string;
    accentColor: string;
    isDark: boolean;
}

export default function SliderPrice({ price, textColor, accentColor }: Props) {
    return (
        <div className="flex flex-col gap-0.5 sm:gap-1 w-fit" style={{ color: textColor }}>
            {/* ── Etiqueta superior ──────────────────────── */}
            {price.label && (
                <span
                    className="w-fit text-[7px] sm:text-[9px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] px-1.5 sm:px-2 py-0.5 rounded-sm mb-0.5 sm:mb-1"
                    style={{
                        backgroundColor: `${accentColor}20`,
                        color: accentColor,
                    }}
                >
                    {price.label}
                </span>
            )}

            <div className="flex items-center gap-2 sm:gap-4">
                {/* ── Precio Comparativo (Anterior) ────────── */}
                {price.compare !== undefined && price.compare !== null && (
                    <div className="flex flex-col items-start shrink-0">
                        <span className="text-[6px] sm:text-[8px] uppercase tracking-widest font-bold opacity-40 leading-none mb-0.5">
                            Antes
                        </span>
                        <span className="text-xs sm:text-lg font-medium line-through decoration-[1px] sm:decoration-[1.5px] opacity-40 leading-none">
                            {price.currency ?? "S/"}{price.compare.toFixed(2)}
                        </span>
                    </div>
                )}

                {/* ── Precio Actual ─────────────────────────── */}
                {price.current !== undefined && price.current !== null && (
                    <div className="flex flex-col items-start shrink-0">
                        <span className="text-[6px] sm:text-[8px] uppercase tracking-widest font-bold opacity-60 leading-none mb-0.5">
                            Actual
                        </span>
                        <div className="flex items-start leading-none">
                            <span className="mt-0.5 sm:mt-1 mr-0.5 text-[9px] sm:text-sm font-medium opacity-60">
                                {price.currency ?? "S/"}
                            </span>
                            <span className="text-base sm:text-3xl md:text-4xl font-black tracking-tighter leading-none">
                                {price.current.toFixed(2)}
                            </span>
                            {price.suffix && (
                                <span className="ml-0.5 sm:ml-1 mt-1 sm:mt-2 text-[7px] sm:text-xs font-bold opacity-50 uppercase">
                                    {price.suffix}
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}