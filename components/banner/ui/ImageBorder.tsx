import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
    src: string;
    alt: string;
    fill?: boolean;
    width?: number;
    height?: number;
    className?: string;
    objectFit?: "contain" | "cover" | "fill";
    borderStyle?: string;
    sizes?: string;
    priority?: boolean;
}

// Constantes de tamaño para mantener la proporción minimalista

const borderClasses: Record<string, string> = {
    none: "",

    "curved-frame": `
        relative
        before:content-[''] before:absolute before:inset-0
        before:border-[0.5px] before:border-[var(--color-accent)]
        before:rounded-xl before:translate-x-1 before:translate-y-1 before:-z-10
        after:content-[''] after:absolute after:inset-0
        after:border-[0.5px] after:border-[var(--color-border-strong)]
        after:rounded-xl after:-translate-x-1 after:-translate-y-1 after:-z-10
    `,

    simple: `
        relative
        before:content-[''] before:absolute before:bottom-[-4px] before:left-[-4px] before:w-full before:h-full
        before:border-[0.5px] before:border-[var(--color-accent)] before:-z-10
        after:content-[''] after:absolute after:top-[-4px] after:right-[-4px] after:w-full after:h-full
        after:border-[0.5px] after:border-[var(--color-border-subtle)] after:-z-10
    `,

    double: `
        relative
        before:content-[''] before:absolute before:inset-[-2px]
        before:border-[0.5px] before:border-[var(--color-accent)] before:-z-10
        after:content-[''] after:absolute after:inset-[-6px]
        after:border-[0.5px] after:border-[var(--color-border-subtle)] after:-z-10
    `,

    "rounded-top": `
        relative
        before:content-[''] before:absolute before:inset-0
        before:border-t-[1px] before:border-l-[1px] before:border-[var(--color-accent)]
        before:rounded-tl-2xl before:-z-10
        after:content-[''] after:absolute after:inset-2
        after:border-t-[0.5px] after:border-l-[0.5px] after:border-[var(--color-border-strong)]
        after:rounded-tl-xl after:-z-10
    `,

    "rounded-all": `
        relative
        before:content-[''] before:absolute before:inset-[-4px]
        before:border-[0.5px] before:border-[var(--color-accent)]
        before:rounded-full before:-z-10
        after:content-[''] after:absolute after:inset-[-8px]
        after:border-[0.5px] after:border-[var(--color-border-subtle)]
        after:rounded-full after:-z-10
    `,

    dashed: `
        relative
        before:content-[''] before:absolute before:bottom-[-2px] before:inset-x-0
        before:border-b before:border-dashed before:border-[var(--color-accent)]
        before:-z-10
        after:content-[''] after:absolute after:bottom-[-6px] after:inset-x-4
        after:border-b before:border-dashed after:border-[var(--color-border-strong)]
        after:-z-10
    `,

    dotted: `
        relative
        before:content-[''] before:absolute before:inset-[-3px]
        before:border-[1px] before:border-dotted before:border-[var(--color-accent)]
        before:-z-10
        after:content-[''] after:absolute after:bottom-[-6px] after:right-[-6px] after:w-1/2 after:h-1/2
        after:border-r after:border-b after:border-dotted after:border-[var(--color-border-strong)]
        after:-z-10
    `,

    "double-corner": `
        relative
        before:content-[''] before:absolute before:top-[-4px] before:left-[-4px] before:w-8 before:h-8
        before:border-t-[1px] before:border-l-[1px] before:border-[var(--color-accent)] before:-z-10
        after:content-[''] after:absolute after:bottom-[-4px] after:right-[-4px] after:w-8 after:h-8
        after:border-b-[1px] after:border-r-[1px] after:border-[var(--color-border-strong)] after:-z-10
    `,
};

export default function ImageBorder({
    src,
    alt,
    fill = false,
    width,
    height,
    className = "",
    objectFit = "cover",
    borderStyle = "none",
    sizes,
    priority = false,
}: Props) {
    const borderClass = borderClasses[borderStyle] ?? "";

    return (
        <div className={cn(
            "relative z-0 transition-transform duration-500 ease-in-out group",
            borderClass,
            fill ? "w-full h-full" : "inline-block"
        )}>
            {/* Contenedor de la imagen para asegurar que el recorte no afecte a los bordes externos */}
            <div className="relative overflow-hidden w-full h-full rounded-sm">
                <Image
                    src={src}
                    alt={alt}
                    fill={fill}
                    width={!fill ? width : undefined}
                    height={!fill ? height : undefined}
                    className={cn(
                        "relative z-10 transition-transform duration-700 group-hover:scale-105",
                        fill ? `object-${objectFit} object-center` : "",
                        className
                    )}
                    sizes={sizes}
                    priority={priority}
                />
            </div>
        </div>
    );
}