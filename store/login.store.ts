import { create } from 'zustand'

interface ILoginStore {
    isLoading: boolean
    setIsLoading: (isLoading: boolean) => void
}

export const useLoginStore = create<ILoginStore>((set) => ({
    isLoading: false,
    setIsLoading: (isLoading) => set({ isLoading }),
}))