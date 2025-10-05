import { create } from 'zustand';
import { OrderModel } from '../../models/OrderModel';

interface OrderState {
    orders: OrderModel[];
    loading: boolean;
    error: string | null;
    setOrders: (orders: OrderModel[]) => void;
    addOrder: (order: OrderModel) => void;
    editOrder: (id: string, order: OrderModel) => void
    removeOrder: (id: string) => void;
    clearOrders: () => void;
}

const useOrderStore = create<OrderState>((set) => ({
    orders: [],
    loading: false,
    error: null,

    setOrders: (orders: OrderModel[]) => set({ orders }),
    addOrder: (order: OrderModel) =>
        set((state: any) => ({ orders: [...state.orders, order] })),
    editOrder: (id: string, order: OrderModel) =>
        set((state: any) => {
            const index = state.orders.findIndex((item: any) => item.id === id)
            state.orders[index] = order
            return ({ orders: [...state.orders] })
        }),
    removeOrder: (id: string) =>
        set((state: any) => ({
            orders: state.orders.filter((item: OrderModel) => item.id !== id),
        })),
    clearOrders: () => set({ orders: [] }),
}));

export default useOrderStore;
