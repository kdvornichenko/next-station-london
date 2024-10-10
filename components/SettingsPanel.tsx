import React, { useEffect, useState } from 'react'
import {
	Card as NextUICard,
	CardBody,
	CardHeader,
	Divider,
	Checkbox,
} from '@nextui-org/react'
import ColorPicker from '@/components/Map/ColorPicker'
import { startColorSwitcher } from '@/utils/colorSwitcher'
import { useColorStore } from '@/store/colors.store'

const SettingsPanel = () => {
	const [isMouseOverPanel, setIsMouseOverPanel] = useState(false)
	const [isSwitchingColors, setIsSwitchingColors] = useState(false)
	const { setCurrentColor } = useColorStore()

	// Обработчики для отслеживания, когда мышь над панелью
	const handleMouseEnter = () => setIsMouseOverPanel(true)
	const handleMouseLeave = () => setIsMouseOverPanel(false)
	const handleSwitchColors = () => {
		setIsSwitchingColors(!isSwitchingColors)
	}

	useEffect(() => {
		if (!isSwitchingColors) return

		const stopSwitching = startColorSwitcher(color => {
			setCurrentColor(color)
		}, 700)

		return () => stopSwitching()
	}, [isSwitchingColors])

	return (
		<NextUICard
			className={`bg-gray-900 fixed ${
				isMouseOverPanel ? 'translate-y-0' : 'translate-y-[90%]'
			} right-1/2 left-1/2 bottom-5 -translate-x-1/2 z-10 w-fit rounded-3xl max-w-[610px] shadow-[var(--nsl-current-color)] [box-shadow:5px_5px_40px_var(--tw-shadow-color)] [transition:all_0.7s_ease]`}
			shadow='none'
			radius='none'
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<CardHeader>Настройки</CardHeader>

			<Divider />

			<CardBody>
				<ColorPicker />
			</CardBody>

			<Divider />

			<Checkbox onValueChange={handleSwitchColors}>
				Переключение цветов
			</Checkbox>
		</NextUICard>
	)
}

export default SettingsPanel
