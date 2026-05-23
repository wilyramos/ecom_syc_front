"use client";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import Link from "next/link";
import { type Collection } from "@/src/schemas/collection.schema";

export default function ColleccionesCarousel({ collections }: { collections: Collection[] }) {
    const responsive = {
        desktop: { breakpoint: { max: 3000, min: 1280 }, items: 3 },
        laptop: { breakpoint: { max: 1280, min: 1024 }, items: 3 },
        tablet: { breakpoint: { max: 1024, min: 640 }, items: 2 },
        mobile: { breakpoint: { max: 640, min: 0 }, items: 1.5, partialVisibilityGutter: 30 }
    };

    return (
        <Carousel
            responsive={responsive}
            infinite
            autoPlay
            autoPlaySpeed={5000}
            arrows={false}
            itemClass="px-2"
            containerClass="w-full"
            partialVisible
            draggable
            swipeable
        >
            {collections.map((col, i) => (
                <Link
                    key={col._id}
                    href={`/colecciones/${col.slug}`}
                    className="group relative block aspect-[4/3] overflow-hidden rounded-lg border transition-shadow duration-200 hover:shadow-md"
                    style={{
                        backgroundColor: col.color ?? "var(--color-bg-secondary)",
                        borderColor: "var(--color-border-subtle)",
                    }}
                >
                    {col.image && (
                        <Image
                            src={col.image}
                            alt={col.name}
                            fill
                            unoptimized
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                    
                    <div className="absolute inset-0 z-10 flex flex-col justify-between p-4">
                        <span className="text-[9px] font-black tabular-nums text-white/40">
                            {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                            <p className="text-sm font-bold text-white leading-tight" style={{ letterSpacing: "-0.01em" }}>
                                {col.name}
                            </p>
                            <span className="text-[11px] font-bold text-white/0 group-hover:text-white/80 transition-colors duration-200 block mt-0.5">
                                Explorar →
                            </span>
                        </div>
                    </div>
                </Link>
            ))}
        </Carousel>
    );
}