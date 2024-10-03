import { TSpriteNames } from '@/store/sprites.store'
import { FC } from 'react'

type TUseSvg = {
	id: TSpriteNames
	className?: string
}

const UseSvg: FC<TUseSvg> = ({ id, className }) => {
	return <use xlinkHref={'#' + id} className={className}/>
}

export default UseSvg
