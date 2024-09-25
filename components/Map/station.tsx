import { FC } from 'react'
import { TColorNames } from '@/store/colors.store'
import { SVGCircle, SVGLine, SVGRectangle } from './Shape'

type TStation = {
	type: 'hexagon' | 'circle' | 'rectangle' | 'triangle'
	x: number
	y: number
	fill?: TColorNames
	isSpecial?: boolean
}

interface ShapeProps {
	isFill: boolean
}

const Hexagon: FC<ShapeProps> = ({ isFill }) => {
	return (
		<>
			<SVGLine x1={27.5} y1={132} x2={19} y2={138} isFill={isFill} />
			<SVGLine x1={19} y1={138} x2={22} y2={148} isFill={isFill} />
			<SVGLine x1={22} y1={148} x2={33} y2={148} isFill={isFill} />
			<SVGLine x1={33} y1={148} x2={36} y2={138} isFill={isFill} />
			<SVGLine x1={36} y1={138} x2={27.5} y2={132} isFill={isFill} />
		</>
	)
}

const Triangle: FC<ShapeProps> = ({ isFill }) => {
	return (
		<>
			<SVGLine x1={27.5} y1={132} x2={18.5} y2={146} isFill={isFill} />
			<SVGLine x1={18.5} y1={146} x2={35.5} y2={146} isFill={isFill} />
			<SVGLine x1={35.5} y1={146} x2={27.5} y2={132} isFill={isFill} />
		</>
	)
}

const Circle: FC<ShapeProps> = ({ isFill }) => (
	<SVGCircle cx={27.5} cy={140.5} r={9} isFill={isFill} />
)

const Rectangle: FC<ShapeProps> = ({ isFill }) => (
	<SVGRectangle
		x={20}
		y={133}
		width={15}
		height={15}
		isFill={isFill}
		type='station'
	/>
)

const stations: Record<TStation['type'], FC<any>> = {
	hexagon: Hexagon,
	circle: Circle,
	rectangle: Rectangle,
	triangle: Triangle,
}

const Station: FC<TStation> = ({ x, y, type, fill, isSpecial }) => {
	const Component = stations[type]

	return (
		<g transform={`translate(${x}, ${y})`}>
			{isSpecial && (
				<>
					<polygon fill={'#000'} points='23, 125 32,125 27.5,119' />
					<polygon fill={'#000'} points='23, 156 32,156 27.5,162' />
					<polygon fill={'#000'} points='23, 156 32,156 27.5,140.5' />
				</>
			)}
			<SVGCircle cx={27.5} cy={140.5} r={16} fill={fill} />
			<Component isFill={Boolean(fill)} />
		</g>
	)
}

export default Station
