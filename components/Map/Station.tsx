import { FC, useEffect, useState } from 'react'
import { colors, TColorNames } from '@/store/colors.store'
import { SVGCircle, SVGLine, SVGRectangle } from './Shape'
import { TStations } from '@/types/map.types'
import gsap from 'gsap'

type TStation = {
	type: TStations
	x: number
	y: number
	fill?: TColorNames
	isSpecial?: boolean
	isAny?: boolean
}

interface ShapeProps {
	isFill: boolean
	shape?: TStations
}

const Hexagon: FC<ShapeProps> = ({ isFill, shape }) => {
	return (
		<>
			<SVGLine
				x1={27.5}
				y1={132}
				x2={19}
				y2={138}
				isFill={isFill}
				shape={shape}
			/>
			<SVGLine
				x1={19}
				y1={138}
				x2={22}
				y2={148}
				isFill={isFill}
				shape={shape}
			/>
			<SVGLine
				x1={22}
				y1={148}
				x2={33}
				y2={148}
				isFill={isFill}
				shape={shape}
			/>
			<SVGLine
				x1={33}
				y1={148}
				x2={36}
				y2={138}
				isFill={isFill}
				shape={shape}
			/>
			<SVGLine
				x1={36}
				y1={138}
				x2={27.5}
				y2={132}
				isFill={isFill}
				shape={shape}
			/>
		</>
	)
}

const Triangle: FC<ShapeProps> = ({ isFill, shape }) => {
	return (
		<>
			<SVGLine
				x1={27.5}
				y1={132}
				x2={18.5}
				y2={146}
				isFill={isFill}
				shape={shape}
			/>
			<SVGLine
				x1={18.5}
				y1={146}
				x2={35.5}
				y2={146}
				isFill={isFill}
				shape={shape}
			/>
			<SVGLine
				x1={35.5}
				y1={146}
				x2={27.5}
				y2={132}
				isFill={isFill}
				shape={shape}
			/>
		</>
	)
}

const Circle: FC<ShapeProps> = ({ isFill, shape }) => (
	<SVGCircle cx={27.5} cy={140.5} r={9} isFill={isFill} shape={shape} />
)

const Rectangle: FC<ShapeProps> = ({ isFill, shape }) => (
	<SVGRectangle
		x={20}
		y={133}
		width={15}
		height={15}
		isFill={isFill}
		type='station'
		shape={shape}
	/>
)

const stations: Record<TStation['type'], FC<any>> = {
	hexagon: Hexagon,
	circle: Circle,
	rectangle: Rectangle,
	triangle: Triangle,
}

const Station: FC<TStation> = ({ x, y, type, fill, isSpecial, isAny }) => {
	const Component = stations[type]

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
		if (!selectedElement) return

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

	const onStationClick = (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
		const targetElement = e.currentTarget
		setSelectedElement(targetElement)
	}

	return (
		<g onClick={e => onStationClick(e)} transform={`translate(${x}, ${y})`}>
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
					const StationComponent = stations[stationType as TStation['type']] // Получаем компонент по типу станции
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
