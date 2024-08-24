import DefaultAny from '@/assets/default-any.png'
import DefaultCircle from '@/assets/default-circle.png'
import DefaultBranch from '@/assets/default-branch.png'
import DefaultPentagon from '@/assets/default-pentagon.png'
import DefaultRectangle from '@/assets/default-rectangle.png'
import DefaultTriangle from '@/assets/default-triangle.png'
import RedCircle from '@/assets/red-circle.png'
import RedAny from '@/assets/red-any.png'
import RedPentagon from '@/assets/red-pentagon.png'
import RedRectangle from '@/assets/red-rectangle.png'
import RedTriangle from '@/assets/red-triangle.png'
import Image, { StaticImageData } from 'next/image'
import styles from '@/styles/main.module.scss'

// Типы для форм и цветов
type Shape = 'Any' | 'Circle' | 'Branch' | 'Pentagon' | 'Rectangle' | 'Triangle'
type Color = 'Default' | 'Red'

// Тип для imageData
type ImageData = {
	[key in Color]: {
		[key in Shape]: StaticImageData
	}
}

// Все импортированные изображения
const importedImages: { [key: string]: StaticImageData } = {
	DefaultAny,
	DefaultCircle,
	DefaultBranch,
	DefaultPentagon,
	DefaultRectangle,
	DefaultTriangle,
	RedCircle,
	RedAny,
	RedPentagon,
	RedRectangle,
	RedTriangle,
}

// Функция для автоматического создания imageData
const createImageData = (images: {
	[key: string]: StaticImageData
}): ImageData => {
	const imageData = {} as ImageData

	Object.keys(images).forEach(key => {
		const [color, shape] = key.match(/(Default|Red)([A-Za-z]+)/)!.slice(1) as [
			Color,
			Shape,
		]

		if (!imageData[color]) {
			imageData[color] = {} as { [key in Shape]: StaticImageData }
		}

		imageData[color][shape] = images[key]
	})

	return imageData
}

// Создаем imageData автоматически
const imageData = createImageData(importedImages)

// Тип для компонентов
type CardComponents = {
	[key in Shape]: () => JSX.Element
}

// Функция для генерации компонентов Image
const createCardComponents = (images: {
	[key in Shape]: StaticImageData
}): CardComponents => {
	const components = {} as CardComponents

	;(Object.keys(images) as Array<Shape>).forEach(shape => {
		components[shape] = () => (
			<Image
				src={images[shape].src}
				width={400}
				height={240}
				alt={shape}
				className={styles.card}
			/>
		)
	})

	return components
}

// Создание объектов Cards с использованием функции createCardComponents
const Cards: { [key in Color]: CardComponents } = {
	Default: createCardComponents(imageData.Default),
	Red: createCardComponents(imageData.Red),
}

export default Cards
