import { create } from 'zustand';
import { CardModel } from '../../models/CardModel';

interface CardState {
    cards: CardModel[];
    loading: boolean;
    error: string | null;
    setCards: (cards: CardModel[]) => void;
    addCard: (card: CardModel) => void;
    editCard: (id: string, card: CardModel) => void
    removeCard: (id: string) => void;
    clearCards: () => void;
}

const useCardStore = create<CardState>((set) => ({
    cards: [],
    loading: false,
    error: null,

    setCards: (cards: CardModel[]) => set({ cards }),
    addCard: (card: CardModel) =>
        set((state: any) => ({ cards: [...state.cards, card] })),
    editCard: (id: string, card: CardModel) =>
        set((state: any) => {
            const index = state.cards.findIndex((item: any) => item.id === id)
            state.cards[index] = card
            return ({ cards: [...state.cards] })
        }),
    removeCard: (id: string) =>
        set((state: any) => ({
            cards: state.cards.filter((item: CardModel) => item.id !== id),
        })),
    clearCards: () => set({ cards: [] }),
}));

export default useCardStore;
