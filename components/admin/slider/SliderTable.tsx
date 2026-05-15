// File: src/components/admin/slider/SliderTable.tsx
"use client";

import {
    useState, useCallback, useTransition,
    useRef, useEffect,
} from "react";
import { reorderSliderBannersAction, type ReorderItem } from "@/actions/slider-actions";
import type { SliderBanner } from "@/src/schemas/slider.schema";
import BannerRow from "./BannerRow";
import EmptyStateSlider from "./EmptyStateSlider";
import Alert from "@/components/ui/Alert";
import {
    Table, TableHeader, TableHead, TableBody, TableRow, TableCell
} from "@/components/ui/table";


interface SliderTableProps {
    banners: SliderBanner[];
}

const HEADERS = ["", "Banner", "Tipo", "Layout", "Orden", "Estado", ""] as const;

export default function SliderTable({ banners }: SliderTableProps) {
    const [items, setItems]               = useState<SliderBanner[]>(banners);
    const [dragSourceId, setDragSourceId] = useState<string | null>(null);
    const [dragOverId, setDragOverId]     = useState<string | null>(null);
    const [errorMsg, setErrorMsg]         = useState<string | null>(null);
    const [isPending, startTransition]    = useTransition();
    const debounceRef                     = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (!dragSourceId) setItems(banners);
    }, [banners, dragSourceId]);

    const handleDragStart = useCallback((id: string) => {
        setDragSourceId(id);
    }, []);

    const handleDragEnd = useCallback(() => {
        setDragSourceId(null);
        setDragOverId(null);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent, id: string) => {
        e.preventDefault();
        if (id !== dragSourceId) setDragOverId(id);
    }, [dragSourceId]);

    const handleDrop = useCallback((targetId: string) => {
        if (!dragSourceId || dragSourceId === targetId) return;

        const sourceIdx = items.findIndex((b) => b._id === dragSourceId);
        const targetIdx = items.findIndex((b) => b._id === targetId);
        if (sourceIdx === -1 || targetIdx === -1) return;

        const reordered = [...items];
        const [moved]   = reordered.splice(sourceIdx, 1);
        reordered.splice(targetIdx, 0, moved);
        setItems(reordered);
        setDragSourceId(null);
        setDragOverId(null);

        const payload: ReorderItem[] = reordered.map((b, i) => ({
            id:    b._id,
            order: i,
        }));

        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            setErrorMsg(null);
            startTransition(async () => {
                const result = await reorderSliderBannersAction(payload);
                if (!result.success) {
                    setErrorMsg(result.message);
                    setItems(banners);
                }
            });
        }, 300);
    }, [dragSourceId, items, banners]);

    return (
        <div className="w-full flex flex-col bg-[var(--color-bg-primary)] gap-3">
            {errorMsg && (
                <Alert variant="error" mode="banner" onDismiss={() => setErrorMsg(null)}>
                    {errorMsg}
                </Alert>
            )}

            {isPending && (
                <Alert variant="info" mode="banner">
                    Guardando nuevo orden…
                </Alert>
            )}

            <div className="overflow-x-auto w-full touch-pan-x">
                <Table className="min-w-[800px] w-full table-auto border-separate border-spacing-0 text-sm text-[var(--color-text-secondary)]">
                    <TableHeader className="bg-[var(--color-bg-secondary)] border-b border-[var(--color-border-default)]">
                        <TableRow>
                            {HEADERS.map((h, i) => (
                                <TableHead
                                    key={i}
                                    className="p-3 text-center font-semibold text-[var(--color-text-primary)]"
                                >
                                    {h}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {items.length === 0 ? (
                            <TableRow>
                                <TableCell 
                                    colSpan={HEADERS.length}
                                    className="p-0 border-none"
                                >
                                    <EmptyStateSlider hasFilters={banners.length > 0} />
                                </TableCell>
                            </TableRow>
                        ) : (
                            items.map((banner) => (
                                <BannerRow
                                    key={banner._id}
                                    banner={banner}
                                    isDragging={dragSourceId === banner._id}
                                    isDragOver={dragOverId   === banner._id}
                                    onDragStart={handleDragStart}
                                    onDragOver={handleDragOver}
                                    onDragEnd={handleDragEnd}
                                    onDrop={handleDrop}
                                    onError={setErrorMsg}
                                />
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}