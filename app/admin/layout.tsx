import { verifySession } from "@/src/auth/dal";
import AdminSidebar from "@/components/admin/AdminSidebar";
import MobileSidebar from "@/components/admin/MobileSidebar";
import ToastNotification from "@/components/ui/ToastNotification";
import { redirect } from "next/navigation";
import Logo from "@/components/ui/Logo";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user } = await verifySession();

    if (user.rol !== "administrador") {
        redirect("/profile");
    }

    return (
        <>
            {/* Mobile Top Bar */}
            <div
                className="
                    md:hidden fixed top-0 inset-x-0 z-40
                    h-14 bg-[var(--color-bg-inverse)]
                    border-b border-[var(--sl-border)]
                "
            >
                <div className="flex h-full items-center justify-between gap-3 px-4">
                    <MobileSidebar user={user} />

                    <div className="flex flex-1 items-center justify-center overflow-hidden">
                        <Logo
                            size="sm"
                            color="white"
                            className="h-8 max-w-[120px]"
                        />
                    </div>

                    {/* spacer */}
                    <div className="w-9 shrink-0" />
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-[256px_1fr]">
                <div className="sticky top-0 h-screen">
                    <AdminSidebar user={user} />
                </div>

                {/* El layout principal maneja el scroll y el fondo general */}
                <main className="overflow-y-auto min-h-screen bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)]">
                    {children}
                </main>
            </div>

            {/* Mobile Content Grid */}
            <div className="md:hidden mt-14 min-h-[calc(100vh-3.5rem)] bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)]">
                {children}
            </div>

            <ToastNotification />
        </>
    );
}