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

    specialPoints: number[]
    setSpecialPoint: (specialPoint: number) => void

    specialScore: number
    isSpecialPointsError: boolean
    setIsSpecialPointsError: (hasError: boolean) => void

    points: number[]
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

    points: [0, 1, 2, 4, 6, 8, 11, 14, 17, 21, 25],

    specialPoints: [],
    specialScore: 0,
    isSpecialPointsError: false,

    setSpecialPoint: (specialPoint) => set((state) => {
        const pointIndex = state.points.indexOf(specialPoint)
        const isPointAlreadySelected = state.specialPoints.includes(specialPoint)

        // Проверка: можно выделить поинт только если все предыдущие поинты выделены
        const canSelectPoint = state.points
            .slice(0, pointIndex) // Берем все предыдущие поинты
            .every(point => state.specialPoints.includes(point)) // Проверяем, выделены ли они

        if (isPointAlreadySelected) {
            // Снимаем выделение текущего поинта и всех поинтов после него
            const updatedSpecialPoints = state.specialPoints.filter(point => state.points.indexOf(point) < pointIndex)
            return {
                specialPoints: updatedSpecialPoints,
                specialScore: specialPoint, // Записываем текущее значение в specialScore при снятии выделения
                isSpecialPointsError: false // Сбрасываем ошибку при успешном действии
            }
        } else if (canSelectPoint) {
            // Если предыдущие поинты выделены, разрешаем выделение текущего
            if (pointIndex !== -1 && pointIndex < state.points.length - 1) {
                const nextPoint = state.points[pointIndex + 1]
                return {
                    specialPoints: [...state.specialPoints, specialPoint],
                    specialScore: nextPoint, // Записываем следующее значение в specialScore при выделении поинта
                    isSpecialPointsError: false // Сбрасываем ошибку при успешном действии
                }
            } else {
                // Если это последний поинт
                return {
                    specialPoints: [...state.specialPoints, specialPoint],
                    specialScore: specialPoint,
                    isSpecialPointsError: false // Сбрасываем ошибку при успешном действии
                }
            }
        }

        // Если предыдущие поинты не выделены, не изменяем состояние и устанавливаем ошибку
        return { isSpecialPointsError: true }
    }),

    setIsSpecialPointsError: (hasError: boolean) => set({ isSpecialPointsError: hasError })
}))
