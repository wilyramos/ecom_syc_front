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
            className="banner-slot relative w-full h-full overflow-hidden flex items-center border border-border"
            style={{ backgroundColor: bg }}
        >
            <div className="relative z-10 w-full h-full max-w-[1920px] mx-auto flex flex-row items-center px-4 sm:px-8 md:px-12 lg:px-20">
                {/* ── Media (izquierda) ─────────────────────────────── */}
                {media?.imageUrl && (
                    <div className="w-[45%] h-full relative flex items-center justify-center p-2 sm:p-4 lg:p-6">
                        <div className="relative w-full h-full">
                            <Image
                                src={media.imageUrl}
                                alt={media.altText ?? title ?? "Banner image"}
                                fill
                                className={media.objectFit === "contain" ? "object-contain object-left" : "object-cover"}
                                sizes="(max-width: 640px) 50vw, 45vw"
                                priority
                                unoptimized
                            />
                        </div>
                    </div>
                )}

                {/* ── Texto (derecha) ───────────────────────────────── */}
                <div
                    className="flex flex-col justify-center items-start text-left w-[55%] h-full py-2 sm:py-4 lg:py-6 pl-4 sm:pl-8 lg:pl-12 gap-1 sm:gap-3 lg:gap-4"
                    style={{ color: text }}
                >
                    {subtitle && (
                        <div>
                            <span
                                className="inline-block text-[clamp(0.5rem,1vw,1rem)] font-bold uppercase px-2 py-0.5 sm:py-1 leading-none bg-black/5 dark:bg-white/5"
                                style={{ borderLeft: `3px solid ${accent}` }}
                            >
                                {subtitle}
                            </span>
                        </div>
                    )}

                    {title && (
                        <h2 className="font-extrabold leading-tight tracking-tight text-[clamp(1rem,3.5vw,3.5rem)] line-clamp-2 md:line-clamp-3">
                            {title}
                        </h2>
                    )}

                    {description && (
                        <p
                            className="text-[clamp(0.6rem,1.2vw,1.125rem)] leading-snug sm:leading-relaxed line-clamp-2 sm:line-clamp-3 max-w-[45ch]"
                            style={{ opacity: 0.8 }}
                        >
                            {description}
                        </p>
                    )}

                    {price?.current !== undefined && price.current !== null && (
                        <div className="mt-auto sm:mt-2 w-full">
                            <SliderPrice
                                price={price}
                                textColor={text}
                                accentColor={accent}
                                isDark={isDark}
                            />
                        </div>
                    )}

                    {terms && (
                        <div className="mt-1 sm:mt-2">
                            <p className="text-[clamp(0.45rem,0.7vw,0.75rem)] font-medium tracking-wider uppercase line-clamp-1 opacity-50">
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