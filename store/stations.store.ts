import { TStation } from '@/types/map.types'
import { create } from 'zustand'

interface IStations {
    stationFirst: TStation | null
    setStationFirst: (station: TStation | null) => void

    stationSecond: TStation | null
    setStationSecond: (station: TStation | null) => void


    isActive: boolean
    setIsActive: (isActive: boolean) => void
}

export const useStationsStore = create<IStations>((set) => ({
    stationFirst: null,
    setStationFirst: (stationFirst) => set({ stationFirst }),

    stationSecond: null,
    setStationSecond: (stationSecond) => set({ stationSecond }),

    isActive: false,
    setIsActive: (isActive) => set({ isActive })
}))