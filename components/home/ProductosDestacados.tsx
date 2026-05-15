import { getDestacadosProducts } from '@/src/services/products';
import ProductCardHome from './product/ProductCardHome';
import HeaderConTituloConControles from '../ui/HeaderConTituloConControles';

export default async function ProductosDestacados() {
    const destacados = await getDestacadosProducts();
    const productos = destacados?.products ?? [];

    if (!productos.length) return null;

    return (
        <section className="">
            <div className="max-w-7xl mx-auto px-4 lg:px-0">

                {/* Encabezado Estandarizado Apple Style */}
                <HeaderConTituloConControles
                    title={
                        <>
                            Selecionados <span className="font-light text-[var(--color-text-tertiary)] tracking-tight">del momento.</span>
                        </>
                    }
                />

                {/* Grid de Productos Minimalista */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
                    {productos.slice(0, 8).map((product) => (
                        <div
                            key={product._id}
                            className="transition-all duration-500 hover:translate-y-[-4px]"
                        >
                            <ProductCardHome product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}