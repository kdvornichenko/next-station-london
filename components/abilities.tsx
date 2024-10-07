import { useEffect, useState } from 'react'
import styles from '@/styles/main.module.scss'
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
		{ ability: React.FC<{ color: string }>; color: string }[]
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
		<section className=''>
			{assignedColors.map(({ ability: AbilityComponent, color }, index) => (
				<div key={index} className={styles.card__ability}>
					<input type='checkbox' id={color} name={color} />
					<label htmlFor={color}>
						<AbilityComponent color={color} />
					</label>
				</div>
			))}
		</section>
	)
}

export default Abilities
