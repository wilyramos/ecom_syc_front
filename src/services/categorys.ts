// File: frontend/src/services/categorys.ts
import "server-only";

import { cache } from "react";
import { notFound } from "next/navigation";
import {
    apiCategorySchema,
    apiCategoryListSchema,
    type CategoryResponse,
    type CategoryListResponse,
} from "@/src/schemas/category.schema";

const BASE = `${process.env.API_URL}/category`;

// ─── Por ID ───────────────────────────────────────────────────────────────────
export const getCategory = cache(async (id: string): Promise<CategoryResponse> => {
    const res = await fetch(`${BASE}/${id}`, {
        cache: "force-cache", // <-- Habilita caché estática
        next: { tags: ["categories", `category-${id}`] },
    });

    if (!res.ok) notFound();
    return apiCategorySchema.parse(await res.json());
});

// ─── Por slug ─────────────────────────────────────────────────────────────────
export const getCategoryBySlug = cache(async (slug: string): Promise<CategoryResponse> => {
    const res = await fetch(`${BASE}/slug/${slug}`, {
        cache: "force-cache", // <-- Habilita caché estática
        next: { tags: ["categories", `category-slug-${slug}`] },
    });

    if (!res.ok) notFound();
    return apiCategorySchema.parse(await res.json());
});

// ─── Todas ────────────────────────────────────────────────────────────────────
export const getCategories = cache(async (): Promise<CategoryListResponse> => {
    const res = await fetch(BASE, {
        cache: "force-cache", // <-- Habilita caché estática
        next: { tags: ["categories"] },
    });

    if (!res.ok) notFound();
    return apiCategoryListSchema.parse(await res.json());
});

// ─── Categorías raíz (antes "patterns") ──────────────────────────────────────
export const getRootCategories = cache(async (): Promise<CategoryListResponse> => {
    const res = await fetch(`${BASE}/roots`, {
        cache: "force-cache", // <-- Habilita caché estática
        next: { tags: ["categories", "root-categories"] },
    });

    if (!res.ok) notFound();
    return apiCategoryListSchema.parse(await res.json());
});

// ─── Todas las subcategorías pobladas (Usada por CategoriasDestacadasWrapper) ──
export const getAllSubcategories = cache(async (): Promise<CategoryListResponse> => {
    const res = await fetch(`${BASE}/subcategories`, {
        cache: "force-cache", // <-- Fuerza la persistencia en el CDN
        next: { 
            // Agregamos la etiqueta para limpiar específicamente el carrusel de inicio
            tags: ["categories", "subcategories"] 
        },
    });

    if (!res.ok) notFound();
    return apiCategoryListSchema.parse(await res.json());
});

// ─── Subcategorías de una categoría específica ───────────────────────────────
export const getSubcategoriesById = cache(async (id: string): Promise<CategoryListResponse> => {
    const res = await fetch(`${BASE}/${id}/subcategories`, {
        cache: "force-cache", // <-- Habilita caché estática
        next: { tags: ["categories", `subcategories-${id}`] },
    });

    if (!res.ok) notFound();
    return apiCategoryListSchema.parse(await res.json());
});