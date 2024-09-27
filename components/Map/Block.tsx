import { useMemo } from 'react'
import { TBlock } from '@/types/map.types'
import { SVGRectangle } from './Geometries'
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
			<Station type='circle' x={265} y={0} />
			<Station type='rectangle' x={159} y={54} />
			<Station type='triangle' x={159} y={107} fill='green' />
			<Station type='hexagon' x={318} y={54} isSpecial={true} />
			<Station type='rectangle' x={318} y={107} />
		</Block>
	)
}

const TopRight = () => {
	return (
		<Block size='lg' x='right' y='top'>
			<Block size='sm' x='right' y='top'>
				<Station type='circle' x={479} y={0} />
			</Block>
			<Station type='triangle' x={372} y={0} />
			<Station type='rectangle' x={424} y={54} />
			<Station type='hexagon' x={478} y={54} />
			<Station type='triangle' x={478} y={107} />
		</Block>
	)
}

const CenterLeft = () => {
	return (
		<Block size='lg' x='left' y='center'>
			<Station type='triangle' x={52} y={213} />
			<Station type='hexagon' x={106} y={160} />
			<Station type='rectangle' x={106} y={213} />
			<Station type='rectangle' x={0} y={160} isSpecial={true} />
			<Station type='hexagon' x={0} y={267} />
			<Station type='rectangle' x={106} y={267} fill={'purple'} />
		</Block>
	)
}

const CenterCenter = () => {
	return (
		<Block size='lg' x='center' y='center'>
			<Station type='triangle' x={213} y={160} />
			<Station type='triangle' x={265} y={160} isSpecial={true} isAny={true} />
			<Station type='hexagon' x={213} y={213} />
			<Station type='rectangle' x={265} y={213} />
			<Station type='circle' x={318} y={160} />
			<Station type='triangle' x={213} y={319} />
			<Station type='circle' x={213} y={266} />
			<Station type='rectangle' x={318} y={319} />
			<Station type='hexagon' x={159} y={319} />
		</Block>
	)
}

const CenterRight = () => {
	return (
		<Block size='lg' x='right' y='center'>
			<Station type='circle' x={372} y={160} fill={'pink'} />
			<Station type='rectangle' x={478} y={160} />
			<Station type='hexagon' x={425} y={213} />
			<Station type='circle' x={372} y={267} />
			<Station type='triangle' x={372} y={320} />
			<Station type='triangle' x={478} y={320} isSpecial={true} />
		</Block>
	)
}

const BottomLeft = () => {
	return (
		<Block size='lg' x='left' y='bottom'>
			<Block size='sm' x='left' y='bottom'>
				<Station type='triangle' x={0} y={479} />
			</Block>
			<Station type='circle' x={0} y={373} />
			<Station type='circle' x={52} y={426} />
			<Station type='rectangle' x={106} y={373} />
			<Station type='rectangle' x={52} y={479} />
		</Block>
	)
}

const BottomCenter = () => {
	return (
		<Block size='lg' x='center' y='bottom'>
			<Station type='circle' x={158} y={373} />
			<Station type='hexagon' x={158} y={479} />
			<Station type='circle' x={212} y={479} isSpecial={true} />
			<Station type='triangle' x={265} y={479} />
			<Station type='hexagon' x={318} y={426} />
			<Station type='hexagon' x={265} y={373} fill={'blue'} />
		</Block>
	)
}
const BottomRight = () => {
	return (
		<Block size='lg' x='right' y='bottom'>
			<Block size='sm' x='right' y='bottom'>
				<Station type='rectangle' x={479} y={479} />
				<Station type='circle' x={372} y={479} />
				<Station type='circle' x={372} y={479} />
				<Station type='circle' x={425} y={373} />
				<Station type='hexagon' x={479} y={373} />
			</Block>
		</Block>
	)
}

export default {
	Block,
	TopLeft,
	TopCenter,
	TopRight,
	CenterLeft,
	CenterCenter,
	CenterRight,
	BottomLeft,
	BottomCenter,
	BottomRight,
}
