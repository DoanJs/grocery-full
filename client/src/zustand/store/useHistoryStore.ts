import { create } from 'zustand';
import { HistoryModel } from '../../models/HistoryModel';

interface HistoryState {
    histories: HistoryModel[];
    loading: boolean;
    error: string | null;
    setHistories: (histories: HistoryModel[]) => void;
    addHistory: (history: HistoryModel) => void;
    editHistory: (id: string, history: HistoryModel) => void
    removeHistory: (id: string) => void;
    clearHistories: () => void;
}

const useHistoryStore = create<HistoryState>((set) => ({
    histories: [],
    loading: false,
    error: null,

    setHistories: (histories: HistoryModel[]) => set({ histories }),
    addHistory: (history: HistoryModel) =>
        set((state: any) => ({ histories: [...state.histories, history] })),
    editHistory: (id: string, history: HistoryModel) =>
        set((state: any) => {
            const index = state.histories.findIndex((item: any) => item.id === id)
            state.histories[index] = history
            return ({ histories: [...state.histories] })
        }),
    removeHistory: (id: string) =>
        set((state: any) => ({
            histories: state.histories.filter((item: HistoryModel) => item.id !== id),
        })),
    clearHistories: () => set({ histories: [] }),
}));

export default useHistoryStore;
