/* File: frontend/src/services/sale-service.ts */
import "server-only";
import getToken from "../auth/token";
import { saleSchema, Sale } from "@/src/schemas/sale.schema";
import { z } from "zod";

export interface PaginatedSales {
  success: boolean;
  sales: Sale[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export interface SaleFilters {
  page?: number;
  limit?: number;
  search?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  cashShiftId?: string;
}

export const SaleService = {
  getHistory: async (filters: SaleFilters = {}): Promise<PaginatedSales> => {
    const token = await getToken();

    const queryParams: Record<string, string> = {
      page: (filters.page || 1).toString(),
      limit: (filters.limit || 10).toString(),
    };

    if (filters.search && filters.search.trim() !== "") {
      queryParams.search = filters.search.trim();
    }
    if (filters.startDate && filters.startDate.trim() !== "") {
      queryParams.startDate = filters.startDate;
    }
    if (filters.endDate && filters.endDate.trim() !== "") {
      queryParams.endDate = filters.endDate;
    }
    if (filters.status && filters.status.trim() !== "") {
      queryParams.status = filters.status;
    }
    if (filters.cashShiftId && filters.cashShiftId.trim() !== "") {
      queryParams.cashShiftId = filters.cashShiftId.trim();
    }

    const params = new URLSearchParams(queryParams);
    const baseUrl = process.env.API_URL || "http://localhost:4000/api";
    const fullUrl = `${baseUrl}/sales/v2?${params.toString()}`;

    console.log("\n================ [DEBUG FRONTEND: SaleService.getHistory] ================");
    console.log("➡️ Target URL:", fullUrl);
    console.log("➡️ Filters recibidos:", JSON.stringify(filters, null, 2));
    console.log("➡️ Token presente:", Boolean(token));

    const res = await fetch(fullUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      next: {
        tags: ["sales"],
        revalidate: 10,
      },
    });

    console.log("⬅️ Status Code Backend:", res.status, res.statusText);

    if (!res.ok) {
      let rawText = "";
      try {
        rawText = await res.text();
        console.error("❌ Cuerpo de error crudo desde Backend (HTTP 500/400):", rawText);
      } catch (readErr) {
        console.error("❌ No se pudo leer el cuerpo de error:", readErr);
      }
      console.log("========================================================================\n");
      throw new Error(`Error al obtener historial de ventas [Status ${res.status}]: ${rawText}`);
    }

    const data = await res.json();
    console.log("✅ Respuesta JSON recibida. Total docs:", data.total, "| Items:", data.sales?.length);

    const validatedSales = z.array(saleSchema).safeParse(data.sales);

    if (!validatedSales.success) {
      console.error("⚠️ Error de validación Zod en respuesta de ventas:", JSON.stringify(validatedSales.error.format(), null, 2));
    }
    console.log("========================================================================\n");

    return {
      success: true,
      sales: validatedSales.success ? validatedSales.data : (data.sales as Sale[]),
      total: Number(data.total) || 0,
      totalPages: Number(data.totalPages) || 1,
      currentPage: Number(data.currentPage) || 1,
    };
  },

  getById: async (id: string): Promise<Sale | null> => {
    const token = await getToken();
    const baseUrl = process.env.API_URL || "http://localhost:4000/api";

    const res = await fetch(`${baseUrl}/sales/v2/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { tags: [`sale-${id}`] },
    });

    if (!res.ok) return null;

    const data = await res.json();
    const result = saleSchema.safeParse(data.sale || data);

    if (!result.success) {
      console.error(`Error validando venta ${id}:`, result.error.format());
      return null;
    }

    return result.data;
  },

  getQuotes: async (): Promise<Sale[]> => {
    const token = await getToken();
    const baseUrl = process.env.API_URL || "http://localhost:4000/api";

    const res = await fetch(`${baseUrl}/sales/v2/quotes`, {
      headers: { Authorization: `Bearer ${token}` },
      next: {
        tags: ["quotes"],
        revalidate: 0,
      },
    });

    if (!res.ok) throw new Error("Error al obtener proformas");

    const data = await res.json();
    const validated = z.array(saleSchema).safeParse(data.quotes);

    return validated.success ? validated.data : (data.quotes as Sale[]);
  },

  getExportUrl: (filters: Omit<SaleFilters, "page" | "limit">): string => {
    const cleanFilters: Record<string, string> = {};

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanFilters[key] = String(value);
      }
    });

    const params = new URLSearchParams(cleanFilters);
    const baseUrl = process.env.API_URL || "http://localhost:4000/api";
    return `${baseUrl}/sales/v2/export?${params.toString()}`;
  },
};