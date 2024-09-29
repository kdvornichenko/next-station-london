import { FC } from 'react'
import { IMaskInput } from 'react-imask'

type TScoreInput = {
	x: number
	y: number
	onChange?: (value: number) => void
}

const ScoreInput: FC<TScoreInput> = ({ x, y, onChange }) => {
	return (
		<foreignObject x={x} y={y} width={44} height={40}>
			<IMaskInput
				mask={Number}
				unmask={true}
				placeholder='0'
				inputMode='numeric'
				className='score-field'
				onAccept={(value: string) => {
					if (!onChange) return

					const numericValue = Number(value)
					if (!isNaN(numericValue)) {
						onChange(numericValue)
					}
				}}
			/>
		</foreignObject>
	)
}

export default ScoreInput
