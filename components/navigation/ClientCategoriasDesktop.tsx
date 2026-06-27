"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import type { CategoryListResponse, CategoryResponse } from "@/src/schemas/category.schema";
import type { Collection } from "@/src/schemas/collection.schema";
import { routes } from "@/lib/routes";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function ClientCategoriasDesktop({
    categories,
    collections = [],
}: {
    categories: CategoryResponse[];
    collections?: Collection[];
}) {
    const grouped = React.useMemo(() => {
        return categories.reduce((acc, category) => {
            const parentId =
                category.parent && typeof category.parent !== "string"
                    ? category.parent._id
                    : null;
            const key = parentId ?? "root";
            if (!acc[key]) acc[key] = [];
            acc[key].push(category);
            return acc;
        }, {} as Record<string, CategoryListResponse>);
    }, [categories]);

    const rootCategories = grouped["root"] || [];

    return (
        <NavigationMenu className="z-50 w-full max-w-none justify-start">
            <NavigationMenuList className="flex items-center gap-1">

                {/* 1. SECCIÓN DE CATEGORÍAS */}
                {rootCategories.map((cat) => {
                    const sub = grouped[cat._id] || [];
                    return (
                        <NavigationMenuItem key={cat._id}>
                            <NavigationMenuTrigger className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]">
                                {cat.nombre}
                            </NavigationMenuTrigger>

                            {sub.length > 0 && (
                                <NavigationMenuContent>
                                    <div className="grid grid-cols-[240px_1fr]  bg-card overflow-hidden">

                                    

                                        {/* Panel derecho: Subcategorías */}
                                        <div className="p-6 bg-card">
                                            <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                                                {sub.map((subcat) => (
                                                    <ListItem
                                                        key={subcat._id}
                                                        href={routes.catalog({ category: subcat.slug })}
                                                        title={subcat.nombre}
                                                        image={subcat.image}
                                                    />
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </NavigationMenuContent>
                            )}
                        </NavigationMenuItem>
                    );
                })}

                {/* 2. SECCIÓN DE COLECCIONES */}
                {collections.map((col) => {
                    const hasCustomColor = typeof col.color === "string" && col.color.trim().length > 0;
                    const customColor = col.color ?? undefined;

                    return (
                        <NavigationMenuItem key={col._id}>
                            <NavigationMenuLink asChild>
                                <Link
                                    href={`/colecciones/${col.slug}`}
                                    className="group flex items-center flex-row gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-background-secondary/60"
                                    style={hasCustomColor ? {
                                        color: customColor,
                                        "--collection-hover-color": customColor,
                                    } as React.CSSProperties : {
                                        color: "currentColor"
                                    }}
                                >
                                    {/* Icono / Imagen forzado al lado izquierdo en la misma línea */}
                                    <div
                                        className="w-5 h-5 rounded-md flex-shrink-0 overflow-hidden border border-border/60 flex items-center justify-center bg-background transition-transform group-hover:scale-105"
                                        style={hasCustomColor ? { borderColor: customColor } : undefined}
                                    >
                                        {col.image ? (
                                            <Image
                                                src={col.image}
                                                alt={col.name}
                                                width={20}
                                                height={20}
                                                className="object-cover w-full h-full"
                                                unoptimized
                                                quality={5}
                                            />
                                        ) : col.icon ? (
                                            <span
                                                className="text-xs leading-none flex items-center justify-center"
                                                style={hasCustomColor ? { color: customColor } : undefined}
                                            >
                                                {col.icon}
                                            </span>
                                        ) : (
                                            <div
                                                className="w-1.5 h-1.5 rounded-full"
                                                style={hasCustomColor ? { backgroundColor: customColor } : { backgroundColor: "var(--muted-foreground)" }}
                                            />
                                        )}
                                    </div>

                                    {/* Nombre de la colección alineado horizontalmente */}
                                    <span className="transition-colors duration-200 whitespace-nowrap">
                                        {col.name}
                                    </span>
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    );
                })}

            </NavigationMenuList>
        </NavigationMenu>
    );
}

function ListItem({
    title,
    href,
    image,
}: {
    title: string;
    href: string;
    image?: string | null;
}) {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    href={href}
                    className="group flex items-center gap-1 transition-colors hover:bg-background-secondary"
                >
                    <div className="relative w-7 h-7 flex-shrink-0 bg-background overflow-hidden border border-border rounded transition-colors">
                        {image ? (
                            <Image
                                src={image}
                                alt={title}
                                fill
                                className="object-contain p-0.5 transition-transform duration-300 group-hover:scale-105"
                                sizes="28px"
                                quality={10}
                                unoptimized
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground opacity-30 text-[7px] font-bold">
                                GP
                            </div>
                        )}
                    </div>
                    <span className="text-[13px] font-medium text-foreground truncate group-hover:text-primary transition-colors">
                        {title}
                    </span>
                </Link>
            </NavigationMenuLink>
        </li>
    );
}