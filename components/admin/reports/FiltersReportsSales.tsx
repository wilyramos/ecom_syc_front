"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { DateRangePicker, Range, RangeKeyDict } from "react-date-range";
import { es } from "date-fns/locale";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function DateRangeDropdown() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const start = searchParams.get("startDate");
    const end = searchParams.get("endDate");

    const [range, setRange] = useState<Range[]>([
        {
            startDate: start ? new Date(start + "T00:00:00") : new Date(),
            endDate: end ? new Date(end + "T00:00:00") : new Date(),
            key: "selection",
        },
    ]);

    const [isMobile, setIsMobile] = useState(false);
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkScreen = () => setIsMobile(window.innerWidth < 768);
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleRangeChange = (ranges: RangeKeyDict) => {
        const { startDate, endDate } = ranges.selection;
        if (!startDate || !endDate) return;

        setRange([{ startDate, endDate, key: "selection" }]);

        const params = new URLSearchParams(searchParams.toString());
        params.set("startDate", format(startDate, "yyyy-MM-dd"));
        params.set("endDate", format(endDate, "yyyy-MM-dd"));
        
        router.push(`${pathname}?${params.toString()}`);
    };

    const startDateLabel = range[0].startDate ? format(range[0].startDate, "dd MMM yyyy", { locale: es }) : "";
    const endDateLabel = range[0].endDate ? format(range[0].endDate, "dd MMM yyyy", { locale: es }) : "";

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <div className="flex items-center gap-2">
                <span className="hidden md:inline text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Rango:
                </span>
                <button
                    onClick={() => setOpen(!open)}
                    className={cn(
                        "flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-xl border transition-all shadow-sm",
                        open 
                            ? "bg-blue-50 border-blue-200 text-blue-700 ring-2 ring-blue-100" 
                            : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 active:scale-95"
                    )}
                >
                    <CalendarIcon size={14} className={open ? "text-blue-600" : "text-gray-400"} />
                    <span className="truncate">
                        {startDateLabel} - {endDateLabel}
                    </span>
                    <ChevronDown size={14} className={cn("transition-transform duration-200", open && "rotate-180")} />
                </button>
            </div>

            {open && (
                <div
                    className={cn(
                        "absolute z-50 mt-2 bg-white shadow-2xl rounded-2xl border border-gray-100 overflow-hidden",
                        isMobile 
                            ? "fixed inset-x-4 top-24 mx-auto w-[92vw]" 
                            : "right-0 w-auto"
                    )}
                >
                    <div className="max-h-[80vh] overflow-y-auto overflow-x-hidden md:overflow-visible">
                        <DateRangePicker
                            ranges={range}
                            onChange={handleRangeChange}
                            moveRangeOnFirstSelection={false}
                            months={isMobile ? 1 : 2}
                            direction={isMobile ? "vertical" : "horizontal"}
                            locale={es}
                            staticRanges={[]} 
                            inputRanges={[]}
                            rangeColors={["#3b82f6"]}
                        />
                    </div>
                    
                    {/* Botón de cerrar para móviles */}
                    <div className="md:hidden p-3 border-t bg-gray-50 flex justify-end">
                        <button 
                            onClick={() => setOpen(false)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold"
                        >
                            Aplicar Filtro
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}