"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";

// Actions y Componentes
import { EditProduct } from "@/actions/product/edit-product-action";
import ProductForm from "./ProductForm";
import { Button } from "@/components/ui/button";

// Tipos
import type { ProductWithCategoryResponse } from "@/src/schemas";
import type { CategoryListResponse } from "@/src/schemas/category.schema";
import type { TBrand } from "@/src/schemas/brands";
import type { ProductLine } from "@/src/schemas/line.schema"; 

interface EditProductFormProps {
    product: ProductWithCategoryResponse;
    categorias: CategoryListResponse;
    brands: TBrand[];
    lines: ProductLine[];
}

export default function EditProductForm({ product, categorias, brands, lines }: EditProductFormProps) {

    // Bind para pasar el ID al Server Action de forma segura
    const editProductWithId = EditProduct.bind(null, product._id);

    const [state, dispatch] = useActionState(editProductWithId, {
        errors: [],
        success: ""
    });

    useEffect(() => {
        if (state.errors) {
            state.errors.forEach(error => toast.error(error));
        }
        if (state.success) {
            toast.success(state.success);
        }
    }, [state]);

    const categoriasOrdenadas = [...categorias].sort((a, b) =>
        a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' })
    );

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(e.currentTarget);
        const variantsError = formData.get("variants_error");

        if (variantsError === "true") {
            e.preventDefault();
            toast.error("Por favor, corrige los errores en las variantes antes de actualizar.");
            return;
        }
    };

    return (
        <form
            className="flex flex-col w-full pb-24"
            noValidate
            action={dispatch}
            onSubmit={handleSubmit}
        >
            <ProductForm
                key={product._id} 
                product={product} 
                categorias={categoriasOrdenadas}
                brands={brands}
                lines={lines}
            />
            
            {/* Contenedor flotante fijo en la parte inferior de la pantalla */}
            <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-end p-4 border-t bg-background/80 backdrop-blur-md shadow-lg md:left-64">
                <div className="w-full max-w-5xl mx-auto flex justify-end">
                    <Button type="submit" className="w-full sm:w-auto px-6 font-semibold shadow-sm">
                        {state.success ? "Actualizado" : "Actualizar producto"}
                    </Button>
                </div>
            </div>
        </form>
    );
}