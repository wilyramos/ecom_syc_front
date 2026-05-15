"use client";

import { ReactNode } from "react";

export default function NavBarClient({ children }: { children: ReactNode }) {
    return (
        <div
            className="fixed left-0 w-full z-50 text-[var(--color-text-secondary)] bg-[var(--color-bg-primary)]"
        >
            {children}
        </div>
    );
}