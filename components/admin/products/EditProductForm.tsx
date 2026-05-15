"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";

// Actions y Componentes
import { EditProduct } from "@/actions/product/edit-product-action";
import ProductForm from "./ProductForm";
import { Button } from "@/components/ui/button";

// Tipos
import type { ProductWithCategoryResponse, CategoryListResponse } from "@/src/schemas";
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
            className="flex flex-col w-full"
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
            
            <div className="mt-8 pt-6 border-t border-[var(--color-border-default)] flex justify-end">
                <Button 
                    type="submit" 
                    variant="default"
                    className="w-full sm:w-auto min-w-[200px]"
                >
                    Actualizar Producto
                </Button>
            </div>
        </form>
    );
}