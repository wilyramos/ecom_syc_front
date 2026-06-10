// app/sitemap.ts
import { GetAllProductsSlug } from "@/src/services/products";
import { getAllSubcategories } from "@/src/services/categorys";
import { getActiveBrands } from "@/src/services/brands";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Asegúrate de incluir las dos barras //
  const baseUrl = "https://www.sycmobile.pe";

  const [products, categories, brands] = await Promise.all([
    GetAllProductsSlug(),
    getAllSubcategories(),
    getActiveBrands(),
  ]);

  const staticPages = [
    { url: "/", priority: 1.0 },
    { url: "/catalogo", priority: 0.9 },
    { url: "/ofertas", priority: 0.8 },
    { url: "/novedades", priority: 0.8 },
    { url: "/categorias", priority: 0.7 },
    { url: "/hc/contacto-y-soporte", priority: 0.5 },
    { url: "/hc/preguntas-frecuentes", priority: 0.5 },
    { url: "/hc/garantias-y-devoluciones", priority: 0.5 },
    { url: "/hc/politicas-de-privacidad", priority: 0.3 },
    { url: "/terminos", priority: 0.3 },
    { url: "/cookies", priority: 0.3 },
  ];

  return [
    ...staticPages.map((page) => ({
      url: `${baseUrl}${page.url === "/" ? "" : page.url}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page.priority,
    })),
    ...categories.map((c) => ({
      url: `${baseUrl}/catalogo/${c.slug}`,
      lastModified: c.updatedAt || new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
    ...brands.map((b) => ({
      url: `${baseUrl}/catalogo/${b.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...products.map((p) => ({
      url: `${baseUrl}/productos/${p.slug}`,
      lastModified: p.updatedAt || new Date(),
      changeFrequency: "daily" as const,
      priority: 0.6,
    })),
  ];
}