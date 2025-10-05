import { create } from 'zustand';
import { CartModel } from '../../models/CartModel';

interface CartState {
    carts: CartModel[];
    loading: boolean;
    error: string | null;
    setCarts: (carts: CartModel[]) => void;
    addCart: (cart: CartModel) => void;
    editCart: (id: string, cart: CartModel) => void
    removeCart: (id: string) => void;
    clearCarts: () => void;
}

const useCartStore = create<CartState>((set) => ({
    carts: [],
    loading: false,
    error: null,

    setCarts: (carts: CartModel[]) => set({ carts }),
    addCart: (cart: CartModel) =>
        set((state: any) => ({ carts: [...state.carts, cart] })),
    editCart: (id: string, cart: CartModel) =>
        set((state: any) => {
            const index = state.carts.findIndex((item: any) => item.id === id)
            state.carts[index] = cart
            return ({ carts: [...state.carts] })
        }),
    removeCart: (id: string) =>
        set((state: any) => ({
            carts: state.carts.filter((item: CartModel) => item.id !== id),
        })),
    clearCarts: () => set({ carts: [] }),
}));

export default useCartStore;
