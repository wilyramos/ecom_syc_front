// File: frontend/src/components/admin/banner/CreateSliderBannerForm.tsx
"use client";

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createSliderBannerAction } from '@/actions/slider-actions';
import SliderForm from './SliderForm';
import { Button } from '@/components/ui/button';

export default function CreateSliderBannerForm() {
    const router = useRouter();

    const [state, dispatch, isPending] = useActionState(createSliderBannerAction, {
        success: false,
        message: ""
    });

   useEffect(() => {
    if (state.success) {
        toast.success(state.message || "Banner guardado");
        router.push("/admin/slider");
    }

    if (!state.success && state.message) {
        // Toast principal
        toast.error(state.message);

        // Mostrar errores específicos en toasts (opcional, puede ser invasivo)
        if (state.errors && state.errors.length > 0) {
            state.errors.forEach((err) => {
                // Evitamos repetir el mensaje genérico
                if (err !== state.message) toast.error(err);
            });
        }
    }
}, [state, router]);

    return (
        <form action={dispatch} className="flex flex-col gap-4 w-full " noValidate>
            <SliderForm
                fields={state.success ? undefined : state.fields}
                fieldErrors={state.success ? undefined : state.fieldErrors}
            />
            <div className="flex justify-end py-4 bg-gray-50 border-t sticky bottom-0 z-10">
                <Button
                    type="submit"
                    disabled={isPending}
                        
                >
                    {isPending ? "Guardando..." : "Crear Banner"}
                </Button>
            </div>
        </form>
    );
}