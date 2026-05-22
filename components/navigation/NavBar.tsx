import Link from "next/link";
import Logo from "../ui/Logo";
import ButtonShowCart from "../ui/ButtonShowCart";
import ButtonSearchFormStore from "../ui/ButtonSearchFormStore";
import ServerCategorias from "./ServerCategorias";
import NavBarClient from "./NavBarClient";
import ServerSheetMobile from "./ServerSheetMobile";
import ButtonSearchMobile from "./ButtonSearchMobile";
import { HiOutlineUser } from "react-icons/hi";

export default function NavBar() {
    return (
        <NavBarClient>
            <header className="sticky top-0 z-50 h-20 flex flex-col justify-center text-[var(--color-text-secondary)] transition-colors duration-300">
                {/* Añadimos 'relative' al contenedor padre para que el posicionamiento absoluto del logo móvil funcione correctamente */}
                <div className="max-w-7xl w-full mx-auto grid grid-cols-3 items-center px-4 relative">

                    {/* Left column */}
                    <div className="flex justify-start items-center gap-6">
                        <div className="md:hidden flex items-center gap-1">
                            <ServerSheetMobile />
                            <ButtonSearchMobile />
                        </div>
                        
                        <Link href="/" className="relative hidden h-20 w-[140px] md:flex items-center">
                            <Logo color="black" size="fill" />
                        </Link>

                        {/* Botón "Nosotros" para escritorio */}
                        <Link 
                            href="/nosotros" 
                            className="hidden md:block text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors duration-200"
                        >
                            Nosotros
                        </Link>
                    </div>

                    {/* Center column */}
                    <div className="flex items-center justify-center">
                        {/* LOGO MÓVIL: Absoluto, centrado matemáticamente a la mitad de la pantalla */}
                        <div className="md:hidden absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
                            <Link href="/" className="relative h-19 w-[140px] flex items-center justify-center">
                                <Logo color="black" size="fill" />
                            </Link>
                        </div>
                        
                        {/* Buscador de escritorio se mantiene intacto */}
                        <div className="hidden md:flex flex-1 w-full max-w-xl">
                            <ButtonSearchFormStore />
                        </div>
                    </div>

                    {/* Right column */}
                    <div className="flex items-center justify-end gap-2">
                        <div className="hidden md:flex items-center gap-1">
                            <Link
                                href="/auth/registro"
                                className="flex items-center gap-1 text-[var(--color-text-primary)] rounded-full transition-colors duration-200 hover:text-[var(--color-accent)]"
                                aria-label="Cuenta"
                            >
                                <div className="hover:bg-[var(--color-surface-hover)] rounded-full p-2 transition-colors duration-200">
                                    <HiOutlineUser className="h-5 w-5" />
                                </div>
                            </Link>

                            <ButtonShowCart />
                        </div>

                        <div className="md:hidden flex items-center gap-2">
                            <ButtonShowCart />
                        </div>
                    </div>

                </div>
            </header>

            <div className="hidden md:block sticky z-40 w-full border-b-2 border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] transition-colors duration-300">
                <div className="max-w-7xl mx-auto flex items-center px-4">
                    <ServerCategorias />
                </div>
            </div>

        </NavBarClient>
    );
}