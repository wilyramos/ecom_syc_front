// File: frontend/components/admin/products/MediaLibraryDialog.tsx

"use client"
import { useState, useCallback, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import {
    Dialog, DialogContent, DialogHeader, DialogTitle,
    DialogFooter, DialogTrigger, DialogClose
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"
import { CheckCircle2, UploadCloud, ImageIcon, Loader2 } from "lucide-react"
import { uploadImage } from "@/actions/product/upload-image-action"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface MediaLibraryProps {
    selectedImages: string[];
    globalImagesPool: string[];
    onConfirmSelection: (images: string[]) => void;
    onUploadSuccess: (newImages: string[]) => void;
    allowMultiple?: boolean;
    triggerLabel?: string;
    triggerVariant?: "default" | "outline" | "ghost" | "secondary" | "destructive";
    size?: "sm" | "md" | "lg";
}

export default function MediaLibraryDialog({
    selectedImages,
    globalImagesPool,
    onConfirmSelection,
    onUploadSuccess,
    allowMultiple = true,
    triggerLabel = "Gestionar Multimedia",
    triggerVariant = "default",
}: MediaLibraryProps) {
    const [tempSelection, setTempSelection] = useState<string[]>(selectedImages);
    const [isUploading, setIsUploading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setTempSelection(selectedImages);
    }, [selectedImages, isOpen]);

    const onDrop = useCallback(async (files: File[]) => {
        setIsUploading(true);
        const formData = new FormData();

        const totalImages = tempSelection.length + files.length;
        if (totalImages > 15) {
            toast.error(`Límite excedido: Máximo 15 imágenes totales.`);
            setIsUploading(false);
            return;
        }

        files.forEach(f => formData.append("images", f));

        try {
            const result = await uploadImage(formData);
            onUploadSuccess(result.images);
            setTempSelection(prev => allowMultiple ? [...prev, ...result.images] : [result.images[0]]);
            toast.success(`${result.images.length} imagen(es) subida(s)`);
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Error al subir imágenes.");
        } finally {
            setIsUploading(false);
        }
    }, [onUploadSuccess, allowMultiple, tempSelection.length]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        disabled: isUploading,
        multiple: true
    });

    const toggleSelection = (url: string) => {
        setTempSelection(prev => {
            if (prev.includes(url)) return prev.filter(i => i !== url);
            return allowMultiple ? [...prev, url] : [url];
        });
    };

    const handleConfirm = () => {
        onConfirmSelection(tempSelection);
        setIsOpen(false);
    };


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant={triggerVariant}  className="gap-2" type="button">
                    <ImageIcon />
                    <span>{triggerLabel}</span>
                </Button>
            </DialogTrigger>
            
            <DialogContent className="max-w-4xl h-[85vh] flex flex-col p-0 border-[var(--color-border-default)] bg-[var(--color-bg-primary)]">
                <DialogHeader className="p-6 pb-4 border-b border-[var(--color-border-subtle)]">
                    <DialogTitle className="text-lg font-bold text-[var(--color-text-primary)]">Biblioteca de Medios</DialogTitle>
                    <p className="text-sm text-[var(--color-text-tertiary)]">
                        {allowMultiple ? "Gestiona la galería del producto." : "Selecciona una imagen principal."}
                    </p>
                </DialogHeader>

                <div className="flex-1 flex flex-col overflow-hidden p-6 gap-6 bg-[var(--color-bg-secondary)]">
                    {/* Zona de Carga */}
                    <div
                        {...getRootProps()}
                        className={cn(
                            "border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer bg-[var(--color-bg-primary)]",
                            isDragActive ? "border-[var(--color-text-primary)] bg-[var(--color-accent-light)]" : "border-[var(--color-border-strong)] hover:border-[var(--color-text-primary)]",
                            isUploading && "opacity-50 pointer-events-none"
                        )}
                    >
                        <input {...getInputProps()} />
                        {isUploading ? (
                            <div className="flex flex-col items-center gap-2">
                                <Loader2 className="w-10 h-10 text-[var(--color-text-primary)] animate-spin" />
                                <p className="text-sm font-medium text-[var(--color-text-primary)]">Subiendo archivos...</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-2">
                                <UploadCloud className="w-10 h-10 text-[var(--color-text-tertiary)]" />
                                <p className="text-sm font-medium text-[var(--color-text-primary)]">Arrastra o haz clic para subir</p>
                                <p className="text-xs text-[var(--color-text-tertiary)] uppercase tracking-wider">JPG, PNG, WEBP, AVIF</p>
                            </div>
                        )}
                    </div>

                    {/* Galería */}
                    <ScrollArea className="flex-1 border border-[var(--color-border-default)] rounded-lg bg-[var(--color-bg-primary)] p-4">
                        {globalImagesPool.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-40 text-[var(--color-text-tertiary)]">
                                <ImageIcon className="w-12 h-12 mb-2 opacity-20" />
                                <p className="text-sm">No hay imágenes en la biblioteca.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                                {globalImagesPool.map(url => {
                                    const isSelected = tempSelection.includes(url);
                                    return (
                                        <div
                                            key={url}
                                            onClick={() => toggleSelection(url)}
                                            className={cn(
                                                "group relative aspect-square cursor-pointer rounded-lg overflow-hidden border-2 transition-all",
                                                isSelected ? "border-[var(--color-text-primary)] ring-2 ring-[var(--color-accent-light)]" : "border-transparent hover:border-[var(--color-border-strong)]"
                                            )}
                                        >
                                            <Image src={url} alt="Media" fill className="object-cover" unoptimized />
                                            {isSelected && (
                                                <div className="absolute top-1.5 right-1.5 bg-[var(--color-text-primary)] text-white rounded-full p-0.5 shadow-md">
                                                    <CheckCircle2 size={16} />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-[var(--color-bg-inverse)] opacity-0 group-hover:opacity-10 transition-opacity" />
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </ScrollArea>
                </div>

                <DialogFooter className="p-6 bg-[var(--color-bg-primary)] border-t border-[var(--color-border-default)]">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-[var(--color-text-primary)] uppercase tracking-tight">
                                {tempSelection.length} seleccionada{tempSelection.length !== 1 ? "s" : ""}
                            </span>
                            <span className="text-[10px] text-[var(--color-text-tertiary)]">Máximo 15 archivos</span>
                        </div>
                        <div className="flex gap-2">
                            <DialogClose asChild>
                                <Button variant="ghost" size="sm" type="button">Cancelar</Button>
                            </DialogClose>
                            <Button
                                variant="default"
                                size="sm"
                                onClick={handleConfirm}
                                disabled={tempSelection.length === 0}
                                type="button"
                            >
                                Aplicar Selección
                            </Button>
                        </div>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}