import { FC, useEffect, useState } from 'react'
import ScoreInput from './ScoreInput'
import { useScoreStore } from '@/store/score.store'

type TScoreProps = { x: number; y: number; index: number }

const RoundScore: FC<TScoreProps> = ({ x, y, index }) => {
	const { setScore } = useScoreStore()
	const [blocks, setBlocks] = useState<number>(0)
	const [stations, setStations] = useState<number>(0)
	const [river, setRiver] = useState<number>(0)
	const [score, setScoreLocal] = useState<number>(0)

	useEffect(() => {
		const newScore = blocks * stations + river
		setScoreLocal(newScore)
		setScore(index, { blocks, stations, rivers: river, score: newScore })
	}, [blocks, stations, river, index, setScore])

	return (
		<g transform={`translate(${x}, ${y})`}>
			<ScoreInput
				x={0}
				y={0}
				onChange={value => {
					setBlocks(value)
				}}
			/>

			<ScoreInput
				x={0}
				y={54}
				onChange={value => {
					setStations(value)
				}}
			/>

			<ScoreInput
				x={0}
				y={108}
				onChange={value => {
					setRiver(value)
				}}
			/>

			<foreignObject x={0} y={162} width={44} height={40}>
				<div className='w-11 h-10 text-center text-black text-2xl content-center pointer-events-none select-none'>
					{score}
				</div>
			</foreignObject>
		</g>
	)
}

export default RoundScore
