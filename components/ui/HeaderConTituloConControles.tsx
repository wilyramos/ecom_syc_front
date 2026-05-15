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
        <div className="w-full flex flex-col gap-1 mb-4">
            <div className="flex items-end justify-between pb-4">
                
                {/* Título y Label */}
                <div className="flex flex-col gap-1">
                    {label && (
                        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-text-secondary)]">
                            {label}
                        </span>
                    )}
                    <h2 className="text-xl md:text-2xl font-semibold tracking-tighter text-[var(--color-text-primary)] leading-none">
                        {title}
                    </h2>
                </div>

                {/* Link "Ver todo" a la derecha en Desktop */}
                {viewAllHref && (
                    <Link 
                        href={viewAllHref} 
                        className="hidden md:flex items-center gap-1 text-sm font-medium text-[var(--color-text-primary)] hover:opacity-60 transition-all group"
                    >
                        Explorar todo
                        <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                )}
            </div>

            {/* Link para Mobile */}
            {viewAllHref && (
                <Link 
                    href={viewAllHref} 
                    className="md:hidden text-xs font-semibold uppercase tracking-widest text-[var(--color-text-primary)] flex items-center gap-1 pt-2"
                >
                    Ver todo <ChevronRight size={12} />
                </Link>
            )}
        </div>
    );
}