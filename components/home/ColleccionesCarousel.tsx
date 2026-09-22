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
            itemClass=""
            containerClass="w-full rounded-2xl overflow-hidden"
            partialVisible
            draggable
            swipeable
        >
            {collections.map((col, ) => (
                <Link
                    key={col._id}
                    href={`/colecciones/${col.slug}`}
                    className="group relative block aspect-[16/9] overflow-hidden"
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
                    

                    <div className="absolute inset-0 z-10 flex flex-col justify-between p-4 bg-gradient-to-b from-black/60 via-transparent to-transparent">
                        <div>
                            <p
                                className="text-sm font-bold text-white leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                                style={{ letterSpacing: "-0.01em" }}
                            >
                                {col.name}
                            </p>
                        </div>
                    </div>
                </Link>
            ))}
        </Carousel>
    );
}