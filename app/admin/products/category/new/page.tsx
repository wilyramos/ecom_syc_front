// File: app/admin/products/category/new/page.tsx

import { getRootCategories } from "@/src/services/categorys";
import CreateCategoryForm from "@/components/admin/category/CreateCategoryForm";
import AdminPageWrapper from "@/components/admin/AdminPageWrapper";

export default async function NewCategoryPage() {
    const rootCategories = await getRootCategories();

    return (
        <AdminPageWrapper
            title="Nueva Categoría"
            showBackButton
        >
            <CreateCategoryForm categories={rootCategories} />
        </AdminPageWrapper>
    );
}