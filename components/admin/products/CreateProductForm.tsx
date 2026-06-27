"use client"

import { useActionState, useEffect } from 'react'
import ProductForm from './ProductForm'
import { useRouter } from 'next/navigation'
import { createProduct } from '@/actions/product/add-product-action'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import type { ProductWithCategoryResponse } from '@/src/schemas'
import type { CategoryListResponse } from "@/src/schemas/category.schema";

import type { TBrand } from '@/src/schemas/brands'
import type { ProductLine } from '@/src/schemas/line.schema'

interface CreateProductFormProps {
    categorias: CategoryListResponse;
    brands: TBrand[];
    lines: ProductLine[];
    initialData?: ProductWithCategoryResponse
}

export default function CreateProductForm({ categorias, brands, lines, initialData }: CreateProductFormProps) {

    const router = useRouter();

    const [state, dispatch] = useActionState(createProduct, {
        errors: [],
        success: ""
    });

    useEffect(() => {
        if (state.success) {
            toast.success(state.success)
            router.push("/admin/products")
        }
        if (state.errors) {
            state.errors.forEach((error) => {
                toast.error(error)
            })
        }
    }, [state, router])

    const categoriasOrdenadas = [...categorias].sort((a, b) =>
        a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' })
    );

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(e.currentTarget);
        const variantsError = formData.get("variants_error");

        if (variantsError === "true") {
            e.preventDefault();
            toast.error("Por favor, corrige los errores en las variantes antes de crear.");
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
                product={initialData}
                categorias={categoriasOrdenadas}
                brands={brands}
                lines={lines}
            />
            
            {/* Contenedor flotante fijo en la parte inferior de la pantalla */}
            <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-end p-4 border-t bg-background/80 backdrop-blur-md shadow-lg md:left-64">
                <div className="w-full max-w-5xl mx-auto flex justify-end">
                    <Button type="submit" className="w-full sm:w-auto px-6 font-semibold shadow-sm ">
                        {state.success ? "Creado" : "Crear producto"}
                    </Button>
                </div>
            </div>
        </form>
    )
}