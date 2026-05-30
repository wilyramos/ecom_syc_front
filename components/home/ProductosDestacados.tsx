import { getDestacadosProducts } from '@/src/services/products';
import ProductCardHome from './product/ProductCardHome';
import HeaderConTituloConControles from '../ui/HeaderConTituloConControles';

export default async function ProductosDestacados() {
    const destacados = await getDestacadosProducts();
    const productos = destacados?.products ?? [];

    if (!productos.length) return null;

    return (
        <section className="w-full max-w-screen-2xl mx-auto px-4 md:px-12 mt-6">
            {/* Encabezado Estandarizado */}
            <HeaderConTituloConControles
                viewAllHref="/productos"
                title="Seleccionados"
            />

            {/* Grid de Productos Estandarizado */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
                {productos.slice(0, 8).map((product) => (
                    <div
                        key={product._id}
                        className="transition-all duration-500 hover:translate-y-[-4px]"
                    >
                        <ProductCardHome product={product} />
                    </div>
                ))}
            </div>
        </section>
    );
}