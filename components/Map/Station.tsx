import { FC, useEffect, useState } from 'react'
import { colors } from '@/store/colors.store'
import { SVGCircle } from './Geometries'
import { TStation } from '@/types/map.types'
import Shapes from './Shapes'
import { useStationsStore } from '@/store/stations.store'
import SpecialPoygons from '../SpecialPolygons'

const stations: Record<TStation['type'], FC<any>> = {
	hexagon: Shapes.Hexagon,
	circle: Shapes.Circle,
	rectangle: Shapes.Rectangle,
	triangle: Shapes.Triangle,
}

const Station: FC<TStation> = ({ x, y, type, fill, isSpecial, isAny }) => {
	const Component = stations[type]
	const { stationFirst, setStationFirst, setStationSecond } = useStationsStore()
	const [selectedElement, setSelectedElement] = useState<SVGGElement | null>(
		null
	)

	const props = {
		x: 27.5,
		y: 140.5,
		r: 16,
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

	const onStationClick = (station: TStation) => {
		const newX = station.x + 27.5
		const newY = station.y + 140.5

		if (!stationFirst) {
			setStationFirst({ x: newX, y: newY, type })
		} else {
			// Проверяем, является ли текущая станция той же самой, что и stationFirst
			if (stationFirst.x === newX && stationFirst.y === newY) {
				setStationFirst(null)
			} else {
				setStationSecond({ x: newX, y: newY, type })
			}
		}
	}

	return (
		<g
			onClick={() => onStationClick({ x, y, type })}
			transform={`translate(${x}, ${y})`}
			className='cursor-pointer relative'
		>
			{isSpecial && <SpecialPoygons x={props.x} y={props.y} r={props.r} />}

			<SVGCircle
				cx={props.x}
				cy={props.y}
				r={props.r}
				fill={fill}
				isMain={true}
			/>
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
