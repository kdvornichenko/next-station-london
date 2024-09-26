import { ReactNode } from "react"

export type TStations = 'hexagon' | 'circle' | 'rectangle' | 'triangle'

export type TSvgLine = {
    x1: number
    y1: number
    x2: number
    y2: number
    isFill?: boolean
    shape?: TStations
}

export type TSvgCircle = {
    cx?: number
    cy?: number
    r?: number
    strokeColor?: string
    fill?: string
    isFill?: boolean
    shape?: TStations
}

type TSvgRectangleSizes = 'sm' | 'lg'

export type TSvgRectangle = {
    x: number
    y: number
    width: number
    height: number
    type: 'station' | 'block'
    size?: TSvgRectangleSizes
    isFill?: boolean
    shape?: TStations
}

type TBlockPositionsY = 'top' | 'center' | 'bottom'
type TBlockPositionsX = 'left' | 'center' | 'right'

export type TBlock = {
    children: ReactNode
    size: TSvgRectangleSizes
    x: TBlockPositionsX
    y: TBlockPositionsY
}