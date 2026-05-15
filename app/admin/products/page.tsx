import { Suspense } from "react";
import SpinnerLoading from "@/components/ui/SpinnerLoading";
import AddProductButton from "@/components/admin/products/AddProductButton";
import ProductsResultsAdmin from "@/components/admin/products/ProductsResult";
import AdminPageWrapper from "@/components/admin/AdminPageWrapper";

type SearchParams = Promise<{
    page?: string;
    limit?: string;
    query?: string;
}>;

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: SearchParams;
}) {
    const params = await searchParams;
    const currentPage = Number(params.page) || 1;
    const itemsPerPage = Number(params.limit) || 10;

    return (
        <AdminPageWrapper
            title="Productos"
            showBackButton={false}
            actions={
                <AddProductButton />
            }
        >
            <Suspense fallback={<SpinnerLoading />}>
                <ProductsResultsAdmin
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    params={params}
                />
            </Suspense>
        </AdminPageWrapper>
    );
}