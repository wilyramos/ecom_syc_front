import type { SliderPrice as TSliderPrice } from "@/src/schemas/slider.schema";

interface Props {
    price: TSliderPrice;
    textColor: string;
    accentColor: string;
    isDark: boolean;
}

export default function SliderPrice({ price, textColor, accentColor }: Props) {
    return (
        <div className="flex flex-col gap-1 w-fit" style={{ color: textColor }}>
            {/* ── Etiqueta superior ──────────────────────── */}
            {price.label && (
                <span
                    className="w-fit text-[9px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 rounded-sm mb-1"
                    style={{
                        backgroundColor: `${accentColor}20`,
                        color: accentColor,
                    }}
                >
                    {price.label}
                </span>
            )}

            <div className="flex items-end gap-4">
                {/* ── Precio Comparativo (Anterior) ────────── */}
                {price.compare !== undefined && price.compare !== null && (
                    <div className="flex flex-col items-start">
                        <span className="text-[8px] uppercase tracking-widest font-bold opacity-40 leading-none mb-0.5">
                            Antes
                        </span>
                        <span className="text-lg font-medium line-through decoration-[1.5px] opacity-40">
                            {price.currency ?? "S/"}{price.compare.toFixed(2)}
                        </span>
                    </div>
                )}

                {/* ── Precio Actual ─────────────────────────── */}
                {price.current !== undefined && price.current !== null && (
                    <div className="flex flex-col items-start">
                        <span className="text-[8px] uppercase tracking-widest font-bold opacity-60 leading-none mb-0.5">
                            Actual
                        </span>
                        <div className="flex items-start">
                            <span className="mt-1 mr-0.5 text-sm font-medium opacity-60">
                                {price.currency ?? "S/"}
                            </span>
                            <span className="text-4xl sm:text-5xl font-black tracking-tighter leading-none">
                                {price.current.toFixed(2)}
                            </span>
                            {price.suffix && (
                                <span className="ml-1 mt-2 text-xs font-bold opacity-50 uppercase">
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