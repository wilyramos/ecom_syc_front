import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
    color?: "black" | "white";
    size?: "sm" | "md" | "lg" | "xl" | "fill";
    className?: string;
};

const sizeConfig = {
    sm: { width: 100, height: 28 },
    md: { width: 130, height: 36 },
    lg: { width: 160, height: 44 },
    xl: { width: 190, height: 52 },
};

export default function Logo({
    color = "black",
    size = "md",
    className,
}: LogoProps) {
    const logoSrc =
        color === "black"
            ? "/logonegro.svg"
            : "/logoblanco.svg";

    if (size === "fill") {
        return (
            <div
                className={cn(
                    "relative w-full h-full min-h-[40px] overflow-hidden",
                    className
                )}
            >
                <Image
                    src={logoSrc}
                    alt="Logo"
                    fill
                    priority
                    quality={90}
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-contain object-center"
                />
            </div>
        );
    }

    const { width, height } = sizeConfig[size];

    return (
        <div
            className={cn(
                "flex items-center justify-center overflow-hidden",
                className
            )}
        >
            <Image
                src={logoSrc}
                alt="Logo"
                width={width}
                height={height}
                quality={90}
                priority
                className="
                    block
                    h-full
                    w-auto
                    max-h-full
                    max-w-full
                    object-contain
                "
            />
        </div>
    );
}