// File: frontend/components/home/ProductosDestacados.tsx

import { getDestacadosProducts } from '@/src/services/products';
import ProductCard from './product/ProductCard'; // <-- Importamos tu nuevo ProductCard interactivo
import HeaderConTituloConControles from '../ui/HeaderConTituloConControles';

export default async function ProductosDestacados() {
    const destacados = await getDestacadosProducts();
    const productos = destacados?.products ?? [];

    if (!productos.length) return null;

    return (
        <section className="w-full max-w-screen-2xl mx-auto px-4 md:px-6 py-8 md:py-12">
            {/* Encabezado Estandarizado (Minimalista) */}
            <HeaderConTituloConControles
                title="Seleccionados"
                viewAllHref="/productos"
            />

            {/* Grid de Productos Ajustado */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                {productos.slice(0, 8).map((product) => (
                    <div
                        key={product._id}
                        // Animación suave al hacer hover sobre todo el contenedor de la tarjeta
                        className="transition-transform duration-500 ease-out hover:-translate-y-1.5 h-full"
                    >
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </section>
    );
}