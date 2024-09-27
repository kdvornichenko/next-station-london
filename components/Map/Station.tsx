import { FC, useEffect, useState } from 'react'
import { colors } from '@/store/colors.store'
import { SVGCircle } from './Geometries'
import { TStation } from '@/types/map.types'
import Shapes from './Shapes'
import { useSetStations } from '@/store/stations.store'
import styles from './map.module.sass'

const stations: Record<TStation['type'], FC<any>> = {
	hexagon: Shapes.Hexagon,
	circle: Shapes.Circle,
	rectangle: Shapes.Rectangle,
	triangle: Shapes.Triangle,
}

const Station: FC<TStation> = ({ x, y, type, fill, isSpecial, isAny }) => {
	const Component = stations[type]
	const { stationFirst, setStationFirst, setStationSecond } = useSetStations()

	const [selectedElement, setSelectedElement] = useState<SVGGElement | null>(
		null
	)

	const props = {
		x: 27.5,
		y: 140.5,
		r: 16,
	}

	const getPolygonPoints = (angle: number) => {
		const rad = (angle * Math.PI) / 180
		const px = props.x + Math.cos(rad) * (props.r + 0.5)
		const py = props.y + Math.sin(rad) * (props.r + 0.5)

		// Определение вершины полигона
		let point1, point2, point3

		// Для углов 0, 90, 180, 270 задаем положение вершины и крайних точек
		if (angle === 0 || angle === 180) {
			// По оси X (право или лево)
			const sign = angle === 0 ? 1 : -1
			point1 = `${px}, ${py - 4.5}` // Верхняя точка
			point2 = `${px}, ${py + 4.5}` // Нижняя точка
			point3 = `${px + 6 * sign}, ${props.y}` // Вершина полигона (вправо или влево)
		} else if (angle === 90 || angle === 270) {
			// По оси Y (вверх или вниз)
			const sign = angle === 90 ? 1 : -1
			point1 = `${px + 4.5}, ${py}` // Правая точка
			point2 = `${px - 4.5}, ${py}` // Левая точка
			point3 = `${props.x}, ${py + 6 * sign}` // Вершина (вниз или вверх)
		} else if ([45, 135, 225, 315].includes(angle)) {
			// Для диагональных углов добавляем смещение на 6 единиц
			const pxTip = props.x + Math.cos(rad) * (props.r + 6)
			const pyTip = props.y + Math.sin(rad) * (props.r + 6)

			// Смещение для крайних точек полигона (по диагонали)
			const offsetX = 4.5 * Math.cos(rad + Math.PI / 2)
			const offsetY = 4.5 * Math.sin(rad + Math.PI / 2)

			point1 = `${px - offsetX}, ${py - offsetY}` // Одна сторона полигона
			point2 = `${px + offsetX}, ${py + offsetY}` // Другая сторона полигона
			point3 = `${pxTip}, ${pyTip}` // Вершина полигона (наружу от круга)
		}

		return `${point1} ${point2} ${point3}`
	}

	const getAngles = (polygonCount: number) => {
		return Array.from(
			{ length: polygonCount },
			(_, i) => (360 / polygonCount) * i
		)
	}

	useEffect(() => {
		if (selectedElement === null) return

		// Находим инпуты с id="x" и id="y"
		const inputX = document.getElementById('x') as HTMLInputElement
		const inputY = document.getElementById('y') as HTMLInputElement
		const button = document.getElementById('button') as HTMLButtonElement

		if (inputX && inputY) {
			// Привязываем их значения к матрице трансформации кликнутого элемента
			inputX.value = selectedElement.transform.baseVal[0].matrix.e.toString()
			inputY.value = selectedElement.transform.baseVal[0].matrix.f.toString()

			// Обработчик для изменения X (matrix.e)
			inputX.oninput = (event: Event) => {
				const newValue = Number((event.target as HTMLInputElement).value)
				selectedElement.transform.baseVal[0].matrix.e = newValue
			}

			// Обработчик для изменения Y (matrix.f)
			inputY.oninput = (event: Event) => {
				const newValue = Number((event.target as HTMLInputElement).value)
				selectedElement.transform.baseVal[0].matrix.f = newValue
			}

			button.onclick = () => {
				selectedElement.classList.contains('is-hidden')
					? (selectedElement.style.display = 'block')
					: (selectedElement.style.display = 'none')

				selectedElement.classList.toggle('is-hidden')
			}
		}
	}, [selectedElement])

	useEffect(() => {
		const hexes = document.querySelectorAll('[data-shape="hexagon"]')
		const rectangles = document.querySelectorAll('[data-shape="rectangle"]')
		const triangles = document.querySelectorAll('[data-shape="triangle"]')
		const circles = document.querySelectorAll('[data-shape="circle"]')

		const shapes = [
			{ elements: hexes, name: 'hexagon' },
			{ elements: rectangles, name: 'rectangle' },
			{ elements: triangles, name: 'triangle' },
			{ elements: circles, name: 'circle' },
		]

		let currentIndex = 0

		const cycleShapes = () => {
			shapes.forEach(({ elements }) => {
				elements.forEach(el => ((el as HTMLElement).style.opacity = '0'))
			})

			const { elements } = shapes[currentIndex]
			elements.forEach(el => ((el as HTMLElement).style.opacity = '1'))

			Promise.resolve().then(() =>
				setTimeout(() => {
					elements.forEach(el => ((el as HTMLElement).style.opacity = '0'))
					currentIndex = (currentIndex + 1) % shapes.length
					cycleShapes()
				}, 300)
			)
		}

		cycleShapes()
	}, [])

	// const onStationClick = (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
	// 	const targetElement = e.currentTarget
	// 	Promise.resolve(setSelectedElement(null)).then(() =>
	// 		setSelectedElement(targetElement)
	// 	)
	// }

	const onStationClick = ({ x, y, type }: TStation) => {
		const newX = x + 27.5
		const newY = y + 140.5

		if (!stationFirst) {
			setStationFirst({ x: newX, y: newY, type })
		} else {
			setStationSecond({ x: newX, y: newY, type })
		}
	}

	return (
		<g
			onClick={() => onStationClick({ x, y, type })}
			transform={`translate(${x}, ${y})`}
			className={styles.map__station}
		>
			{isSpecial &&
				getAngles(8).map(angle => (
					<polygon
						key={angle}
						fill={colors.default}
						points={getPolygonPoints(angle)}
					/>
				))}
			<SVGCircle cx={props.x} cy={props.y} r={props.r} fill={fill} />
			{isAny ? (
				Object.keys(stations).map(stationType => {
					const StationComponent = stations[stationType as TStation['type']]
					return (
						<StationComponent
							key={stationType}
							isFill={Boolean(fill)}
							shape={stationType}
						/>
					)
				})
			) : (
				<Component isFill={Boolean(fill)} />
			)}
		</g>
	)
}

export default Station
