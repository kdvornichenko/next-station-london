import { useState } from 'react'
import { colors, TColorValues } from '@/store/colors.store'
import { useSetStations } from '@/store/stations.store'

const ColorPicker = () => {
	const { setCurrentColor } = useSetStations()
	const [selectedColor, setSelectedColor] = useState<TColorValues>(colors.pink)

	const onColorChange = (color: TColorValues) => {
		setSelectedColor(color)
		setCurrentColor(color)
	}

	return (
		<div className='flex gap-x-1 mb-4'>
			{Object.values(colors).map(color => {
				if (
					color === colors.default ||
					color === colors.white ||
					color === colors.yellow
				)
					return null
				return (
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
				)
			})}
		</div>
	)
}

export default ColorPicker
