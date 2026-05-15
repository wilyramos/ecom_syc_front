"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

import type {
    CategoryResponse,
    CategoryListResponse,
} from "@/src/schemas";

import { routes } from "@/lib/routes";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuLink,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function ClientCategoriasDesktop({
    categories,
}: {
    categories: CategoryResponse[];
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
        <NavigationMenu className="z-50">
            <NavigationMenuList className="gap-1">
                {rootCategories.map((category) => {
                    const subcategories = grouped[category._id] || [];

                    return (
                        <NavigationMenuItem key={category._id}>
                            <NavigationMenuTrigger className="text-base font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)] ">
                                {category.nombre}
                            </NavigationMenuTrigger>

                            {subcategories.length > 0 && (
                                <NavigationMenuContent>
                                    <div
                                        className="
                                            w-[880px]
                                            p-6
                                        "
                                    >
                                        <div className="mb-5 flex items-center justify-between">
                                        
                                            <Link
                                                href={routes.catalog({
                                                    category: category.slug,
                                                })}
                                                className="
                                                    text-[13px]
                                                    font-medium
                                                    text-[var(--color-text-secondary)]
                                                    transition-colors
                                                    hover:text-[var(--color-text-primary)]
                                                "
                                            >
                                                Ver todo
                                            </Link>
                                        </div>

                                        <ul className="grid grid-cols-4 gap-3">
                                            {subcategories.map((subcat) => (
                                                <CategoryCard
                                                    key={subcat._id}
                                                    href={routes.catalog({
                                                        category:
                                                            subcat.slug,
                                                    })}
                                                    title={subcat.nombre}
                                                    image={subcat.image}
                                                />
                                            ))}
                                        </ul>
                                    </div>
                                </NavigationMenuContent>
                            )}
                        </NavigationMenuItem>
                    );
                })}
            </NavigationMenuList>
        </NavigationMenu>
    );
}

function CategoryCard({
    title,
    href,
    image,
}: {
    title: string;
    href: string;
    image?: string;
}) {
    const hasImage = Boolean(image);

    return (
        <li className="list-none">
            <NavigationMenuLink asChild>
                <Link
                    href={href}
                    className={`
                        group flex overflow-hidden
                        border border-[var(--color-border-subtle)]
                        transition-all duration-200

                        hover:bg-[var(--color-bg-secondary)]
                        hover:border-[var(--color-border-default)]

                        ${hasImage ? "flex-col" : "items-center p-4"}
                    `}
                >
                    {hasImage && (
                        <div
                            className="
                                relative flex h-[100px]
                                items-center justify-center
                                bg-[var(--color-bg-secondary)]
                            "
                        >
                            <Image
                                src={image || "/logoblanco.svg"}
                                alt={title}
                                fill
                                quality={90}
                                sizes="200px"
                                className="
                                    object-contain
                                    p-5
                                    transition-transform duration-300
                                    group-hover:scale-105
                                "
                            />
                        </div>
                    )}

                    <div className={hasImage ? "p-4" : ""}>
                        <span
                            className="
                                line-clamp-1
                                text-[14px]
                                font-medium
                                tracking-[-0.02em]
                                text-[var(--color-text-primary)]
                            "
                        >
                            {title}
                        </span>
                    </div>
                </Link>
            </NavigationMenuLink>
        </li>
    );
}