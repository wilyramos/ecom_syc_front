"use server";

import getToken from "@/src/auth/token";
import { createBrandSchema } from "@/src/schemas/brands";
import { ErrorResponse } from "@/src/schemas";
import { revalidatePath, revalidateTag } from "next/cache";

export type ActionStateType = { errors: string[]; success: string };

export async function createBrandAction(
    prev: ActionStateType,
    formData: FormData
): Promise<ActionStateType> {
    const token = await getToken();

    const brandData = {
        nombre: formData.get("nombre") as string,
        descripcion: formData.get("descripcion") as string,
        logo: formData.get("logo") ? (formData.get("logo") as string) : undefined
    };

    const parsed = createBrandSchema.safeParse(brandData);

    if (!parsed.success) {
        return {
            errors: parsed.error.errors.map(e => e.message),
            success: "",
        };
    }

    try {
        const res = await fetch(`${process.env.API_URL}/brands`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(parsed.data),
        });

        const json = await res.json();
        if (!res.ok) {
            const err = ErrorResponse.parse(json);
            return { errors: [err.message || "Error al crear"], success: "" };
        }

        // 1. Revalidar la interfaz administrativa
        revalidatePath("/admin/brands");

        // 2. Revalidar las consultas públicas en caché estática
        revalidateTag("brands-active"); // Carrusel de marcas activas
        revalidateTag("brands-list");   // Listados generales
        revalidateTag("brands-all");    // Limpieza global de seguridad

        if (json.slug) {
            revalidateTag(`brand-${json.slug}`);
        }

        return { errors: [], success: "Marca creada correctamente" };
    } catch (error) {
        console.error("Error al crear marca:", error);
        return { errors: ["Error interno al crear la marca"], success: "" };
    }
}