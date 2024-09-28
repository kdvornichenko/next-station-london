import { useEffect, useState } from 'react'
import Block from './Block'
import styles from './map.module.sass'
import { useSetStations } from '@/store/stations.store'
import { TSvgCircle, TSvgLine } from '@/types/map.types'
import { colors } from '@/store/colors.store'
import { SVGCircle, SVGLine } from './Geometries'
import ColorPicker from './ColorPicker'
import MapScore from './MapScore'
import UseSvg from '../UseSvg'

const Map = () => {
	const {
		stationFirst,
		setStationFirst,
		stationSecond,
		setStationSecond,
		currentColor,
		setIsActive,
	} = useSetStations()

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

	// Обработчик клика на линию
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
				className={styles.map__connection}
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
				className={styles.map__selected}
				strokeDasharray={4}
			/>
		)
	}

	return (
		<div className={styles.map}>
			<ColorPicker />
			<div>
				<input
					type='checkbox'
					id='delete-line'
					onChange={e => setIsLineRemovable(e.target.checked)}
				/>
				<label htmlFor='delete-line'>Удалить линию</label>
			</div>
			<div className={styles.map__inputs}>
				<input type='number' placeholder='x' id='x' />
				<input type='number' placeholder='y' id='y' />
				<button type='button' id='button'>
					Toggle
				</button>
			</div>
			<svg
				width='532'
				height='924'
				viewBox='0 0 532 924'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				{/* Блоки карты */}
				<UseSvg id='map-lines' />
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
				<UseSvg id='map-top-bot' />
				<MapScore />
			</svg>
		</div>
	)
}

export default Map
