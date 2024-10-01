import { useScoreStore } from '@/store/score.store'
import { SVGCircle, SVGLine } from './Map/Geometries'
import SpecialPolygons from './SpecialPolygons'
import { colors, useColorStore } from '@/store/colors.store'
import { useState } from 'react'

type TSpecialPoint = {
	index: number
	textValue: number
}

const SpecialPoint = ({ index, textValue }: TSpecialPoint) => {
	const { setSpecialPoint, specialPoints } = useScoreStore()
	const { currentColor } = useColorStore()
	const [lineColor, setLineColor] = useState<string | null>(null) // Локальное состояние для цвета линии

	const x = 0
	const y = 898
	const r = 14

	const isClicked = specialPoints.includes(textValue)

	const onSpecialPointClick = () => {
		if (isClicked) {
			// Если поинт уже был кликнут и его удаляют, сбрасываем цвет
			setSpecialPoint(textValue)
			setLineColor(null) // Сбрасываем цвет при удалении линии
		} else {
			setSpecialPoint(textValue)
			setLineColor(currentColor || colors.default)
		}
	}

	return (
		<g
			onClick={onSpecialPointClick}
			transform={`translate(${index === 0 ? 0 : 30 * index + index * 5}, 0)`}
			className='cursor-pointer'
		>
			{index !== 10 && <SpecialPolygons x={x} y={y} r={r} />}
			<SVGCircle cx={x} cy={y} r={r} />
			<foreignObject x={x - r} y={y - r} className='w-7 h-7 '>
				<div className='w-full h-full flex items-center justify-center text-black text-lg select-none'>
					{textValue}
				</div>
			</foreignObject>
			{isClicked && lineColor && (
				<SVGLine
					x1={x - r - 4}
					x2={x + r + 4}
					y1={y + r}
					y2={y - r}
					strokeColor={lineColor}
					strokeWidth={3}
				/>
			)}
		</g>
	)
}

const SpecialPoints = () => {
	const { points } = useScoreStore()

	return (
		<g transform='translate(30, 0)'>
			{points.map((point, i) => (
				<SpecialPoint key={i} index={i} textValue={point} />
			))}
		</g>
	)
}

export default SpecialPoints
