import { create } from 'zustand';
import { HeartModel } from '../../models/HeartModel';

interface HeartState {
    hearts: HeartModel[];
    loading: boolean;
    error: string | null;
    setHearts: (hearts: HeartModel[]) => void;
    addHeart: (heart: HeartModel) => void;
    removeHeart: (id: string) => void;
    clearHearts: () => void;
}

const useHeartStore = create<HeartState>((set) => ({
    hearts: [],
    loading: false,
    error: null,

    setHearts: (hearts: HeartModel[]) => set({ hearts }),
    addHeart: (heart: HeartModel) =>
        set((state: any) => ({ hearts: [...state.hearts, heart] })),
    removeHeart: (id: string) =>
        set((state: any) => ({
            hearts: state.hearts.filter((item: HeartModel) => item.id !== id),
        })),
    clearHearts: () => set({ hearts: [] }),
}));

export default useHeartStore;
