"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Props {
    title: React.ReactNode;
    viewAllHref?: string;
    label?: string;
}

export default function HeaderConTituloConControles({ title, viewAllHref, label }: Props) {
    return (
        <div className="w-full flex flex-col gap-1.5 mb-6 md:mb-8 border-b border-gray-100 pb-4">
            <div className="flex items-end justify-between w-full">
                {/* Título y Label */}
                <div className="flex flex-col gap-1">
                    {label && (
                        <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-accent)]">
                            {label}
                        </span>
                    )}
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--color-text-primary)] leading-tight">
                        {title}
                    </h2>
                </div>

                {viewAllHref && (
                    <Link
                        href={viewAllHref}
                        className="flex items-center gap-0.5 text-sm font-semibold text-[var(--color-accent,#0066cc)] hover:opacity-80 transition-all group"
                    >
                        <span>Ver todo</span>
                        <ChevronRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Link>
                )}
            </div>
        </div>
    );
}