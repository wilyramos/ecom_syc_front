import type { Metadata } from 'next'
import LoginForm from '@/components/auth/LoginForm'

export const metadata: Metadata = {
    title: 'S&C Mobile - Iniciar Sesión',
    description: 'Inicia sesión en tu cuenta de S&C Mobile para acceder a tus pedidos, favoritos y más.',
    keywords: 'iniciar sesión, S&C Mobile , cuenta',
}

export default function PageLogin() {
    return (
        <div className="w-full max-w-xs mx-auto">
            <h1 className="text-2xl text-center">Iniciar sesión</h1>
            <LoginForm />
        </div>
    )
}
