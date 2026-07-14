import "server-only";
import { cache } from "react";

export interface Brand {
    _id: string;
    nombre: string;
    slug: string;
    descripcion?: string;
    logo?: string;
    isActive: boolean;
    createdAt: string;
}

// Obtenemos todas las marcas (generalmente usado en paneles o catálogos administrados)
export const getBrands = cache(async (): Promise<Brand[]> => {
    const res = await fetch(`${process.env.API_URL}/brands`, {
        cache: "force-cache",
        next: {
            tags: ["brands-list", "brands-all"]
        }
    });
    if (!res.ok) {
        return [];
    }
    return res.json();
});

// Obtenemos solo las marcas activas (usado en el carrusel de la página de inicio)
export const getActiveBrands = cache(async (): Promise<Brand[]> => {
    const res = await fetch(`${process.env.API_URL}/brands/active`, {
        cache: "force-cache",
        next: {
            tags: ["brands-active", "brands-all"]
        }
    });
    if (!res.ok) {
        return [];
    }
    return res.json();
});

// Obtenemos los detalles de una marca específica por su slug
export const getBrandBySlug = async (slug: string): Promise<Brand | null> => {
    const url = `${process.env.API_URL}/brands/slug/${slug}`;
    const res = await fetch(url, {
        cache: "force-cache",
        next: {
            tags: [`brand-${slug}`, "brands-all"]
        }
    });

    console.log('Fetching brand by slug:', slug, 'Response status:', res.status);
    if (!res.ok) {
        return null;
    }
    return res.json();
};