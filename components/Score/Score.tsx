import { useScoreStore } from '@/store/score.store'
import RoundScore from './RoundScore'

import { SVGCircle } from '../Map/Geometries'
import SpecialPolygons from '../SpecialPolygons'
import { FC } from 'react'
import SpecialPoints from './SpecialPoints'
import CrossingPoints from './CrossingPoints'
import TasksPoints from './TasksPoints'

type TSpecialScoreDisplay = {
	x: number
	y: number
	r: number
	size: number
}

const SpecialScoreDisplay: FC<TSpecialScoreDisplay> = ({ x, y, r, size }) => {
	const { specialScore } = useScoreStore()

	return (
		<g>
			<SpecialPolygons x={x} y={y} r={r} />
			<SVGCircle cx={x} cy={y} r={r} />
			<foreignObject
				width={size}
				height={size}
				x={x - size / 2}
				y={y - size / 2}
			>
				<div className='w-full h-full flex items-center justify-center text-black text-2xl pointer-events-none select-none'>
					{specialScore}
				</div>
			</foreignObject>
		</g>
	)
}

const Score = () => {
	const { totalRoundsScore, totalCrossingScore, finalScore } = useScoreStore()
	const specialScoreCoords = { x: 365, y: 842, r: 16, size: 40 }

	return (
		<g>
			{/* СЧЕТ ВСЕХ РАУНДОВ */}
			<g>
				{Array.from({ length: 4 }, (_, i) => (
					<RoundScore key={i} x={58 + 56 * i} y={660} index={i} />
				))}
				<foreignObject width={44} height={40} x={283} y={822}>
					<div className='score-field pointer-events-none select-none'>
						{totalRoundsScore}
					</div>
				</foreignObject>
			</g>
			{/* END СЧЕТ ВСЕХ РАУНДОВ */}

			{/* СЧЕТ ПЕРЕСЕЧЕНИЙ */}
			<g transform='translate(286, 0)'>
				{[2, 5, 9].map((count, i) => {
					return (
						<CrossingPoints
							key={i}
							x={58}
							y={660 + 54 * i}
							index={i}
							count={count}
						/>
					)
				})}

				<foreignObject width={43} height={40} x={119} y={822}>
					<div className='score-field pointer-events-none select-none'>
						{totalCrossingScore}
					</div>
				</foreignObject>
			</g>
			{/* END СЧЕТ ПЕРЕСЕЧЕНИЙ */}

			{/* СЧЕТ ЗАДАНИЙ */}
			<g transform='translate(350, 0)'>
				<TasksPoints />
			</g>
			{/* END СЧЕТ ЗАДАНИЙ */}

			{/* СЧЕТ СПЕЦИАЛЬНЫХ СТАНЦИЙ */}
			<g>
				<SpecialPoints />
				<SpecialScoreDisplay {...specialScoreCoords} />
			</g>
			{/* END СЧЕТ СПЕЦИАЛЬНЫХ СТАНЦИЙ */}

			{/* ОБЩИЙ СЧЕТ */}
			<g transform='translate(410, 0)'>
				<foreignObject width={105} height={30} x={0} y={880}>
					<div className='score-field pointer-events-none select-none bg-transparent'>
						{finalScore}
					</div>
				</foreignObject>
			</g>
			{/* END ОБЩИЙ СЧЕТ */}
		</g>
	)
}

export default Score
