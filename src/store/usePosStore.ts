/* File: src/store/usePosStore.ts */
import { create } from 'zustand';
import { Product, ProductVariant } from "@/src/schemas/product.schema";
import { toast } from "sonner";

export interface CartItem {
    productId: string;
    variantId?: string;
    nombre: string;
    precio: number;
    costo: number;
    quantity: number;
    discount: number;
    atributos?: Record<string, string>;
    subtotal: number;
    maxStock: number; // Límite de stock físico disponible
}

interface PosState {
    cart: CartItem[];
    subtotal: number;
    totalDiscountAmount: number;
    totalSurchargeAmount: number;
    total: number;
    itemsCount: number;
    paymentMethod: string;

    addToCart: (product: Product, variant?: ProductVariant) => void;
    removeFromCart: (productId: string, variantId?: string) => void;
    updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
    clearCart: () => void;

    setPaymentMethod: (method: string) => void;
    setGlobalDiscount: (amount: number) => void;
    setSurcharge: (amount: number) => void;
    calculateTotals: () => void;
}

export const usePosStore = create<PosState>((set, get) => ({
    cart: [],
    subtotal: 0,
    totalDiscountAmount: 0,
    totalSurchargeAmount: 0,
    total: 0,
    itemsCount: 0,
    paymentMethod: 'CASH',

    addToCart: (product, variant) => {
        const { cart } = get();
        const vId = variant?._id?.toString();

        // Determinar stock disponible real
        const availableStock = variant ? (variant.stock ?? 0) : (product.stock ?? 0);

        if (availableStock <= 0) {
            toast.error(`"${product.nombre}" no cuenta con existencias disponibles.`);
            return;
        }

        const existingItem = cart.find(
            (item) => item.productId === product._id && item.variantId === vId
        );

        let newCart: CartItem[];

        if (existingItem) {
            if (existingItem.quantity + 1 > availableStock) {
                toast.error(`Stock máximo alcanzado (${availableStock} uds.) para "${existingItem.nombre}"`);
                return;
            }

            newCart = cart.map((item) =>
                item.productId === product._id && item.variantId === vId
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                        subtotal: (item.quantity + 1) * item.precio,
                    }
                    : item
            );
        } else {
            const newItem: CartItem = {
                productId: product._id as string,
                variantId: vId,
                nombre: variant ? `${product.nombre} (${variant.nombre || 'Var'})` : product.nombre,
                precio: variant?.precio ?? product.precio ?? 0,
                costo: variant?.costo ?? product.costo ?? 0,
                quantity: 1,
                discount: 0,
                atributos: variant?.atributos,
                subtotal: variant?.precio ?? product.precio ?? 0,
                maxStock: availableStock,
            };
            newCart = [...cart, newItem];
        }

        set({ cart: newCart });
        get().calculateTotals();
    },

    removeFromCart: (productId, variantId) => {
        set((state) => ({
            cart: state.cart.filter(
                (item) => !(item.productId === productId && item.variantId === variantId)
            ),
        }));
        get().calculateTotals();
    },

    updateQuantity: (productId, requestedQuantity, variantId) => {
        if (requestedQuantity < 1) return;

        const { cart } = get();
        const targetItem = cart.find(
            (item) => item.productId === productId && item.variantId === variantId
        );

        if (!targetItem) return;

        if (requestedQuantity > targetItem.maxStock) {
            toast.error(`Solo hay ${targetItem.maxStock} unidades disponibles en inventario.`);
            return;
        }

        set({
            cart: cart.map((item) =>
                item.productId === productId && item.variantId === variantId
                    ? { ...item, quantity: requestedQuantity, subtotal: requestedQuantity * item.precio }
                    : item
            ),
        });
        get().calculateTotals();
    },

    clearCart: () =>
        set({
            cart: [],
            subtotal: 0,
            total: 0,
            itemsCount: 0,
            totalDiscountAmount: 0,
            totalSurchargeAmount: 0,
            paymentMethod: 'CASH',
        }),

    setPaymentMethod: (method) => set({ paymentMethod: method }),

    setGlobalDiscount: (amount) => {
        set({ totalDiscountAmount: amount });
        get().calculateTotals();
    },

    setSurcharge: (amount) => {
        set({ totalSurchargeAmount: amount });
        get().calculateTotals();
    },

    calculateTotals: () => {
        const { cart, totalDiscountAmount, totalSurchargeAmount } = get();
        const subtotal = cart.reduce((acc, item) => acc + item.subtotal, 0);
        const itemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
        const totalFinal = subtotal - totalDiscountAmount + totalSurchargeAmount;

        set({
            subtotal,
            total: Math.max(0, totalFinal),
            itemsCount,
        });
    },
}));