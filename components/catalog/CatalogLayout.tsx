// File: src/components/catalog/CatalogLayout.tsx
"use client";

import type { CatalogResponse } from "@/src/schemas/catalog";
import CatalogHeader, { TitlePart } from "./CatalogHeader";
import CatalogSidebar from "./CatalogSidebar";
import CatalogMobileFilters from "./CatalogMobileFilters";
import CatalogGrid from "./CatalogGrid";
import CatalogPagination from "./CatalogPagination";
import CatalogMobileSort from "./CatalogMobileSort";

interface CatalogLayoutProps {
    products: CatalogResponse['products'];
    filters: CatalogResponse['filters'];
    pagination: CatalogResponse['pagination'];
    context: CatalogResponse['context'];
    isFallback: boolean;
}

export default function CatalogLayout({
    products,
    filters,
    pagination,
    context,
    isFallback
}: CatalogLayoutProps) {

    const getTitle = (): TitlePart[] => {
        if (context.searchQuery) {
            return [
                { text: "Resultados para" },
                { text: `"${context.searchQuery}"`, italic: true },
            ];
        }

        const parts: TitlePart[] = [];
        if (context.categoryName) parts.push({ text: context.categoryName });
        if (context.brandName) parts.push({ text: context.brandName, italic: true });
        if (context.lineName) parts.push({ text: context.lineName, italic: true });

        return parts.length > 0 ? parts : [{ text: "Catálogo" }];
    };

    const breadcrumbs = [
        { label: "Inicio", href: "/" },
        { label: "Catálogo", href: "/catalogo" },
    ];
    if (context.categoryName) breadcrumbs.push({ label: context.categoryName, href: "#" });
    if (context.brandName) breadcrumbs.push({ label: context.brandName, href: "#" });

    return (
        <section className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pb-20 animate-in fade-in duration-700">
            
            {/* Header con espaciado amplio vertical */}
            <header className="py-8 md:py-12">
                <CatalogHeader
                    title={getTitle()}
                    totalProducts={pagination.totalItems}
                    breadcrumbs={breadcrumbs}
                />
            </header>

            <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 relative">

                {/* SIDEBAR: Más delgado y sin borde sólido, solo separación por aire */}
                <aside className="hidden lg:block w-64 xl:w-72 shrink-0">
                    <div className="sticky top-28">
                        <div className="pb-4 mb-8 border-b border-[var(--color-border-subtle)]">
                            <span className="text-md font-bold uppercase tracking-[0.2em] text-[var(--color-text-tertiary)]">
                                Filtros
                            </span>
                        </div>
                        <CatalogSidebar filters={filters} />
                    </div>
                </aside>

                <main className="flex-1 flex flex-col min-w-0">

                    {/* TOOLBAR MOBILE: Glassmorphism puro para fondos claros/oscuros */}
                    <div className="lg:hidden flex items-center justify-between sticky top-20 z-20 px-2 py-3 bg-[var(--color-bg-primary)]/80 backdrop-blur-xl border-b border-[var(--color-border-subtle)] mb-6">
                        <CatalogMobileFilters filters={filters} />
                        <CatalogMobileSort />
                    </div>

                    {/* GRILLA: El espaciado gap-x y gap-y es mayor para resaltar cada producto */}
                    <div className="min-h-[600px]">
                        <CatalogGrid products={products} isFallback={isFallback} />
                    </div>

                    {/* PAGINACIÓN: Sutil y con aire superior */}
                    {!isFallback && pagination.totalPages > 1 && (
                        <nav className="mt-20 pt-10 border-t border-[var(--color-border-subtle)]">
                            <CatalogPagination
                                currentPage={pagination.currentPage}
                                totalPages={pagination.totalPages}
                            />
                        </nav>
                    )}
                </main>
            </div>
        </section>
    );
}