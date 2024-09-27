import { TColorNames } from "@/store/colors.store"
import { ReactNode } from "react"

export type TStationType = 'hexagon' | 'circle' | 'rectangle' | 'triangle'

export type TStation = {
    type: TStationType
    x: number
    y: number
    fill?: TColorNames
    isSpecial?: boolean
    isAny?: boolean
}

export type TSvgLine = {
    x1: number
    y1: number
    x2: number
    y2: number
    isFill?: boolean
    shape?: TStationType
    strokeColor?: string
    strokeWidth?: number
    className?: string
}

export type TSvgCircle = {
    cx?: number
    cy?: number
    r?: number
    strokeColor?: string
    fill?: string
    isFill?: boolean
    shape?: TStationType
    isMain?: boolean
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
    shape?: TStationType
}

type TBlockPositionsY = 'top' | 'center' | 'bottom'
type TBlockPositionsX = 'left' | 'center' | 'right'

export type TBlock = {
    children: ReactNode
    size: TSvgRectangleSizes
    x: TBlockPositionsX
    y: TBlockPositionsY
}