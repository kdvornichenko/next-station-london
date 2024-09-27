import { TStation } from '@/types/map.types'
import { create } from 'zustand'
import {  TColorValues } from './colors.store'

interface IStations {
    stationFirst: TStation | null
    setStationFirst: (station: TStation | null) => void

    stationSecond: TStation | null
    setStationSecond: (station: TStation | null) => void

    currentColor: TColorValues | null
    setCurrentColor: (color: TColorValues | null) => void
}

export const useSetStations = create<IStations>((set) => ({
    stationFirst: null,
    setStationFirst: (stationFirst) => set({ stationFirst }),

    stationSecond: null,
    setStationSecond: (stationSecond) => set({ stationSecond }),

    currentColor: null,
    setCurrentColor: (currentColor) => set({ currentColor }),
}))