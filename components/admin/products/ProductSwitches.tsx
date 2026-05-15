"use client"

import Switch from "react-switch"
import { useState } from "react"
import type { ProductWithCategoryResponse } from "@/src/schemas"
import { LabelWithTooltip } from "@/components/utils/LabelWithTooltip"

export default function ProductSwitches({ product }: { product?: ProductWithCategoryResponse }) {
    const [isActive, setIsActive] = useState(product?.isActive ?? true)
    const [esDestacado, setEsDestacado] = useState(product?.esDestacado ?? false)
    const [esNuevo, setEsNuevo] = useState(product?.esNuevo ?? false)

    const switches = [
        {
            id: "isActive",
            label: "Producto Activo",
            tooltip: "Si está desactivado, el producto no aparecerá en la tienda para los clientes.",
            state: isActive,
            setter: setIsActive,
        },
        {
            id: "esDestacado",
            label: "Producto Destacado",
            tooltip: "Aparecerá en las secciones de productos destacados de la página de inicio.",
            state: esDestacado,
            setter: setEsDestacado,
        },
        {
            id: "esNuevo",
            label: "Marcar como Nuevo",
            tooltip: "Mostrará una etiqueta de 'Nuevo' sobre la imagen del producto.",
            state: esNuevo,
            setter: setEsNuevo,
        }
    ]

    return (
        <div className="space-y-5 p-2">
            {switches.map(({ id, label, tooltip, state, setter }) => (
                <div key={id} className="flex items-center justify-between gap-4">
                    <LabelWithTooltip 
                        htmlFor={id} 
                        label={label} 
                        tooltip={tooltip}
                    />
                    <div className="flex items-center">
                        <Switch
                            id={id}
                            onChange={setter}
                            checked={state}
                            onColor="#1A1A1A" // Corresponde a var(--color-bg-inverse)
                            offColor="#DEDEDE" // Corresponde a var(--color-surface-active)
                            handleDiameter={16}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            boxShadow="0px 1px 2px rgba(0, 0, 0, 0.2)"
                            activeBoxShadow="0px 0px 1px 5px rgba(0, 0, 0, 0.05)"
                            height={20}
                            width={38}
                        />
                    </div>
                    <input type="hidden" name={id} value={state ? "true" : "false"} />
                </div>
            ))}
        </div>
    )
}