import { useEffect, useState } from 'react'
import Block from './Block'
import styles from './map.module.sass'
import { useSetStations } from '@/store/stations.store'
import MapLines from './MapLines'
import MapTopBot from './MapTopBot'
import { TSvgLine } from '@/types/map.types'
import { colors } from '@/store/colors.store'
import { SVGLine } from './Geometries'
import ColorPicker from './ColorPicker'

const Map = () => {
	const {
		stationFirst,
		setStationFirst,
		stationSecond,
		setStationSecond,
		currentColor,
	} = useSetStations()

	// Состояние для хранения всех линий
	const [lines, setLines] = useState<TSvgLine[]>([])

	// useEffect для создания новой линии, если выбраны обе станции
	useEffect(() => {
		if (!stationFirst || !stationSecond) return

		// Добавляем новую линию в состояние с текущим цветом
		const newLine: TSvgLine = {
			x1: stationFirst.x,
			y1: stationFirst.y,
			x2: stationSecond.x,
			y2: stationSecond.y,
			strokeColor: currentColor || colors.pink, // Сохраняем текущий цвет
		}

		setLines(prevLines => [...prevLines, newLine])

		// Сбрасываем выбранные станции
		setStationFirst(null)
		setStationSecond(null)
	}, [stationSecond, currentColor])

	// Функция для рендеринга всех линий
	const renderLines = () => {
		return lines.map((line, index) => (
			<SVGLine
				key={index}
				x1={line.x1}
				y1={line.y1}
				x2={line.x2}
				y2={line.y2}
				strokeColor={line.strokeColor} // Используем цвет линии из состояния
				strokeWidth={4}
				className={styles.map__connection}
			/>
		))
	}

	return (
		<div className={styles.map}>
			<ColorPicker />
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
				<g clipPath='url(#clip0_1_6)'>
					{/* Рендерим линии */}

					{/* Блоки карты */}
					<MapLines />
					<Block.TopLeft />
					<Block.TopCenter />
					<Block.TopRight />
					<Block.CenterLeft />
					<Block.CenterCenter />
					<Block.CenterRight />
					<Block.BottomLeft />
					<Block.BottomCenter />
					<Block.BottomRight />
					{renderLines()}
					<MapTopBot />
				</g>
			</svg>
		</div>
	)
}

export default Map
