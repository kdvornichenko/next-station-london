import React from 'react'
import {
	Card as NextUICard,
	CardBody,
	CardHeader,
	Divider,
} from '@nextui-org/react'
import ColorPicker from '@/components/Map/ColorPicker'



const SettingsPanel = () => {
  return (
		<NextUICard
			className={`card fixed top-5 right-5 rounded-3xl max-w-[610px] shadow-[var(--nsl-current-color)] [transition:all_0.7s_ease]`}
			shadow='none'
			radius='none'
		>
			<CardHeader>Настройки</CardHeader>

			<Divider />
			<CardBody>
				<ColorPicker />
			</CardBody>
		</NextUICard>
	)
}

export default SettingsPanel