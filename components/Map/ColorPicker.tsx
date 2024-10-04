import { useState } from 'react'
import { colors, TColorValues, useColorStore } from '@/store/colors.store'

const ColorPicker = () => {
	const { setCurrentColor } = useColorStore()
	const [selectedColor, setSelectedColor] = useState<TColorValues>(colors.pink)

	const availableColors = [
		colors.pink,
		colors.blue,
		colors.green,
		colors.purple,
	]

	const onColorChange = (color: TColorValues) => {
		setSelectedColor(color)
		setCurrentColor(color)
	}

	return (
		<div className='flex gap-x-1 mb-4'>
			{availableColors.map(color => (
				<div key={color + 'radio'}>
					<input
						type='radio'
						name='color'
						id={color + 'radio'}
						onChange={() => onColorChange(color)}
						className='hidden'
						checked={selectedColor === color}
					/>
					<label
						htmlFor={color + 'radio'}
						style={{ backgroundColor: color }}
						className={`rounded-full w-10 h-10 overflow-hidden transition-all border border-solid block cursor-pointer
							${selectedColor === color ? 'border-white' : 'border-transparent opacity-50'}`}
					/>
				</div>
			))}
		</div>
	)
}

export default ColorPicker
