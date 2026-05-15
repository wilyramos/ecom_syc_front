"use client";

import { useState } from "react";
import type { KeyboardEvent, ClipboardEvent, ChangeEvent } from "react";
import { X, ListPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { LabelWithTooltip } from "@/components/utils/LabelWithTooltip";

type SpecItem = { key: string; value: string };

type Props = {
    initial?: SpecItem[];
};

export default function SpecificationsSection({ initial = [] }: Props) {
    const [items, setItems] = useState<SpecItem[]>(
        initial.length ? initial : [{ key: "", value: "" }]
    );

    const jsonString = JSON.stringify(items.filter((item) => item.key.trim() !== ""));

    const updateItem = (idx: number, field: "key" | "value", value: string) => {
        const newItems = [...items];
        newItems[idx] = { ...newItems[idx], [field]: value };
        setItems(newItems);
    };

    const addRow = (atIndex?: number) => {
        const newItems = [...items];
        const newRow = { key: "", value: "" };
        if (atIndex !== undefined) newItems.splice(atIndex + 1, 0, newRow);
        else newItems.push(newRow);
        setItems(newItems);
    };

    const removeRow = (idx: number) => {
        if (items.length === 1) {
            setItems([{ key: "", value: "" }]);
            return;
        }
        setItems(items.filter((_, i) => i !== idx));
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text");
        const lines = pasteData.split("\n").filter((line) => line.trim() !== "");

        const newItems: SpecItem[] = lines
            .map((line) => {
                let key = "";
                let value = "";

                if (line.includes("|")) {
                    const parts = line.split("|").map((p) => p.trim()).filter(Boolean);
                    if (parts.length >= 2) {
                        key = parts[0];
                        value = parts[1];
                    }
                } else if (line.includes("\t")) {
                    const parts = line.split("\t");
                    if (parts.length >= 2) {
                        key = parts[0].trim();
                        value = parts[1].trim();
                    }
                } else if (line.includes(":")) {
                    const [k, ...v] = line.split(":");
                    key = k.trim();
                    value = v.join(":").trim();
                }

                if (key.toLowerCase() === "característica" && value.toLowerCase() === "especificación")
                    return null;

                return { key, value };
            })
            .filter((item): item is SpecItem => item !== null && item.key.trim() !== "");

        if (newItems.length > 0) {
            const filteredCurrent = items.filter(i => i.key.trim() !== "" || i.value.trim() !== "");
            setItems([...filteredCurrent, ...newItems]);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addRow(index);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>, idx: number, field: "key" | "value") => {
        const value = e.target.value;
        if (field === "key" && value.includes(":")) {
            const [k, ...v] = value.split(":");
            const key = k.trim();
            const val = v.join(":").trim();
            const newItems = [...items];
            newItems[idx] = { key, value: val };
            setItems(newItems);
        } else {
            updateItem(idx, field, value);
        }
    };

    return (
        <div className="space-y-4 p-6 border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] rounded-lg">
            <div className="flex items-center gap-2 mb-2">
                <ListPlus className="w-4 h-4 text-[var(--color-text-secondary)]" />
                <LabelWithTooltip
                    label="Especificaciones Técnicas"
                    tooltip="Agrega detalles técnicos como material, peso, dimensiones, etc. Puedes pegar datos desde Excel o usar ':' para separar clave de valor."
                    htmlFor="EspecificacionesSection"
                />
            </div>

            <div className="space-y-2">
                {items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 group">
                        <Input
                            type="text"
                            placeholder="Ej: Material"
                            className="w-1/2 h-9 text-xs font-bold text-[var(--color-text-secondary)] bg-[var(--color-bg-secondary)]/50 border-[var(--color-border-default)] focus:border-[var(--color-bg-inverse)]"
                            value={item.key}
                            onChange={(e) => handleChange(e, i, "key")}
                            onPaste={handlePaste}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                        />
                        <Input
                            type="text"
                            placeholder="Ej: Aluminio"
                            className="w-1/2 h-9 text-xs border-[var(--color-border-default)] focus:border-[var(--color-bg-inverse)]"
                            value={item.value}
                            onChange={(e) => handleChange(e, i, "value")}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                        />
                        <button
                            type="button"
                            onClick={() => removeRow(i)}
                            className="p-1.5 text-[var(--color-text-tertiary)] hover:text-[var(--color-error)] hover:bg-[var(--color-error-light)] rounded-md transition-colors opacity-0 group-hover:opacity-100"
                            title="Eliminar fila"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>

            <button
                type="button"
                onClick={() => addRow()}
                className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-primary)] hover:text-[var(--color-text-secondary)] transition-colors flex items-center gap-1 mt-2"
            >
                <PlusIcon className="w-3 h-3" />
                Añadir característica
            </button>

            <input type="hidden" name="especificaciones" value={jsonString} />
        </div>
    );
}

function PlusIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
    );
}