import { FC } from 'react'
import { IMaskInput } from 'react-imask'

type TMapScoreInput = {
	onChange: (value: number) => void
}

const MapScoreInput: FC<TMapScoreInput> = ({ onChange }) => {
	return (
		<IMaskInput
			mask={Number}
			unmask={true}
			placeholder='0'
			inputMode='numeric'
			className='w-full h-full text-center text-black text-2xl content-center bg-white'
			onAccept={(value: string) => {
				const numericValue = Number(value)
				if (!isNaN(numericValue)) {
					onChange(numericValue)
				}
			}}
		/>
	)
}

export default MapScoreInput
