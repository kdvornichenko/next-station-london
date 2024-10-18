import { FC } from 'react'
import { colors,  useColorStore } from '@/store/colors.store'

type TColorPicker = {
	className?: string
}

const ColorPicker: FC<TColorPicker> = ({ className }) => {
	const { setCurrentColor, currentColor } = useColorStore()

	const availableColors = [
		colors.pink,
		colors.blue,
		colors.green,
		colors.purple,
	]

	return (
		<div className={`flex gap-x-1 ${className || ''}`}>
			{availableColors.map(color => (
				<div key={color + 'radio'}>
					<input
						type='radio'
						name='color'
						id={color + 'radio'}
						onChange={() => setCurrentColor(color)}
						value={color}
						className='hidden'
						checked={currentColor === color}
					/>
					<label
						htmlFor={color + 'radio'}
						style={{ backgroundColor: color }}
						className={`rounded-full w-10 h-10 overflow-hidden transition-all border border-solid block cursor-pointer
							${currentColor === color ? 'border-white' : 'border-transparent opacity-50'}`}
					/>
				</div>
			))}
		</div>
	)
}

export default ColorPicker
