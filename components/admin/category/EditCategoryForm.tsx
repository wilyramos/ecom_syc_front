"use client"
import type { CategoryResponse } from "@/src/schemas/category.schema"
import CategoryForm from "./CategoryForm"
import { editCategoryAction, type ActionStateType } from "@/actions/category/category-action";
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation";


export default function EditCategoryForm({ category, categories }: { category: CategoryResponse, categories: CategoryResponse[] }) {

    const router = useRouter();


    const [state, dispatch] = useActionState(
        async (prevState: ActionStateType, formData: FormData) => {
            return editCategoryAction(category._id, prevState, formData);
        },
        {
            errors: [],
            success: "",
        }
    );

    useEffect(() => {
        state.errors.forEach((e) => toast.error(e));
        if (state.success) {
            toast.success(state.success);
            router.push("/admin/products/category");
        }
    }, [state, router]);

    useEffect(() => {
        if (state.errors) {
            state.errors.forEach(error => {
                toast.error(error)
            })
        }
        if (state.success) {
            toast.success(state.success)

        }

    }, [state])


    return (
        <form
            className="flex flex-col gap-4 w-full max-w-7xl mx-auto mt-10"
            noValidate
            action={dispatch}
        >
            <CategoryForm
                category={category}
                categories={categories}
            />

            <input
                type="submit"
                value="Actualizar Categoria"
                className="bg-blue-500 text-white font-bold py-3 rounded-full w-full hover:bg-blue-600 transition duration-200 ease-in-out cursor-pointer mt-4"
            />
        </form>
    )
}
