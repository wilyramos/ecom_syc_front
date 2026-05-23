import { getActiveCollections } from "@/src/services/collection-service";
import HeaderConTituloConControles from "../ui/HeaderConTituloConControles";
import ColleccionesCarousel from "./ColleccionesCarousel";

export default async function ColleccionesSection() {
    const collections = await getActiveCollections();
    if (!collections || collections.length === 0) return null;

    return (
        <section className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-10">
            <HeaderConTituloConControles
                title="Colecciones"
                viewAllHref="/colecciones"
            />
            <div className="mt-6">
                <ColleccionesCarousel collections={collections} />
            </div>
        </section>
    );
}