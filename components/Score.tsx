import { useScoreStore } from '@/store/score.store'
import RoundScore from './Map/RoundScore'

const Score = () => {
	const { totalRoundsScore } = useScoreStore()

	return (
		<g>
			{/* СЧЕТ ВСЕХ РАУНДОВ */}
			<g>
				{Array.from({ length: 4 }, (_, i) => {
					return <RoundScore x={58 + 56 * i} y={660} index={i} />
				})}
				<foreignObject width={44} height={40} x={283} y={822}>
					<div className='score-field pointer-events-none select-none'>
						{totalRoundsScore}
					</div>
				</foreignObject>
			</g>
			{/* END СЧЕТ ВСЕХ РАУНДОВ */}

			{/* СЧЕТ СПЕЦИАЛЬНЫХ СТАНЦИЙ} */}
                
			{/* END СЧЕТ СПЕЦИАЛЬНЫХ СТАНЦИЙ} */}
		</g>
	)
}

export default Score
