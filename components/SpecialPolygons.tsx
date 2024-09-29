import { colors } from '@/store/colors.store'
import React from 'react'

type TSpecialPolygons = { x: number; y: number; r: number; polygonsCount?: number }

const SpecialPolygons = (props: TSpecialPolygons) => {
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

	return getAngles(props.polygonsCount || 8).map(angle => (
		<polygon
			key={angle}
			fill={colors.default}
			points={getPolygonPoints(angle)}
		/>
	))
}

export default SpecialPolygons
