import { useEffect, useState } from 'react'
import Ability from './Ability'

const Abilities = () => {
	const [colors] = useState<string[]>([
		'#ED127B',
		'#00ADEF',
		'#40B93C',
		'#602F93',
	])

	const [abilities] = useState<React.FC<{ color: string }>[]>([
		Ability.Any,
		Ability.Repeat,
		Ability.Branch,
		Ability.Double,
	])

	const [assignedColors, setAssignedColors] = useState<
		{
			ability: React.FC<{ color: string; className: string }>
			color: string
		}[]
	>([])

	const assignColorsToAbilities = () => {
		let availableColors = [...colors]
		availableColors.sort(() => Math.random() - 0.5)

		const assigned = abilities.map((ability, index) => ({
			ability: ability,
			color: availableColors[index],
		}))

		setAssignedColors(assigned)
	}

	useEffect(() => {
		assignColorsToAbilities()
	}, [colors, abilities])

	return (
		<section className='grid grid-flow-col gap-x-3'>
			{assignedColors.map(({ ability: AbilityComponent, color }, index) => (
				<div key={index} className='rounded-xl overflow-hidden'>
					<input
						type='checkbox'
						id={color}
						name={color}
						className='hidden peer'
					/>
					<label
						htmlFor={color}
						className='peer-checked:opacity-30 cursor-pointer transition-opacity'
					>
						<AbilityComponent color={color} className='w-full h-full ' />
					</label>
				</div>
			))}
		</section>
	)
}

export default Abilities
