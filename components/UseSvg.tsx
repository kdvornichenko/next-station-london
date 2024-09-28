import { TSpriteNames } from '@/store/sprites.store'
import { FC } from 'react'

type TUseSvg = {
	id: TSpriteNames
}

const UseSvg: FC<TUseSvg> = ({ id }) => {
	return <use xlinkHref={'#' + id} />
}

export default UseSvg
