// File: frontend/components/banner/layouts/LayoutMediaLeft.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import SliderPrice from "../ui/SliderPrice";
import type { SliderBanner } from "@/src/schemas/slider.schema";

export default function LayoutMediaLeft({ banner }: { banner: SliderBanner }) {
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
            <div className="relative z-10 w-full max-w-6xl mx-auto h-full flex flex-row items-center px-2 sm:px-6 lg:px-10">
                {/* ── Media (izquierda) ─────────────────────────────── */}
                {media?.imageUrl && (
                    <div className="w-1/2 h-full py-1 sm:py-2">
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

                {/* ── Texto (derecha) ───────────────────────────────── */}
                <div
                    className="flex flex-col justify-center items-start text-left w-1/2 h-full py-1 pl-2 sm:pl-4 lg:pl-8 gap-0.5 sm:gap-2 lg:gap-3"
                    style={{ color: text }}
                >
                    {subtitle && (
                        <div>
                            <span
                                className="inline-block text-[8px] sm:text-xs md:text-sm font-bold uppercase px-1.5 sm:px-2 py-0.5 leading-none"
                                style={{ borderLeft: `2px solid ${accent}` }}
                            >
                                {subtitle}
                            </span>
                        </div>
                    )}

                    {title && (
                        <h2 className="font-bold leading-[1.05] tracking-[-0.03em] text-[clamp(12px,2.8vw,2.5rem)] line-clamp-2 lg:line-clamp-3">
                            {title}
                        </h2>
                    )}

                    {description && (
                        <p
                            className="text-[9px] sm:text-[11px] md:text-sm leading-tight sm:leading-relaxed line-clamp-2 md:line-clamp-3 max-w-[40ch]"
                            style={{ opacity: 0.75 }}
                        >
                            {description}
                        </p>
                    )}

                    {price?.current !== undefined && price.current !== null && (
                        <div className="mt-0.5 scale-75 sm:scale-90 md:scale-100 origin-left shrink-0">
                            <SliderPrice
                                price={price}
                                textColor={text}
                                accentColor={accent}
                                isDark={isDark}
                            />
                        </div>
                    )}

                    {terms && (
                        <div className="mt-0.5 shrink-0">
                            <p className="text-[6px] sm:text-[8px] md:text-[9px] font-medium tracking-wide uppercase line-clamp-1" style={{ opacity: 0.45 }}>
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
            className="block w-full h-full"
        >
            {content}
        </Link>
    );
}