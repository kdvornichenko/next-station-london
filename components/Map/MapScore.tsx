import { FC, useEffect, useState } from 'react'
import MapScoreInput from './MapScoreInput'

type TMapScore = { x: number; y: number }

const MapScore: FC<TMapScore> = ({ x, y }) => {
	const [blocks, setBlocks] = useState<number>(0)
	const [stations, setStations] = useState<number>(0)
	const [river, setRiver] = useState<number>(0)
	const [score, setScore] = useState<number>(0)

	// Функция для расчета результата
	useEffect(() => {
		setScore(blocks * stations + river)
	}, [blocks, stations, river])

	return (
		<g transform={`translate(${x}, ${y})`}>
			<foreignObject x={0} y={0} width={44} height={40}>
				<MapScoreInput
					onChange={value => {
						setBlocks(value)
					}}
				/>
			</foreignObject>

			<foreignObject x={0} y={54} width={44} height={40}>
				<MapScoreInput
					onChange={value => {
						setStations(value)
					}}
				/>
			</foreignObject>

			<foreignObject x={0} y={108} width={44} height={40}>
				<MapScoreInput
					onChange={value => {
						setRiver(value)
					}}
				/>
			</foreignObject>

			<foreignObject x={0} y={162} width={44} height={40}>
				<div className='w-11 h-10 text-center text-black text-2xl content-center pointer-events-none select-none'>
					{score}
				</div>
			</foreignObject>
		</g>
	)
}

export default MapScore
