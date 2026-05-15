// frontend/components/navigation/ButtonSearchMobile.tsx
"use client";

import { Search, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import ButtonSearchFormStore from "../ui/ButtonSearchFormStore";

export default function ButtonSearchMobile() {
    const [openSearch, setOpenSearch] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(64); // 64px es el fallback de h-16
    const containerRef = useRef<HTMLDivElement>(null);

    const searchBarHeight = 64; // Altura fija controlada para la barra de búsqueda móvil

    useEffect(() => {
        const updateHeight = () => {
            const nav = document.getElementById("navbar-fixed");
            if (nav) {
                setHeaderHeight(nav.offsetHeight);
            }
        };

        updateHeight();
        window.addEventListener("resize", updateHeight);
        return () => window.removeEventListener("resize", updateHeight);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpenSearch(false);
            }
        };

        if (openSearch) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [openSearch]);

    return (
        <>
            <button
                onClick={() => setOpenSearch(!openSearch)}
                className="md:hidden p-2 rounded-full text-[var(--color-text-primary)] hover:bg-[var(--color-text-secondary)] transition-colors active:scale-95"
                aria-label="Buscar productos"
            >
                {openSearch ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </button>

            {openSearch && (
                <div
                    ref={containerRef}
                    className="fixed left-0 w-full bg-[var(--color-bg-primary)] border-b border-[var(--color-border-subtle)] z-[45] px-4 md:hidden flex items-center animate-in fade-in slide-in-from-top-2 duration-200"
                    style={{ 
                        top: headerHeight,
                        height: searchBarHeight 
                    }}
                >
                    <ButtonSearchFormStore
                        isMobile={true}
                        onSearchComplete={() => setOpenSearch(false)}
                    />
                </div>
            )}

            {openSearch && (
                <div
                    className="fixed inset-0 bg-black/40 z-[40] md:hidden"
                    style={{
                        top: headerHeight,
                        height: `calc(100vh - ${headerHeight}px)`
                    }}
                    onClick={() => setOpenSearch(false)}
                />
            )}
        </>
    );
}