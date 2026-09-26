/* File: frontend/src/components/sales/sales-filters.tsx */
"use client";

import * as React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { format, isValid, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon, Search, X } from "lucide-react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExportButton } from "./export-button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

const getInitialDate = (param: string | null, defaultDate: Date): Date => {
    if (!param) return defaultDate;
    const parsed = parseISO(param);
    return isValid(parsed) ? parsed : defaultDate;
};

export function SalesFilters() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [dateRange, setDateRange] = React.useState<Range[]>([
        {
            startDate: getInitialDate(searchParams.get("startDate"), new Date()),
            endDate: getInitialDate(searchParams.get("endDate"), new Date()),
            key: "selection",
        },
    ]);

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", "1");
        if (term.trim()) {
            params.set("search", term.trim());
        } else {
            params.delete("search");
        }
        router.replace(`${pathname}?${params.toString()}`);
    };

    const handleDateChange = (ranges: RangeKeyDict) => {
        const { selection } = ranges;
        if (!selection) return;

        setDateRange([selection]);

        const params = new URLSearchParams(searchParams.toString());
        params.set("page", "1");

        // Formato seguro YYYY-MM-DD para evitar desfases de hora UTC
        if (selection.startDate) {
            params.set("startDate", format(selection.startDate, "yyyy-MM-dd"));
        }
        if (selection.endDate) {
            params.set("endDate", format(selection.endDate, "yyyy-MM-dd"));
        }

        router.replace(`${pathname}?${params.toString()}`);
    };

    const handleClear = () => {
        const initialRange: Range = {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        };
        setDateRange([initialRange]);
        router.replace(pathname);
    };

    const hasFilters = Boolean(searchParams.get("search") || searchParams.get("startDate"));

    return (
        <div className="flex flex-col gap-3 bg-[var(--color-bg-secondary)] p-4 rounded-2xl border border-[var(--color-border-default)] sm:flex-row sm:items-center">
            {/* Buscador */}
            <div className="relative flex-1 group">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[var(--color-text-tertiary)] group-focus-within:text-[var(--color-accent)] transition-colors" />
                <Input
                    placeholder="Buscar por ticket, cliente o documento..."
                    className="pl-10 h-10 bg-[var(--color-bg-primary)] border-[var(--color-border-default)] rounded-xl text-xs font-medium text-[var(--color-text-primary)]"
                    defaultValue={searchParams.get("search") ?? ""}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>

            {/* Selector de Rango de Fechas */}
            <div className="flex flex-wrap items-center gap-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="h-10 justify-start text-left font-bold text-xs px-3 border-[var(--color-border-default)] bg-[var(--color-bg-primary)] rounded-xl text-[var(--color-text-primary)] min-w-[210px]"
                        >
                            <CalendarIcon className="mr-2 size-3.5 text-[var(--color-accent)]" />
                            {searchParams.get("startDate") ? (
                                <span>
                                    {format(dateRange[0].startDate!, "dd MMM", { locale: es })} -{" "}
                                    {format(dateRange[0].endDate!, "dd MMM, yyyy", { locale: es })}
                                </span>
                            ) : (
                                <span className="text-[var(--color-text-tertiary)] font-medium">Filtrar por fecha</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 border-[var(--color-border-default)] shadow-2xl rounded-2xl overflow-hidden" align="end">
                        <DateRange
                            ranges={dateRange}
                            onChange={handleDateChange}
                            moveRangeOnFirstSelection={false}
                            months={1}
                            direction="vertical"
                            locale={es}
                            rangeColors={["#3098b3"]}
                            className="text-xs"
                            editableDateInputs={true}
                        />
                    </PopoverContent>
                </Popover>

                {hasFilters && (
                    <Button
                        variant="ghost"
                        onClick={handleClear}
                        className="h-10 px-3 text-xs font-bold text-[var(--color-error)] hover:bg-[var(--color-error-light)] rounded-xl"
                    >
                        <X className="size-3.5 mr-1" />
                        Limpiar
                    </Button>
                )}

                <div className="h-6 w-px bg-[var(--color-border-default)] mx-1 hidden sm:block" />

                <ExportButton />
            </div>
        </div>
    );
}