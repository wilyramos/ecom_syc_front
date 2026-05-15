import { getProductsMainPage } from "@/src/services/products";
import ProductosList from "./ProductsList";
import Pagination from "../Pagination";
import ProductsFiltersMain from "./ProductsFiltersMain";
import OrdenarPor from "../products/OrdenarPor";
import DrawerFiltersMain from "./DrawerFiltersMain";
import ActiveFiltersChips from "../products/ActiveFiltersChips";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

type ProductResultsProps = {
    category?: string;
    priceRange?: string;
    page?: string;
    sort?: string;
    query?: string;
} & Record<string, string | string[] | undefined | number>;

export default async function ProductResults({
    category,
    priceRange,
    page,
    sort,
    query,
    ...rest
}: ProductResultsProps) {
    const currentPage = page ? parseInt(page, 10) : 1;

    const products = await getProductsMainPage({
        page: currentPage,
        category: category || "",
        priceRange: priceRange || "",
        query: query || "",
        sort: sort || "",
        ...rest,
    });

    if (!products) {
        return (
            <div className="py-24 text-center text-[var(--color-text-tertiary)] font-medium">
                Error al cargar productos
            </div>
        );
    }

    const isFallback = products.totalProducts === 0;
    const hasProducts = products.products.length > 0;

    const formatLabel = (text: string) => {
        const clean = text.replace(/-/g, ' ');
        return clean.charAt(0).toUpperCase() + clean.slice(1);
    };

    const displayTitle = query
        ? `Resultados para "${query}"`
        : category
            ? formatLabel(category)
            : "Todos los productos";

    return (
        <main className="w-full max-w-7xl mx-auto px-4 lg:px-0 animate-in fade-in duration-700">
            {/* Breadcrumbs sutiles */}
            <nav className="py-4 opacity-50 hover:opacity-100 transition-opacity">
                <Breadcrumbs
                    items={[
                        { label: "Catálogo", href: "/productos" },
                        ...(category ? [{ label: formatLabel(category), href: `/categoria/${category}` }] : []),
                    ]}
                />
            </nav>

            {!isFallback && (
                <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
                    
                    {/* SIDEBAR DE FILTROS (Apple Style) */}
                    <aside className="hidden md:block w-64 shrink-0">
                        <div className="sticky top-28 space-y-8">
                            <header className="space-y-1">
                                <h1 className="text-3xl font-bold tracking-tighter text-[var(--color-text-primary)]">
                                    {displayTitle}
                                </h1>
                                <p className="text-[13px] font-medium text-[var(--color-text-tertiary)] uppercase tracking-widest">
                                    {products.totalProducts} Modelos
                                </p>
                            </header>

                            <div className="pt-4 border-t border-[var(--color-border-subtle)]">
                                <ProductsFiltersMain filters={products.filters || null} />
                            </div>
                        </div>
                    </aside>

                    {/* GRILLA DE CONTENIDO */}
                    <section className="flex-1">
                        
                        {/* Header MOBILE */}
                        <div className="md:hidden mb-6 space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter text-[var(--color-text-primary)]">
                                {displayTitle}
                            </h1>
                            <p className="text-xs font-bold text-[var(--color-text-tertiary)] uppercase tracking-widest">
                                {products.totalProducts} Productos encontrados
                            </p>
                        </div>

                        {/* TOOLBAR SUPERIOR (Filtros Mobile y Sort) */}
                        <div className="flex items-center justify-between md:justify-end mb-8 py-3 border-y md:border-y-0 border-[var(--color-border-subtle)] sticky md:static top-14 bg-[var(--color-bg-primary)] z-10">
                            <div className="md:hidden">
                                <DrawerFiltersMain filters={products?.filters || null} />
                            </div>

                            <div className="flex items-center gap-4 text-sm">
                                <span className="hidden md:block text-[var(--color-text-tertiary)] font-medium">Ordenar por</span>
                                <OrdenarPor pathname="/productos" />
                            </div>
                        </div>

                        {/* CHIPS DE FILTROS ACTIVOS */}
                        <div className="mb-6">
                             <ActiveFiltersChips />
                        </div>

                        {hasProducts && (
                            <div className="space-y-16">
                                <ProductosList products={products.products} />

                                {/* PAGINACIÓN LIMPIA */}
                                <div className="py-12 border-t border-[var(--color-border-subtle)]">
                                    <Pagination
                                        currentPage={products.currentPage}
                                        totalPages={products.totalPages}
                                        limit={24}
                                        pathname="/productos"
                                        queryParams={{
                                            category,
                                            priceRange,
                                            sort,
                                            query,
                                            ...rest,
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            )}

            {/* ESTADO VACÍO (Empty State) */}
            {isFallback && (
                <div className="flex flex-col items-center py-24 animate-in slide-in-from-bottom-4 duration-700">
                    <div className="text-center max-w-md mb-20">
                        <h2 className="text-4xl font-bold text-[var(--color-text-primary)] tracking-tighter mb-4">
                            Sin resultados.
                        </h2>
                        <p className="text-[var(--color-text-tertiary)] text-lg leading-relaxed">
                            No encontramos lo que buscas. Prueba ajustando los filtros o usando términos más generales.
                        </p>
                    </div>

                    {hasProducts && (
                        <div className="w-full">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-text-tertiary)] mb-12 text-center">
                                Recomendaciones para ti
                            </h3>
                            <ProductosList products={products.products} />
                        </div>
                    )}
                </div>
            )}
        </main>
    );
}