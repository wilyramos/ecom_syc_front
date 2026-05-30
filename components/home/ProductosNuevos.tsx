import { getNewProducts } from '@/src/services/products';
import ClientCarouselProductosNuevos from './ClientCarouselProductosNuevos';

export default async function ProductosNuevos() {
    const newProducts = await getNewProducts();

    if (!newProducts || newProducts.products.length === 0) {
        return null; // No renderizar nada si no hay productos nuevos
    }

    return (
        <section className="mx-auto ">
                <ClientCarouselProductosNuevos products={newProducts.products} />
        </section>
    );
}