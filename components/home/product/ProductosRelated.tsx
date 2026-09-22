import ProductCard from "./ProductCard";
import { getProductsRelated } from "@/src/services/products";
import HeaderConTituloConControles from "@/components/ui/HeaderConTituloConControles";

export default async function ProductosRelated({ slug }: { slug: string }) {
    const productsRelated = await getProductsRelated(slug);

    // console.log(productsRelate);
    if (!productsRelated || productsRelated.length === 0) {
        return null;
    }

    return (
        <section className=" flex flex-col  mx-auto ">
            <HeaderConTituloConControles
                title="Productos relacionados"
                viewAllHref={`/productos`}
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 text-start">
                {productsRelated.map((product) => (
                    <ProductCard key={product.slug} product={product} />
                ))}
            </div>
        </section>
    );
}
