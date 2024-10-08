import { colors } from '@/store/colors.store'
import { Any } from './Cards/Any'
import { Branch } from './Cards/Branch'
import { Circle } from './Cards/Circle'
import { Pentagon } from './Cards/Pentagon'
import { Rectangle } from './Cards/Rectangle'
import { Triangle } from './Cards/Triangle'
import { TCard } from '@/types/card.types'

const createCard = ({ color, className, isRed }: TCard) => ({
	Any: () => <Any color={color} className={className} isRed={isRed} />,
	Circle: () => <Circle color={color} className={className} isRed={isRed} />,
	Pentagon: () => (
		<Pentagon color={color} className={className} isRed={isRed} />
	),
	Rectangle: () => (
		<Rectangle color={color} className={className} isRed={isRed} />
	),
	Triangle: () => (
		<Triangle color={color} className={className} isRed={isRed} />
	),
})

const Card = {
	Red: createCard({
		color: colors.cardRed,
		className: 'w-full h-full',
		isRed: true,
	}),
	Blue: createCard({
		color: colors.cardBlue,
		className: 'w-full h-full',
		isRed: false,
	}),
	Branch: () => <Branch className='w-full h-full' />,
}

export default Card
