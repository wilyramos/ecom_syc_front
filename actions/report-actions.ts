/* File: frontend/src/actions/report-actions.ts */
"use server";

import { apiServerClient } from "@/src/infrastructure/api/api-server-client";

export interface ReportFilters {
    period?: string;
    startDate?: string;
    endDate?: string;
}

export interface DashboardStats {
    summary: {
        totalSales: number;
        totalOrders: number;
        totalUnits: number;
        netProfit: number;
        inventoryValue: number;
        lowStockCount: number;
    };
    salesByMethod: { method: string; amount: number }[];
    salesByDate: { date: string; total: number; orders: number }[];
    topProducts: {
        _id: string;
        name: string;
        image?: string;
        soldUnits: number;
        revenue: number;
    }[];
}

export async function getDashboardStatsAction(filters: ReportFilters) {
    const params = new URLSearchParams();
    if (filters.period) params.append('period', filters.period);
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);

    try {
        // Corrección de URL a /reports/v2/stats
        const res = await apiServerClient<{ success: boolean; data: DashboardStats }>(
            `/reports/v2/stats?${params.toString()}`,
            { method: "GET", next: { revalidate: 0 } } 
        );
        return { success: true, data: res.data };
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Error desconocido";
        console.error("Error obteniendo reportes:", message);
        return { success: false, data: null, error: message };
    }
}