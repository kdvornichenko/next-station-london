import { useEffect, useState } from 'react'
import Block from './Block'
import { useStationsStore } from '@/store/stations.store'
import { TSvgCircle, TSvgLine } from '@/types/map.types'
import { colors, useColorStore } from '@/store/colors.store'
import { SVGCircle, SVGLine } from './Geometries'
import UseSvg from '../UseSvg'
import Score from '../Score/Score'
import { Checkbox, Input } from '@nextui-org/react'

const Map = () => {
	const { stationFirst, setStationFirst, stationSecond, setStationSecond } =
		useStationsStore()

	const { currentColor } = useColorStore()

	const [lines, setLines] = useState<TSvgLine[]>([])
	const [selectedCircle, setSelectedCircle] = useState<TSvgCircle | null>()
	const [isLineRemovable, setIsLineRemovable] = useState<boolean>(false)

	useEffect(() => {
		if (!stationFirst || !stationSecond) return

		const newLine: TSvgLine = {
			x1: stationFirst.x,
			y1: stationFirst.y,
			x2: stationSecond.x,
			y2: stationSecond.y,
			strokeColor: currentColor || colors.pink,
		}

		setLines(prevLines => [...prevLines, newLine])

		setStationFirst(null)
		setStationSecond(null)
		setSelectedCircle(null)
	}, [stationSecond, currentColor])

	useEffect(() => {
		if (!stationFirst) {
			setSelectedCircle(null)
		} else {
			const newCircle: TSvgCircle = {
				cx: stationFirst.x,
				cy: stationFirst.y,
				strokeColor: currentColor || colors.pink,
			}

			setSelectedCircle(newCircle)
		}
	}, [stationFirst])

	const handleLineClick = (index: number) => {
		if (!isLineRemovable) return

		if (window.confirm('Удалить выбранную линию?')) {
			// Удаляем линию по индексу
			setLines(prevLines => prevLines.filter((_, i) => i !== index))
		}
	}

	// Рендерим линии
	const renderLines = () => {
		return lines.map((line, index) => (
			<SVGLine
				key={index}
				x1={line.x1}
				y1={line.y1}
				x2={line.x2}
				y2={line.y2}
				strokeColor={line.strokeColor}
				strokeWidth={4}
				className='cursor-pointer'
				onClick={() => handleLineClick(index)}
				style={{ pointerEvents: isLineRemovable ? 'all' : 'none' }}
			/>
		))
	}

	const renderCircle = () => {
		if (!selectedCircle) return

		return (
			<SVGCircle
				cx={selectedCircle.cx}
				cy={selectedCircle.cy}
				r={24}
				fill={'transparent'}
				strokeColor={colors.default}
				className='pointer-events-none animate-dash-animation'
				strokeDasharray={4}
			/>
		)
	}

	return (
		<div className='map w-full h-full flex items-center justify-center overflow-auto'>
			{/* 
			<div className='fixed top-1/4 left-1/3 hidden flex-col z-10'>
				<input type='number' placeholder='x' id='x' />
				<input type='number' placeholder='y' id='y' />
				<button
					type='button'
					id='button'
					className='border border-black border-solid rounded-md bg-cyan-400 text-black'
				>
					Toggle
				</button>
			</div> */}
			<svg
				width='532'
				height='924'
				viewBox='0 0 532 924'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				className='w-auto h-full rounded-xl'
			>
				<UseSvg id='map-lines' className='pointer-events-none' />

				{/* Блоки карты */}
				<Block.TopLeft />
				<Block.TopCenter />
				<Block.TopRight />
				<Block.CenterLeft />
				<Block.CenterCenter />
				<Block.CenterRight />
				<Block.BottomLeft />
				<Block.BottomCenter />
				<Block.BottomRight />

				{/* Рендерим круг для первой выбранной станции */}
				{renderCircle()}
				{/* Рендерим линии */}
				{renderLines()}

				{/* Верхний и нижний шаблон карты */}
				<UseSvg id='map-top-bot' className='pointer-events-none' />
				<foreignObject width={'100%'} height={'100%'}>
					<div className='bg-black'>
						<Checkbox onChange={e => setIsLineRemovable(e.target.checked)}>
							Удалить линию
						</Checkbox>
					</div>
				</foreignObject>
				<Score />
			</svg>
		</div>
	)
}

export default Map
