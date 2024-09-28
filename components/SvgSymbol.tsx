import { TSpriteNames } from '@/store/sprites.store'
import { FC, ReactNode } from 'react'

type TSvgSymbol = {
	id: TSpriteNames
	children: ReactNode
}

const SvgSymbol: FC<TSvgSymbol> = ({ id, children }) => {
	return <symbol id={id}>{children}</symbol>
}

export default SvgSymbol
