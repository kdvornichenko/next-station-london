import { FC } from 'react'
import { TSvgCircle, TSvgLine, TSvgRectangle } from '@/types/map.types'
import { colorNames } from '@/store/colors.store'

export const SVGLine: FC<TSvgLine> = ({ x1, y1, x2, y2, isFill }) => {
	return (
		<line
			x1={x1}
			y1={y1}
			x2={x2}
			y2={y2}
			stroke={isFill ? '#fff' : '#24265D'}
			strokeWidth='2'
			strokeLinecap='round'
		/>
	)
}

export const SVGCircle: FC<TSvgCircle> = ({ cx, cy, r, fill, isFill }) => {
	const color = (fill && colorNames[fill as keyof typeof colorNames]) || fill

	return (
		<circle
			cx={cx}
			cy={cy}
			r={r}
			strokeWidth={2}
			stroke={isFill ? '#fff' : color ? color : '#24265D'}
			fill={color || 'transparent'}
		/>
	)
}

export const SVGRectangle: FC<TSvgRectangle> = ({
	x,
	y,
	width,
	height,
	type = 'station',
	isFill,
}) => {
	return (
		<rect
			x={x}
			y={y}
			width={width}
			height={height}
			strokeWidth={2}
			stroke={type === 'station' ? (isFill ? '#fff' : '#24265D') : '#FFF200'}
			rx={1}
		/>
	)
}
