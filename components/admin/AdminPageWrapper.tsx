import React from "react";
import BackButton from "@/components/ui/BackButton";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

type BreadcrumbItem = {
    label: string;
    href: string;
};

type AdminPageWrapperProps = {
    title: string;
    children: React.ReactNode;
    breadcrumbItems?: BreadcrumbItem[];
    breadcrumbCurrent?: string;
    showBackButton?: boolean;
    actions?: React.ReactNode;
};

export default function AdminPageWrapper({
    title,
    children,
    breadcrumbItems = [],
    breadcrumbCurrent,
    showBackButton = true,
    actions,
}: AdminPageWrapperProps) {
    const hasBreadcrumb = breadcrumbItems.length > 0 || breadcrumbCurrent;

    return (
        <div className="w-full flex flex-col">
            {/* ── HEADER ── */}
            <header className="shrink-0 border-b border-[var(--color-border-default)] bg-[var(--color-bg-primary)] px-4 sm:px-6 lg:px-8 py-5">
                <div className="max-w-[1400px] mx-auto space-y-3">
                    {/* Breadcrumb */}
                    {hasBreadcrumb && (
                        <div className="text-sm">
                            <Breadcrumbs
                                items={breadcrumbItems}
                                current={breadcrumbCurrent}
                            />
                        </div>
                    )}

                    {/* Title & Actions */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
                            {title}
                        </h1>

                        <div className="flex items-center gap-3 self-end sm:self-auto">
                            {actions && (
                                <div className="flex items-center gap-2">
                                    {actions}
                                </div>
                            )}
                            {actions && showBackButton && (
                                <div className="h-5 w-px bg-[var(--color-border-default)] mx-1 hidden sm:block" />
                            )}
                            {showBackButton && <BackButton />}
                        </div>
                    </div>
                </div>
            </header>

            {/* ── CONTENT ── */}
            {/* Aquí aplicamos el padding de manera unificada y controlada en toda la app */}
            <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
                {children}
            </div>
        </div>
    );
}