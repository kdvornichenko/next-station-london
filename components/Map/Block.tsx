import { useMemo } from 'react'
import { TBlock } from '@/types/map.types'
import { SVGRectangle } from './Shape'
import Station from './Station'

const Block = ({ children, size, x, y }: TBlock) => {
	const getPosX = (x: 'left' | 'center' | 'right'): number => {
		if (size === 'sm' && x === 'right' && (y === 'top' || y === 'bottom')) {
			return 479
		}

		const positions = { left: -1, center: 160, right: 372 }
		return positions[x]
	}

	const getPosY = (y: 'top' | 'center' | 'bottom'): number => {
		if (size === 'sm' && (x === 'right' || x === 'left') && y === 'bottom') {
			return 593
		}

		const positions = { top: 116, center: 273, bottom: 486 }
		return positions[y]
	}

	const getSize = (
		size: string,
		x: string,
		y: string
	): { width: number; height: number } => {
		if (size === 'lg') {
			const width = x === 'center' ? 212 : 161
			const height = y === 'top' ? 157 : y === 'center' ? 213 : 158
			return { width, height }
		}
		return { width: 55, height: 51 }
	}

	const posX = useMemo(() => getPosX(x), [x])
	const posY = useMemo(() => getPosY(y), [y])
	const { width, height } = useMemo(() => getSize(size, x, y), [size, x, y])

	return (
		<g>
			<SVGRectangle
				x={posX}
				y={posY}
				width={width}
				height={height}
				type='block'
			/>
			{children}
		</g>
	)
}

const TopLeft = () => {
	return (
		<Block size='lg' x='left' y='top'>
			<Block size='sm' x='left' y='top'>
				<Station type='hexagon' x={0} y={0} />
			</Block>
			<Station type='triangle' x={52} y={0} />
			<Station type='hexagon' x={52} y={54} />
			<Station type='rectangle' x={106} y={0} />
			<Station type='circle' x={0} y={106} />
		</Block>
	)
}

const TopCenter = () => {
	return (
		<Block size='lg' x='center' y='top'>
			<Station type='triangle' x={212} y={0} />
			<Station type='circle' x={265} y={0} fill='pink' />
			<Station type='rectangle' x={159} y={54} />
			<Station type='triangle' x={159} y={107} fill='green' />
			<Station type='rectangle' x={318} y={107} isSpecial={true} />
		</Block>
	)
}

export default { Block, TopLeft, TopCenter }
