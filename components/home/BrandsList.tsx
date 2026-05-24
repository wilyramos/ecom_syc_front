import { getActiveBrands } from "@/src/services/brands";
import BrandsCarousel from "./BrandsCarousel";

export default async function BrandsList() {

    const brands = await getActiveBrands();
    if (brands.length === 0) return null;

    return (
        <section className="mx-auto max-w-screen-2xl">
            <BrandsCarousel brands={brands} />
        </section>
    )
}