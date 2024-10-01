import { useScoreStore } from '@/store/score.store'
import RoundScore from './Map/RoundScore'
import SpecialPoints from './SpecialPoints'
import { SVGCircle } from './Map/Geometries'
import SpecialPolygons from './SpecialPolygons'

type TSpecialScoreDisplay = {
	x: number
	y: number
	r: number
	size: number
}

const SpecialScoreDisplay = ({ x, y, r, size }: TSpecialScoreDisplay) => {
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
	const { totalRoundsScore } = useScoreStore()
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

			{/* СЧЕТ СПЕЦИАЛЬНЫХ СТАНЦИЙ */}
			<g>
				<SpecialPoints />
				<SpecialScoreDisplay {...specialScoreCoords} />
			</g>
			{/* END СЧЕТ СПЕЦИАЛЬНЫХ СТАНЦИЙ */}
		</g>
	)
}

export default Score
