import { create } from 'zustand';

interface ShippingSettingState {
  shippingSetting: any;
  loading: boolean;
  error: string | null;
  setShippingSetting: (shippingSetting: any) => void;
  cleaShippingSetting: () => void;
}

const useShippingSettingStore = create<ShippingSettingState>(set => ({
  shippingSetting: null,
  loading: false,
  error: null,

  setShippingSetting: (shippingSetting: any) => set({ shippingSetting }),
  cleaShippingSetting: () => set({ shippingSetting: null }),
}));

export default useShippingSettingStore;
