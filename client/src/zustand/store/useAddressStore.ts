import { create } from 'zustand';
import { AddressModel } from '../../models/AddressModel';

interface AddressState {
    addresses: AddressModel[];
    loading: boolean;
    error: string | null;
    setAddresses: (addresses: AddressModel[]) => void;
    addAddress: (address: AddressModel) => void;
    editAddress: (id: string, address: AddressModel) => void
    removeAddress: (id: string) => void;
    clearAddresses: () => void;
}

const useAddressStore = create<AddressState>((set) => ({
    addresses: [],
    loading: false,
    error: null,

    setAddresses: (addresses: AddressModel[]) => set({ addresses }),
    addAddress: (address: AddressModel) =>
        set((state: any) => ({ addresses: [...state.addresses, address] })),
    editAddress: (id: string, address: AddressModel) =>
        set((state: any) => {
            const index = state.addresses.findIndex((item: any) => item.id === id)
            state.addresses[index] = address
            return ({ addresses: [...state.addresses] })
        }),
    removeAddress: (id: string) =>
        set((state: any) => ({
            addresses: state.addresses.filter((item: AddressModel) => item.id !== id),
        })),
    clearAddresses: () => set({ addresses: [] }),
}));

export default useAddressStore;
