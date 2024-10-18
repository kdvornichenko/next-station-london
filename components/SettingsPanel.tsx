import React, { useEffect, useState } from 'react'
import { Checkbox } from '@nextui-org/react'
import ColorPicker from '@/components/Map/ColorPicker'
import { startColorSwitcher } from '@/utils/colorSwitcher'
import { useColorStore } from '@/store/colors.store'

const SettingsPanel = () => {
	const [isSwitchingColors, setIsSwitchingColors] = useState(false)
	const { setCurrentColor } = useColorStore()

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
		<>
			<ColorPicker />
			<Checkbox onValueChange={handleSwitchColors}>
				Переключение цветов
			</Checkbox>
		</>
	)
}

export default SettingsPanel
