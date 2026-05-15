"use client";

import { useRouter } from "next/navigation";
import { FiPlus } from "react-icons/fi";
import { Button } from "@/components/ui/button";

export default function AddProductButton() {
    const router = useRouter();

    return (
        <Button
            onClick={() => router.push("/admin/products/new")}
            variant="default"
        >
            <FiPlus />
            <span>Nuevo</span>
        </Button>
    );
}