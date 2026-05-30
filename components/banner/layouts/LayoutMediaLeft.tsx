"use client";

import Link from "next/link";
import Image from "next/image";
import SliderPrice from "../ui/SliderPrice";
import type { SliderBanner } from "@/src/schemas/slider.schema";

export default function LayoutMediaLeft({ banner }: { banner: SliderBanner }) {
    const { design, media, title, subtitle, description, terms, price, destUrl, openInNewTab } = banner;

    // Lógica de colores
    const isDark = design.theme !== "light";
    const bg = design.bgColor ?? (isDark ? "#000000" : "#ffffff");
    const text = design.textColor ?? (isDark ? "#a8a8a8" : "#0f0f0f");
    const accent = design.accentColor ?? "#3098b3";

    const content = (
        <div
            className="banner-slot relative w-full overflow-hidden flex items-center border border-border"
            style={{ backgroundColor: bg }}
        >
            <div className="relative z-10 w-full max-w-6xl mx-auto h-full flex flex-row items-center px-4 sm:px-10 gap-2 sm:gap-6">

                {/* ── Media (izquierda) ─────────────────────────────── */}
                {media?.imageUrl && (
                    <div className="w-1/2 h-full flex items-center justify-center">
                        <div className="relative w-full h-[calc(100%-16px)] my-2">
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

                {/* ── Texto (derecha) ───────────────────────────────── */}
                <div
                    className="flex flex-col justify-center items-start text-left w-1/2 h-full pl-2 sm:pl-4 gap-1 sm:gap-2"
                    style={{ color: text }}
                >
                    {subtitle && (
                        <div className="shrink-0">
                            <span
                                className="inline-block text-[9px] sm:text-xs md:text-sm font-bold uppercase px-2 py-0.5 sm:py-1 leading-none"
                                style={{ borderLeft: `3px solid ${accent}` }}
                            >
                                {subtitle}
                            </span>
                        </div>
                    )}

                    {title && (
                        <h2 className="font-bold leading-[1.1] tracking-[-0.03em] text-[12px] sm:text-lg md:text-xl lg:text-2xl xl:text-3xl line-clamp-2 sm:line-clamp-3">
                            {title}
                        </h2>
                    )}

                    {description && (
                        <p
                            className="text-[9px] sm:text-xs md:text-sm leading-tight sm:leading-relaxed line-clamp-1 sm:line-clamp-2 md:line-clamp-3 max-w-[40ch]"
                            style={{ opacity: 0.75 }}
                        >
                            {description}
                        </p>
                    )}

                    {price?.current !== undefined && price.current !== null && (
                        <div className="mt-0.5 sm:mt-1 scale-90 sm:scale-100 origin-left shrink-0">
                            <SliderPrice
                                price={price}
                                textColor={text}
                                accentColor={accent}
                                isDark={isDark}
                            />
                        </div>
                    )}

                    {terms && (
                        <div className="mt-0.5 sm:mt-1 shrink-0">
                            <p className="text-[7px] sm:text-[9px] font-medium tracking-wide uppercase line-clamp-1" style={{ opacity: 0.45 }}>
                                {terms}
                            </p>
                        </div>
                    )}
                </div>
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