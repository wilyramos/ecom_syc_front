"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import SliderPrice from "../ui/SliderPrice";
import type { SliderBanner } from "@/src/schemas/slider.schema";

export default function LayoutBackgroundMedia({ banner }: { banner: SliderBanner }) {
    const { design, media, title, subtitle, description, terms, price, destUrl, openInNewTab } = banner;
    const videoRef = useRef<HTMLVideoElement>(null);

    const isDark = design.theme !== "light";
    const bg = design.bgColor ?? (isDark ? "#000000" : "#ffffff");
    const text = design.textColor ?? (isDark ? "#a8a8a8" : "#0f0f0f");
    const accent = design.accentColor ?? "#3098b3";
    const isVideo = Boolean(media?.videoUrl);

    const content = (
        <div
            className="banner-slot relative w-full overflow-hidden flex items-end justify-center text-center border border-border"
            style={{ backgroundColor: bg }}
        >
            {/* ── Media de fondo ────────────────────────────────────── */}
            {isVideo ? (
                <video
                    ref={videoRef}
                    src={media!.videoUrl!}
                    poster={media!.videoPoster ?? media!.imageUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                />
            ) : media?.imageUrl ? (
                <Image
                    src={media.imageUrl}
                    alt={media.altText ?? title ?? ""}
                    fill
                    className={`absolute inset-0 ${media.objectFit === "contain" ? "object-contain" : "object-cover"}`}
                    sizes="100vw"
                    priority
                    unoptimized
                />
            ) : null}

            {/* ── Gradiente inferior ────────────────────────────────── */}
            <div
                className="absolute inset-x-0 bottom-0 pointer-events-none z-10"
                style={{
                    height: "100%",
                    background: `linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.40) 50%, transparent 100%)`,
                }}
            />

            {/* ── Contenido ─────────────────────────────────────────── */}
            <div className="relative z-20 w-full max-w-6xl mx-auto px-4 pb-2 sm:pb-6 md:pb-12 flex flex-col items-center">
                <div
                    className="flex flex-col items-center w-full max-w-[90%] sm:max-w-xl md:max-w-2xl"
                    style={{ color: text }}
                >
                    {subtitle && (
                        <div className="mb-1 md:mb-3">
                            <span
                                className="inline-block text-[8px] sm:text-[10px] font-bold tracking-[0.2em] sm:tracking-[0.32em] uppercase px-3 py-[3px] rounded-full"
                                style={{
                                    color: accent,
                                    background: `${accent}22`,
                                    border: `1px solid ${accent}40`,
                                    backdropFilter: "blur(4px)",
                                }}
                            >
                                {subtitle}
                            </span>
                        </div>
                    )}

                    {title && (
                        <h2 className="font-black leading-[1.05] tracking-[-0.04em] text-[clamp(16px,4vw,3.5rem)] line-clamp-2">
                            {title}
                        </h2>
                    )}

                    {description && (
                        <p className="mt-1 md:mt-3 text-[10px] sm:text-xs md:text-sm leading-tight sm:leading-relaxed max-w-[50ch] line-clamp-1 sm:line-clamp-2" style={{ opacity: 0.85 }}>
                            {description}
                        </p>
                    )}

                    {price?.current !== undefined && price.current !== null && (
                        <div className="mt-1 md:mt-3 scale-90 sm:scale-100">
                            <SliderPrice
                                price={price}
                                textColor={text}
                                accentColor={accent}
                                isDark={isDark}
                            />
                        </div>
                    )}

                    {terms && (
                        <div className="mt-1 md:mt-3 hidden sm:block">
                            <p className="text-[8px] sm:text-[9px] font-medium tracking-wide uppercase" style={{ opacity: 0.55 }}>
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