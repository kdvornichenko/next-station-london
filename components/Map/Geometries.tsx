import { FC } from 'react'
import { TSvgCircle, TSvgLine, TSvgRectangle } from '@/types/map.types'
import { colors } from '@/store/colors.store'

export const SVGLine: FC<TSvgLine> = ({
	x1,
	y1,
	x2,
	y2,
	isFill,
	shape,
	strokeColor,
	strokeWidth,
	className,
}) => {
	return (
		<line
			x1={x1}
			y1={y1}
			x2={x2}
			y2={y2}
			stroke={
				strokeColor ? strokeColor : isFill ? colors.white : colors.default
			}
			strokeWidth={strokeWidth || 2}
			strokeLinecap='round'
			data-shape={shape}
			className={className}
		/>
	)
}

export const SVGCircle: FC<TSvgCircle> = ({
	cx,
	cy,
	r,
	fill,
	isFill,
	shape,
	isMain,
}) => {
	const color = (fill && colors[fill as keyof typeof colors]) || fill

	return (
		<circle
			cx={cx}
			cy={cy}
			r={r}
			strokeWidth={2}
			stroke={isFill ? colors.white : color ? color : colors.default}
			fill={color || colors.white}
			data-shape={shape}
			data-main={isMain}
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
	shape,
}) => {
	return (
		<rect
			x={x}
			y={y}
			width={width}
			height={height}
			strokeWidth={2}
			stroke={
				type === 'station'
					? isFill
						? colors.white
						: colors.default
					: colors.yellow
			}
			rx={1}
			data-shape={shape}
		/>
	)
}
