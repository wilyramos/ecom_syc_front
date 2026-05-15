// File: app/(admin)/admin/slider/page.tsx

import { SliderService } from "@/src/services/slider-service";
import AdminPageWrapper from "@/components/admin/AdminPageWrapper";
import NuevoBanner from "@/components/admin/slider/NuevoBanner";
import SliderFilters from "@/components/admin/slider/SliderFilters";
import SliderTable from "@/components/admin/slider/SliderTable";
import Pagination from "@/components/ui/Pagination";
import { SliderContentTypeEnum } from "@/src/schemas/slider.schema";
import type { SliderContentType } from "@/src/services/slider-service";

interface SearchParams {
    page?: string;
    limit?: string;
    search?: string;
    isActive?: string;
    contentType?: string;
}

interface PageProps {
    searchParams: Promise<SearchParams>;
}

export default async function SliderPage({ searchParams }: PageProps) {
    const params = await searchParams;

    const page = Math.max(1, Number(params.page ?? 1));
    const limit = Math.max(1, Number(params.limit ?? 10));
    const search = params.search?.trim() || undefined;
    const isActive =
        params.isActive === "true" ? true :
            params.isActive === "false" ? false :
                undefined;
    const rawContentType = params.contentType;
    const contentType: SliderContentType | undefined =
        SliderContentTypeEnum.options.includes(rawContentType as SliderContentType)
            ? (rawContentType as SliderContentType)
            : undefined;

    const { data: banners, total, pages } = await SliderService.getAllAdmin({
        page,
        limit,
        search,
        isActive,
        contentType,
    });

    const hasBanners = banners && banners.length > 0;

    return (
        <AdminPageWrapper
            title="Slider Banners"
            breadcrumbItems={[{ label: "Inicio", href: "/admin" }]}
            breadcrumbCurrent="Slider"
            showBackButton={false}
            actions={<NuevoBanner />}
        >
            <div className="w-full flex flex-col gap-4">
                {/* Filtros con tipografía estandarizada */}
                <SliderFilters
                    filters={{
                        search: params.search,
                        isActive: params.isActive,
                        contentType: params.contentType,
                    }}
                />

                <div className="flex flex-col w-full gap-4">
                    {/* Contenedor de tabla con bordes del sistema */}
                    <div className="overflow-hidden rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-primary)]">
                        <SliderTable banners={banners} />
                        
                        {!hasBanners && (
                            <div className="text-center py-12 border-t border-[var(--color-border-default)] bg-[var(--color-bg-primary)]">
                                <p className="text-sm font-medium text-[var(--color-text-secondary)]">
                                    No se encontraron banners disponibles.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Footer de tabla: Tipografía XS para metadatos y paginación limpia */}
                    {hasBanners && total > 0 && (
                        <div className="py-2 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-[var(--color-border-subtle)] pt-4">
                            <p className="text-xs font-bold uppercase tracking-tight text-[var(--color-text-tertiary)]">
                                Mostrando {banners.length} de {total} banners
                            </p>
                            <div className="flex justify-center md:justify-end">
                                <Pagination
                                    currentPage={page}
                                    totalPages={pages}
                                    limit={limit}
                                    pathname="/admin/slider"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminPageWrapper>
    );
}