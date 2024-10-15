import { create } from "zustand";

export const allCardNames = [
    'Branch',
    'Blue.Any',
    'Blue.Circle',
    'Blue.Rectangle',
    'Blue.Triangle',
    'Red.Any',
    'Red.Circle',
    'Red.Pentagon',
    'Red.Rectangle',
    'Red.Triangle',
]

interface IGameState {
    redCardsCounter: number;
    setRedCardsCounter: (count: number) => void

    roundsCounter: number
    setRoundsCounter: (count: number) => void

    isRoundOver: boolean
    setIsRoundOver: (isOver: boolean) => void

    isGameOver: boolean
    setIsGameOver: (isOver: boolean) => void

    isCreator: boolean
    setIsCreator: (isCreator: boolean) => void

    isCardsLoading: boolean
    setIsCardsLoading: (isLoading: boolean) => void

    userId: string
    setUserId: (id: string) => void

    availableCards: JSX.Element[]
    setAvailableCards: (cards: IGameState['availableCards']) => void

    selectedCards: JSX.Element[]
    setSelectedCards: (cards: IGameState['availableCards']) => void
}

export const useGameStore = create<IGameState>((set) => ({
    redCardsCounter: 0,
    setRedCardsCounter: (redCardsCounter: number) => set({ redCardsCounter }),

    roundsCounter: 0,
    setRoundsCounter: (roundsCounter: number) => set({ roundsCounter }),

    isRoundOver: false,
    setIsRoundOver: (isRoundOver: boolean) => set({ isRoundOver }),

    isGameOver: false,
    setIsGameOver: (isGameOver: boolean) => set({ isGameOver }),

    isCreator: false,
    setIsCreator: (isCreator: boolean) => set({ isCreator }),

    isCardsLoading: false,
    setIsCardsLoading: (isCardsLoading: boolean) => set({ isCardsLoading }),

    userId: '',
    setUserId: (userId: string) => set({ userId }),

    availableCards: [],
    setAvailableCards: (availableCards: IGameState['availableCards']) => set({ availableCards }),

    selectedCards: [],
    setSelectedCards: (selectedCards: IGameState['availableCards']) => set({ selectedCards }),
}));
