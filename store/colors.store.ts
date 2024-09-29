import { create } from 'zustand'

export const colors = {
    pink: '#ED127B',
    blue: '#00ADEF',
    green: '#40B93C',
    purple: '#602F93',
    default: '#24265D',
    white: '#fff',
    yellow: '#FFF200',
} as const;

// Типы ключей colors (строковые названия цветов)
export type TColorNames = keyof typeof colors;

// Типы значений colors (хэш-коды)
export type TColorValues = (typeof colors)[TColorNames];

interface IColor {
    currentColor: TColorValues | null
    setCurrentColor: (color: TColorValues | null) => void
}

export const useColorStore = create<IColor>((set) => ({
    currentColor: null,
    setCurrentColor: (currentColor) => set({ currentColor }),
}))



