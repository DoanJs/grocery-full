// store/useProductStore.js
import { create } from 'zustand';
import { ProductModel } from '../../models/ProductModel';

interface ProductState {
  products: ProductModel[];
  loading: boolean;
  error: string | null;
  setProducts: (products: ProductModel[]) => void;
  addProduct: (product: ProductModel) => void;
  removeProduct: (id: string) => void;
  clearProducts: () => void;
}

const useProductStore = create<ProductState>((set) => ({
  products: [],
  loading: false,
  error: null,

  setProducts: (products: ProductModel[]) => set({ products }),
  addProduct: (product: ProductModel) =>
    set((state: any) => ({ products: [...state.products, product] })),
  removeProduct: (id: string) =>
    set((state: any) => ({
      products: state.products.filter((item: ProductModel) => item.id !== id),
    })),
  clearProducts: () => set({ products: [] }),
}));

export default useProductStore;
