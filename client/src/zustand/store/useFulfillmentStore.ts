import { create } from 'zustand';
import { FulfillmentModel } from '../../models/FulfillmentModel';

interface FulfillmentState {
    fulfillment: FulfillmentModel | null;
    loading: boolean;
    error: string | null;
    setFulfillment: (fulfillment: FulfillmentModel) => void;
    clearFulfillment: () => void;
}

const useFulfillmentStore = create<FulfillmentState>((set) => ({
    fulfillment: null,
    loading: false,
    error: null,

    setFulfillment: (fulfillment: FulfillmentModel) => set({ fulfillment }),
    clearFulfillment: () => set({ fulfillment: null }),
}));

export default useFulfillmentStore;
