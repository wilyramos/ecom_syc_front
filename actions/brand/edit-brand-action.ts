"use server";

import getToken from "@/src/auth/token";
import { ErrorResponse } from "@/src/schemas";
import { updateBrandSchema } from "@/src/schemas/brands";
import { revalidatePath, revalidateTag } from "next/cache";

export type ActionStateType = { errors: string[]; success: string };

export async function editBrandAction(
    id: string,
    _prev: ActionStateType,
    formData: FormData
): Promise<ActionStateType> {
    try {
        const token = await getToken();

        const parsed = updateBrandSchema.safeParse({
            nombre: formData.get("nombre"),
            descripcion: formData.get("descripcion"),
            logo: formData.get("logo") ? (formData.get("logo") as string) : undefined
        });
        
        if (!parsed.success) {
            return { errors: parsed.error.errors.map(e => e.message), success: "" };
        }

        const res = await fetch(`${process.env.API_URL}/brands/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(parsed.data),
        });

        const json = await res.json();

        if (!res.ok) {
            const { message } = ErrorResponse.parse(json);
            return { errors: [message || "Error al editar"], success: "" };
        }

        // 1. Revalidar la interfaz administrativa
        revalidatePath("/admin/brands");

        // 2. Revalidar las consultas públicas
        revalidateTag("brands-active");
        revalidateTag("brands-list");
        revalidateTag("brands-all");

        // Si el backend nos retorna el objeto actualizado con su slug
        if (json.slug) {
            revalidateTag(`brand-${json.slug}`);
        }

        return { errors: [], success: "Marca actualizada correctamente" };
    } catch (error) {
        console.error("Error al editar marca:", error);
        return { errors: ["Error interno al actualizar la marca"], success: "" };
    }
}