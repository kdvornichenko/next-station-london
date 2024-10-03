import React, { FC } from 'react'
import { SVGCircle, SVGLine, SVGRectangle } from './Geometries'
import { TStationType } from '@/types/map.types'

interface ShapeProps {
	isFill: boolean
	shape?: TStationType
}

const Hexagon: FC<ShapeProps> = ({ isFill, shape }) => {
	return (
		<>
			<SVGLine
				x1={27.5}
				y1={132}
				x2={19}
				y2={138}
				isFill={isFill}
				shape={shape}
			/>
			<SVGLine
				x1={19}
				y1={138}
				x2={22}
				y2={148}
				isFill={isFill}
				shape={shape}
			/>
			<SVGLine
				x1={22}
				y1={148}
				x2={33}
				y2={148}
				isFill={isFill}
				shape={shape}
			/>
			<SVGLine
				x1={33}
				y1={148}
				x2={36}
				y2={138}
				isFill={isFill}
				shape={shape}
			/>
			<SVGLine
				x1={36}
				y1={138}
				x2={27.5}
				y2={132}
				isFill={isFill}
				shape={shape}
			/>
		</>
	)
}

const Triangle: FC<ShapeProps> = ({ isFill, shape }) => {
	return (
		<>
			<SVGLine
				x1={27.5}
				y1={132}
				x2={18.5}
				y2={146}
				isFill={isFill}
				shape={shape}
			/>
			<SVGLine
				x1={18.5}
				y1={146}
				x2={35.5}
				y2={146}
				isFill={isFill}
				shape={shape}
			/>
			<SVGLine
				x1={35.5}
				y1={146}
				x2={27.5}
				y2={132}
				isFill={isFill}
				shape={shape}
			/>
		</>
	)
}

const Circle: FC<ShapeProps> = ({ isFill, shape }) => (
	<SVGCircle cx={27.5} cy={140.5} r={9} isFill={isFill} shape={shape} />
)

const Rectangle: FC<ShapeProps> = ({ isFill, shape }) => (
	<SVGRectangle
		x={20}
		y={133}
		width={15}
		height={15}
		isFill={isFill}
		type='station'
		shape={shape}
	/>
)

export default { Hexagon, Triangle, Rectangle, Circle }
