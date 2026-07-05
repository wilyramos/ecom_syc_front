"use client";

import Link from "next/link";
import Image from "next/image";
import SliderPrice from "../ui/SliderPrice";
import type { SliderBanner } from "@/src/schemas/slider.schema";

export default function LayoutDefault({ banner }: { banner: SliderBanner }) {
    const { design, media, title, subtitle, description, terms, price, destUrl, openInNewTab } = banner;

    const isDark = design.theme !== "light";
    const bg = design.bgColor ?? (isDark ? "#000000" : "#ffffff");
    const text = design.textColor ?? (isDark ? "#a8a8a8" : "#0f0f0f");
    const accent = design.accentColor ?? "#3098b3";

    const content = (
        <div
            className="banner-slot relative w-full overflow-hidden flex items-center border border-border"
            style={{ backgroundColor: bg }}
        >
            <div className="relative z-10 w-full max-w-6xl mx-auto h-full flex flex-row items-center px-4 sm:px-10">
                {/* ── Texto (izquierda) ─────────────────────────────── */}
                <div
                    className="flex flex-col justify-center items-start w-1/2 h-full pr-2 sm:pr-4 gap-2 sm:gap-4"
                    style={{ color: text }}
                >
                    {subtitle && (
                        <div>
                            <span
                                className="inline-block text-[10px] sm:text-sm md:text-base font-bold uppercase px-2.5 py-1"
                                style={{ borderLeft: `1px solid ${accent}` }}
                            >
                                {subtitle}
                            </span>
                        </div>
                    )}

                    {title && (
                        <h2 className="font-bold leading-[1.1] tracking-[-0.03em] text-[clamp(1rem,2.5vw,2.8rem)] line-clamp-3">
                            {title}
                        </h2>
                    )}

                    {description && (
                        <p
                            className="text-[10px] sm:text-[13px] md:text-sm leading-relaxed line-clamp-2 sm:line-clamp-4 max-w-[32ch]"
                            style={{ opacity: 0.75 }}
                        >
                            {description}
                        </p>
                    )}

                    {price?.current !== undefined && price.current !== null && (
                        <div className="mt-0 sm:mt-1">
                            <SliderPrice
                                price={price}
                                textColor={text}
                                accentColor={accent}
                                isDark={isDark}
                            />
                        </div>
                    )}

                    <div className="mt-2">
                        <span
                            className="hidden md:inline-block px-2 py-1 text-[10px] sm:text-xs font-semibold uppercase transition-colors rounded-2xl "
                            style={{ 
                                backgroundColor: accent, 
                                color: isDark ? "#000000" : "#ffffff" 
                            }}
                        >
                            Ver más
                        </span>
                    </div>

                    {terms && (
                        <div className="mt-1 sm:mt-2">
                            <p className="text-[8px] sm:text-[9px] font-medium tracking-wide uppercase" style={{ opacity: 0.45 }}>
                                {terms}
                            </p>
                        </div>
                    )}
                </div>

                {/* ── Media (derecha) ───────────────────────────────── */}
                {media?.imageUrl && (
                    <div className="w-1/2 h-full">
                        <div className="relative w-full h-full m-2">
                            <Image
                                src={media.imageUrl}
                                alt={media.altText ?? title ?? ""}
                                fill
                                className={media.objectFit === "contain" ? "object-contain" : "object-cover"}
                                sizes="(max-width: 640px) 50vw, 40vw"
                                priority
                                unoptimized
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    if (!destUrl) return content;

    return (
        <Link
            href={destUrl}
            target={openInNewTab ? "_blank" : undefined}
            rel={openInNewTab ? "noopener noreferrer" : undefined}
            aria-label={title ?? banner.name}
            className="block w-full"
        >
            {content}
        </Link>
    );
}