import { getProduct } from "@/src/services/products";
import { getCategories } from "@/src/services/categorys";
import { getActiveBrands } from "@/src/services/brands";
import { linesService } from "@/src/services/lines.service";

import EditProductForm from "@/components/admin/products/EditProductForm";
import DeleteProductButton from "@/components/admin/products/DeleteProductButton";
import AdminPageWrapper from "@/components/admin/AdminPageWrapper";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { IoDuplicate } from "react-icons/io5";
import { cn } from "@/lib/utils";

type Params = Promise<{
    id: string;
}>;

export default async function ProductDetailsPage({ params }: { params: Params }) {
    const { id } = await params;

    const [product, categorias, brands, lines] = await Promise.all([
        getProduct(id),
        getCategories(),
        getActiveBrands(),
        linesService.getAllActive(),
    ]);

    if (!product) {
        return (
            <AdminPageWrapper
                title="Producto no encontrado"
                showBackButton={true}
            >
                <div className="flex flex-col items-center justify-center py-12 px-4 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] gap-4">
                    <h1 className="text-sm font-medium text-[var(--color-text-secondary)]">
                        El producto solicitado no existe o no se encuentra disponible.
                    </h1>
                    <Link
                        href="/admin/products"
                        className={cn(buttonVariants({ variant: "secondary", size: "default" }))}
                    >
                        Volver a productos
                    </Link>
                </div>
            </AdminPageWrapper>
        );
    }

    return (
        <AdminPageWrapper
            title={`Editar: ${product.nombre}`}
            breadcrumbItems={[
                { label: "Productos", href: "/admin/products" }
            ]}
            breadcrumbCurrent={product.nombre}
            showBackButton={true}
            actions={
                <div className="flex items-center gap-2">
                    <Link
                        href={`/admin/products/new?duplicate=${product._id}`}
                        className={cn(buttonVariants({ variant: "outline", size: "default" }))}
                    >
                        <IoDuplicate className="w-4 h-4" />
                        <span>Duplicar</span>
                    </Link>
                    <DeleteProductButton productId={product._id} />
                </div>
            }
        >
            <div className="w-full ">
                <EditProductForm
                    product={product}
                    categorias={categorias}
                    brands={brands}
                    lines={lines}
                />
            </div>
        </AdminPageWrapper>
    );
}