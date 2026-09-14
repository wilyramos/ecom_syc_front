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
            <div className="relative z-10 w-full max-w-6xl mx-auto h-full flex flex-row items-center px-3 sm:px-10">
                {/* ── Texto (izquierda) ─────────────────────────────── */}
                <div
                    className="flex flex-col justify-center items-start w-1/2 h-full pr-2 sm:pr-4 gap-1 md:gap-3"
                    style={{ color: text }}
                >
                    {subtitle && (
                        <div>
                            <span
                                className="inline-block text-[9px] sm:text-xs md:text-sm font-bold uppercase px-2 py-0.5 sm:py-1 leading-none"
                                style={{ borderLeft: `2px solid ${accent}` }}
                            >
                                {subtitle}
                            </span>
                        </div>
                    )}

                    {title && (
                        <h2 className="font-bold leading-[1.1] tracking-[-0.03em] text-[clamp(13px,3vw,2.5rem)] line-clamp-2 md:line-clamp-3">
                            {title}
                        </h2>
                    )}

                    {description && (
                        <p
                            className="text-[9px] sm:text-xs md:text-sm leading-tight sm:leading-relaxed line-clamp-2 md:line-clamp-3 max-w-[32ch]"
                            style={{ opacity: 0.75 }}
                        >
                            {description}
                        </p>
                    )}

                    {price?.current !== undefined && price.current !== null && (
                        <div className="mt-0.5 scale-90 sm:scale-100 origin-left">
                            <SliderPrice
                                price={price}
                                textColor={text}
                                accentColor={accent}
                                isDark={isDark}
                            />
                        </div>
                    )}

                    <div className="hidden md:block mt-1">
                        <span
                            className="inline-block px-3 py-1.5 text-xs font-bold uppercase rounded-full"
                            style={{ backgroundColor: accent, color: isDark ? "#000000" : "#ffffff" }}
                        >
                            Ver más
                        </span>
                    </div>

                    {terms && (
                        <div className="mt-0.5">
                            <p className="text-[7px] sm:text-[9px] font-medium tracking-wide uppercase line-clamp-1" style={{ opacity: 0.45 }}>
                                {terms}
                            </p>
                        </div>
                    )}
                </div>

                {/* ── Media (derecha) ───────────────────────────────── */}
                {media?.imageUrl && (
                    <div className="w-1/2 h-full py-2">
                        <div className="relative w-full h-full">
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
            className="block w-full h-full"
        >
            {content}
        </Link>
    );
}