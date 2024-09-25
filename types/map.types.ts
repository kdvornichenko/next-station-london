import { ReactNode } from "react"


export type TSvgLine = {
    x1: number
    y1: number
    x2: number
    y2: number
    isFill?: boolean
}

export type TSvgCircle = {
    cx?: number
    cy?: number
    r?: number
    strokeColor?: string
    fill?: string
    isFill?: boolean
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
}

type TBlockPositionsY = 'top' | 'center' | 'bottom'
type TBlockPositionsX = 'left' | 'center' | 'right'

export type TBlock = {
    children: ReactNode
    size: TSvgRectangleSizes
    x: TBlockPositionsX
    y: TBlockPositionsY
}