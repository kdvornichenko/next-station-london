import { create } from "zustand"

type TScore = {
    round: number
    blocks: number
    stations: number
    rivers: number
}

interface IScores {
    score: TScore[] | null
    setScore: (newScore: TScore | null) => void
}

export const useSetScore = create<IScores>((set) => ({
    score: null,
    setScore: (newScore) => set((state) => ({
        score: newScore ? (state.score ? [...state.score, newScore] : [newScore]) : null
    })),
}))
