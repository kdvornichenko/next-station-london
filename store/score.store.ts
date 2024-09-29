import { create } from "zustand"

type TScore = {
    blocks: number
    stations: number
    rivers: number
    score: number
}

interface IScores {
    scores: TScore[]
    setScore: (index: number, newScore: TScore) => void
    totalRoundsScore: number
}

export const useScoreStore = create<IScores>((set) => ({
    scores: Array(4).fill({ blocks: 0, stations: 0, rivers: 0, score: 0 }),
    totalRoundsScore: 0,
    setScore: (index, newScore) => set((state) => {
        const updatedScores = state.scores.map((score, i) =>
            i === index ? newScore : score
        )
        const totalRoundsScore = updatedScores.reduce((acc, score) => acc + score.score, 0)
        return { scores: updatedScores, totalRoundsScore }
    }),
}))
