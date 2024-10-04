import { colors } from '@/store/colors.store'
import { Any } from './Cards/Any'
import { Branch } from './Cards/Branch'
import { Circle } from './Cards/Circle'
import { Pentagon } from './Cards/Pentagon'
import { Rectangle } from './Cards/Rectangle'
import { Triangle } from './Cards/Triangle'

const createCard = (color: string, className: string) => ({
	Any: () => <Any color={color} className={className} />,
	Circle: () => <Circle color={color} className={className} />,
	Pentagon: () => <Pentagon color={color} className={className} />,
	Rectangle: () => <Rectangle color={color} className={className} />,
	Triangle: () => <Triangle color={color} className={className} />,
})

const Card = {
	Red: createCard(colors.cardRed, 'w-full h-full'),
	Blue: createCard(colors.cardBlue, 'w-full h-full'),
	Branch: () => <Branch className='w-full h-full' />,
}

export default Card
