/* File: frontend/app/api/sales/[id]/pdf/route.ts */
import { NextResponse } from "next/server";
import getToken from "@/src/auth/token";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        const token = await getToken();
        const API_URL = process.env.API_URL || "http://localhost:4000/api";

        // Llamada al endpoint del backend
        const backendUrl = `${API_URL}/sales/v2/${id}/pdf`;

        const response = await fetch(backendUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/pdf",
            },
            cache: "no-store",
        });

        if (!response.ok) {
            const status = response.status;
            console.error(`[PDF_ROUTE_ERROR] Backend respondió ${status} para ID: ${id}`);
            return NextResponse.json(
                { error: "No se pudo generar el documento PDF" },
                { status }
            );
        }

        const pdfBuffer = await response.arrayBuffer();

        return new NextResponse(pdfBuffer, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `inline; filename="documento-${id}.pdf"`,
                "Cache-Control": "no-store, no-cache, must-revalidate",
            },
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Error desconocido";
        console.error(`[PDF_CRITICAL_ERROR] ID: ${id} | ${message}`);
        return NextResponse.json(
            { error: "Error interno al procesar el PDF" },
            { status: 500 }
        );
    }
}