"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { collectionService } from "../services/collection-service";
import {
    createCollectionPayloadSchema,
    updateCollectionPayloadSchema,
    Collection,
    CollectionType,
} from "../schemas/collection.schema";
import { ZodError } from "zod";

interface ActionResponse<T = undefined> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

const getErrorMessage = (error: unknown): string => {
    if (error instanceof ZodError) return error.errors.map(e => e.message).join(", ");
    if (error instanceof Error) return error.message;
    return "Error desconocido";
};

function processCollectionFormData(formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());

    // Función auxiliar interna para procesar cada fecha de forma segura
    const parseToISO = (value: unknown): string | undefined => {
        if (!value || typeof value !== "string" || value.trim() === "") {
            return undefined;
        }
        const date = new Date(value);
        return isNaN(date.getTime()) ? undefined : date.toISOString();
    };

    return {
        ...rawData,
        order: rawData.order ? Number(rawData.order) : undefined,
        isActive: formData.has("isActive"),
        startsAt: parseToISO(rawData.startsAt),
        endsAt: parseToISO(rawData.endsAt),
    };
}

/**
 * Helper para invalidar cachés relacionadas con promociones y listados generales
 */
function triggerCollectionRevalidation(slug?: string, type?: CollectionType | string) {
    // 1. Invalidamos las vistas de listas y carruseles públicos
    revalidateTag("collections-list");
    revalidateTag("collections-all"); // Tag comodín que resetea todo lo público de colecciones

    // 2. Si es una promoción, invalidamos específicamente esa sección
    if (type === "promotion") {
        revalidateTag("promotions-active");
    }

    // 3. Si se provee un slug, limpiamos su página de detalle específica
    if (slug) {
        revalidateTag(`collection-${slug}`);
    }
}

export async function createCollectionAction(
    prevState: ActionResponse<Collection> | null,
    formData: FormData
): Promise<ActionResponse<Collection>> {
    try {
        const processedData = processCollectionFormData(formData);
        const validatedFields = createCollectionPayloadSchema.parse(processedData);
        const newCollection = await collectionService.create(validatedFields);

        // Revalidación de rutas de admin
        revalidatePath("/admin/collections");

        // Revalidación de tags bajo demanda
        triggerCollectionRevalidation(newCollection.slug, validatedFields.type);

        return { success: true, data: newCollection, message: "Colección creada con éxito" };
    } catch (error) {
        return { success: false, error: getErrorMessage(error) };
    }
}

export async function updateCollectionAction(
    id: string,
    prevState: ActionResponse<Collection> | null,
    formData: FormData
): Promise<ActionResponse<Collection>> {
    try {
        const processedData = processCollectionFormData(formData);
        const validatedFields = updateCollectionPayloadSchema.parse(processedData);
        const updatedCollection = await collectionService.update(id, validatedFields);

        // Revalidación de rutas de admin
        revalidatePath("/admin/collections");
        revalidatePath(`/admin/collections/${updatedCollection.slug}`);

        // Revalidación de tags bajo demanda para actualizar la interfaz pública
        triggerCollectionRevalidation(updatedCollection.slug, updatedCollection.type);

        return { success: true, data: updatedCollection, message: "Colección actualizada con éxito" };
    } catch (error) {
        return { success: false, error: getErrorMessage(error) };
    }
}

export async function deleteCollectionAction(
    id: string,
    slug: string,
    type?: CollectionType
): Promise<ActionResponse> {
    try {
        await collectionService.delete(id);

        // Revalidación de rutas de admin
        revalidatePath("/admin/collections");

        // Revalidación de tags bajo demanda
        triggerCollectionRevalidation(slug, type);

        return { success: true, message: "Colección eliminada correctamente" };
    } catch (error) {
        return { success: false, error: getErrorMessage(error) };
    }
}

export async function addProductsToCollectionAction(
    id: string,
    slug: string,
    productIds: string[]
): Promise<ActionResponse> {
    try {
        await collectionService.addProducts(id, productIds);

        // Revalidación de rutas de admin
        revalidatePath(`/admin/collections/${slug}`);

        // Limpia el caché estático del detalle de la colección para mostrar los nuevos productos
        revalidateTag(`collection-${slug}`);
        revalidateTag("collections-all");

        return { success: true, message: "Productos vinculados con éxito" };
    } catch (error) {
        return { success: false, error: getErrorMessage(error) };
    }
}

export async function removeProductFromCollectionAction(
    id: string,
    slug: string,
    productId: string
): Promise<ActionResponse> {
    try {
        await collectionService.removeProduct(id, productId);

        // Revalidación de rutas de admin
        revalidatePath(`/admin/collections/${slug}`);

        // Limpia el caché estático del detalle de la colección para reflejar el producto eliminado
        revalidateTag(`collection-${slug}`);
        revalidateTag("collections-all");

        return { success: true, message: "Producto desvinculado con éxito" };
    } catch (error) {
        return { success: false, error: getErrorMessage(error) };
    }
}