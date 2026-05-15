"use client"

import { forgotPassword } from '@/actions/forgot-password-action'
import { useActionState, useEffect, useRef } from 'react'
import { toast } from "sonner"

export default function ForgotPasswordForm() {
    const emailRef = useRef<HTMLInputElement>(null)

    const [state, dispatch] = useActionState(forgotPassword, {
        errors: [],
        success: ""
    })

    useEffect(() => {
        if (state.errors && state.errors.length > 0) {
            state.errors.forEach(error => toast.error(error))
        }
    }, [state])

    // Mostrar mensaje de éxito si `state.success` existe
    if (state.success && emailRef.current?.value) {
        return (
            <div className="mt-6 space-y-4 text-center text-gray-700">
                <h2 className="text-2xl font-bold text-gray-800">¡Correo enviado!</h2>
                <p>
                    Te hemos enviado un enlace para restablecer tu contraseña a{" "}
                    <span className="font-semibold">{emailRef.current.value}</span>. <br />
                    Revisa tu bandeja de entrada o la carpeta de spam.
                </p>
            </div>
        )
    }

    return (
        <form
            className="mt-6 space-y-4 text-gray-700"
            noValidate
            action={dispatch}
        >
            <div className="flex flex-col gap-1">
                <label htmlFor="email" className="font-bold">
                    Correo electrónico
                </label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="correo@ejemplo.com"
                    className="w-full border border-gray-300 p-3 rounded-2xl"
                    required
                    ref={emailRef}
                />
            </div>

            <button
                type="submit"
                className="w-full bg-black hover:bg-gray-700 text-white font-semibold py-2 rounded-full transition-colors cursor-pointer mt-2"
            >
                Recuperar Contraseña
            </button>
        </form>
    )
}
