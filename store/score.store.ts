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

    crossingPoints: number[] // Массив для хранения 3 значений crossingPoints
    setCrossingPoint: (index: number, point: number) => void // Функция для установки значения crossingPoint
    totalCrossingScore: number // Итоговый результат всех crossingPoints

    tasksPoints: number[] // Значения для каждого чекбокса (0 или 10)
    setTaskPoint: (index: number, isChecked: boolean) => void // Функция для обновления состояния чекбоксов
    totalTasksScore: number // Итоговый результат для всех задач (сумма отмеченных чекбоксов)

    finalScore: number // Итоговый счет, который является суммой всех компонентов
}

export const useScoreStore = create<IScores>((set) => ({
    scores: Array(4).fill({ blocks: 0, stations: 0, rivers: 0, score: 0 }),
    totalRoundsScore: 0,
    setScore: (index, newScore) => set((state) => {
        const updatedScores = state.scores.map((score, i) =>
            i === index ? newScore : score
        )
        const totalRoundsScore = updatedScores.reduce((acc, score) => acc + score.score, 0)
        const finalScore = totalRoundsScore + state.specialScore + state.totalCrossingScore + state.totalTasksScore
        return { scores: updatedScores, totalRoundsScore, finalScore }
    }),

    points: [0, 1, 2, 4, 6, 8, 11, 14, 17, 21, 25],

    specialPoints: [],
    specialScore: 0,
    isSpecialPointsError: false,

    setSpecialPoint: (specialPoint) => set((state) => {
        const pointIndex = state.points.indexOf(specialPoint)
        const isPointAlreadySelected = state.specialPoints.includes(specialPoint)

        const canSelectPoint = state.points
            .slice(0, pointIndex)
            .every(point => state.specialPoints.includes(point))

        let newSpecialScore = state.specialScore;

        if (isPointAlreadySelected) {
            const updatedSpecialPoints = state.specialPoints.filter(point => state.points.indexOf(point) < pointIndex)
            newSpecialScore = specialPoint;
            const finalScore = state.totalRoundsScore + newSpecialScore + state.totalCrossingScore + state.totalTasksScore;
            return {
                specialPoints: updatedSpecialPoints,
                specialScore: newSpecialScore,
                isSpecialPointsError: false,
                finalScore
            }
        } else if (canSelectPoint) {
            if (pointIndex !== -1 && pointIndex < state.points.length - 1) {
                const nextPoint = state.points[pointIndex + 1]
                newSpecialScore = nextPoint;
                const finalScore = state.totalRoundsScore + newSpecialScore + state.totalCrossingScore + state.totalTasksScore;
                return {
                    specialPoints: [...state.specialPoints, specialPoint],
                    specialScore: newSpecialScore,
                    isSpecialPointsError: false,
                    finalScore
                }
            } else {
                newSpecialScore = specialPoint;
                const finalScore = state.totalRoundsScore + newSpecialScore + state.totalCrossingScore + state.totalTasksScore;
                return {
                    specialPoints: [...state.specialPoints, specialPoint],
                    specialScore: newSpecialScore,
                    isSpecialPointsError: false,
                    finalScore
                }
            }
        }

        return { isSpecialPointsError: true }
    }),

    setIsSpecialPointsError: (hasError: boolean) => set({ isSpecialPointsError: hasError }),

    crossingPoints: [0, 0, 0],
    totalCrossingScore: 0,

    setCrossingPoint: (index, point) => set((state) => {
        const updatedCrossingPoints = [...state.crossingPoints]
        updatedCrossingPoints[index] = point

        const totalCrossingScore = updatedCrossingPoints.reduce((acc, curr) => acc + curr, 0)
        const finalScore = state.totalRoundsScore + state.specialScore + totalCrossingScore + state.totalTasksScore;

        return { crossingPoints: updatedCrossingPoints, totalCrossingScore, finalScore }
    }),

    tasksPoints: [0, 0],
    totalTasksScore: 0,

    setTaskPoint: (index, isChecked) => set((state) => {
        const updatedTasksPoints = [...state.tasksPoints]
        updatedTasksPoints[index] = isChecked ? 10 : 0

        const totalTasksScore = updatedTasksPoints.reduce((acc, point) => acc + point, 0)
        const finalScore = state.totalRoundsScore + state.specialScore + state.totalCrossingScore + totalTasksScore;

        return {
            tasksPoints: updatedTasksPoints,
            totalTasksScore,
            finalScore
        }
    }),

    finalScore: 0
}))
