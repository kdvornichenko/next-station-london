import { FC, useState } from 'react'
import ScoreInput from './ScoreInput'
import { useScoreStore } from '@/store/score.store'

type TCrossingPoints = {
	x: number
	y: number
	index: number
	count: number
}

const CrossingPoints: FC<TCrossingPoints> = ({ x, y, index, count }) => {
	const [crossingValue, setCrossingValue] = useState<number>(0)

	const { setCrossingPoint } = useScoreStore()

	return (
		<g transform={`translate(${x}, ${y})`}>
			<ScoreInput
				x={0}
				y={0}
				onChange={value => {
					const newValue = value * count
					setCrossingValue(newValue)

					// Обновляем значение в Zustand store для текущего индекса crossingPoints
					setCrossingPoint(index, newValue)
				}}
			/>

			<foreignObject x={62} y={0} width={44} height={40}>
				<div className='w-11 h-10 text-center text-black text-2xl content-center pointer-events-none select-none'>
					{crossingValue}
				</div>
			</foreignObject>
		</g>
	)
}

export default CrossingPoints
