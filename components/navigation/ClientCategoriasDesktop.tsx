"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import type { CategoryResponse, CategoryListResponse } from "@/src/schemas";
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
                            <NavigationMenuTrigger>
                                {cat.nombre}
                            </NavigationMenuTrigger>

                            {sub.length > 0 && (
                                <NavigationMenuContent>
                                    <div className="grid grid-cols-[240px_1fr] w-[740px] bg-card overflow-hidden">
                                        
                                        {/* Panel izquierdo */}
                                        <div className="bg-background-secondary p-6 flex flex-col justify-between relative group">
                                            <Link
                                                href={routes.catalog({ category: cat.slug })}
                                                className="absolute inset-0 z-10"
                                                aria-label={`Ver todo ${cat.nombre}`}
                                            />
                                            <div>
                                                <h3 className="text-xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors mb-2">
                                                    {cat.nombre}
                                                </h3>
                                                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                                                    {cat.descripcion || `Explora lo último en la categoría de ${cat.nombre.toLowerCase()}.`}
                                                </p>
                                            </div>
                                            <div className="text-xs font-medium text-foreground opacity-80 group-hover:opacity-100 group-hover:underline underline-offset-4 transition-all">
                                                Ver todo
                                            </div>
                                        </div>

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

                {/* 2. SECCIÓN DE COLECCIONES (Renderizadas directamente al lado de las categorías) */}
                {collections.map((col) => {
                    const hasCustomColor = typeof col.color === "string" && col.color.trim().length > 0;
                    const customColor = col.color ?? undefined;

                    return (
                        <NavigationMenuItem key={col._id}>
                            <NavigationMenuLink asChild>
                                <Link
                                    href={`/colecciones/${col.slug}`}
                                    className="group relative flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-background-secondary/60 transition-all duration-200"
                                    style={hasCustomColor ? { 
                                        "--collection-hover-color": customColor,
                                    } as React.CSSProperties : undefined}
                                >
                                    {/* Indicador / Contenedor visual de la Colección */}
                                    <div
                                        className="w-5 h-5 rounded-md flex-shrink-0 overflow-hidden border border-border/60 flex items-center justify-center bg-background transition-transform group-hover:scale-105"
                                        style={hasCustomColor ? { backgroundColor: customColor } : undefined}
                                    >
                                        {col.image ? (
                                            <Image
                                                src={col.image}
                                                alt={col.name}
                                                width={20}
                                                height={20}
                                                className="object-cover w-full h-full"
                                            />
                                        ) : col.icon ? (
                                            <span 
                                                className="text-xs leading-none"
                                                style={hasCustomColor ? { color: "#fff", filter: "drop-shadow(0px 1px 1px rgba(0,0,0,0.2))" } : undefined}
                                            >
                                                {col.icon}
                                            </span>
                                        ) : hasCustomColor ? null : (
                                            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
                                        )}
                                    </div>

                                    {/* Texto con cambio de color dinámico en Hover */}
                                    <span 
                                        className="transition-colors duration-200 group-hover:text-[var(--collection-hover-color,var(--primary))]"
                                    >
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
                    className="group flex items-center gap-2.5 p-1.5 rounded transition-colors hover:bg-background-secondary"
                >
                    <div className="relative w-7 h-7 flex-shrink-0 bg-background overflow-hidden border border-border rounded transition-colors">
                        {image ? (
                            <Image
                                src={image}
                                alt={title}
                                fill
                                className="object-contain p-0.5 transition-transform duration-300 group-hover:scale-105"
                                sizes="28px"
                                quality={40}
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