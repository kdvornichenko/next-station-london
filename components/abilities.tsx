import { useEffect, useState } from 'react'
import Ability from './Ability'
import { supabase } from '@/utils/supabase/client'
import { useConsoleStore } from '@/store/console.store'
import { useRoomStore } from '@/store/room.store'

const Abilities = () => {
	const defaultColors = ['#ED127B', '#00ADEF', '#40B93C', '#602F93']

	// Способности с дефолтными цветами
	const abilities: { name: string; component: React.FC<{ color: string }> }[] =
		[
			{ name: 'Any', component: Ability.Any },
			{ name: 'Repeat', component: Ability.Repeat },
			{ name: 'Branch', component: Ability.Branch },
			{ name: 'Double', component: Ability.Double },
		]

	const [assignedColors, setAssignedColors] = useState<
		{
			ability: React.FC<{ color: string; className: string }>
			color: string
		}[]
	>([])

	const { roomName } = useRoomStore()
	const { addConsoleMessage } = useConsoleStore()

	// Загрузка цветов способностей из таблицы
	const fetchAbilityColors = async () => {
		if (!roomName) return

		try {
			const { data, error } = await supabase
				.from('rooms')
				.select('abilities_colors')
				.eq('name', roomName)
				.single()

			if (error) {
				addConsoleMessage(
					<span className='text-danger'>
						Ошибка загрузки цветов способностей: {error.message}
					</span>
				)
				return
			}

			// Если цвета есть в базе, применяем их, если нет — используем дефолтные
			if (data.abilities_colors) {
				const loadedColors = data.abilities_colors.map(
					(ability: { ability: string; color: string }) => ({
						ability: abilities.find(a => a.name === ability.ability)
							?.component as React.FC<{ color: string }>,
						color: ability.color,
					})
				)
				setAssignedColors(loadedColors)
			} else {
				assignColorsToAbilities()
			}
		} catch (err) {
			console.error('Ошибка загрузки цветов способностей:', err)
			addConsoleMessage(
				<span className='text-warning'>
					Ошибка загрузки данных способностей
				</span>
			)
		}
	}

	// Функция для присвоения цветов способностям
	const assignColorsToAbilities = () => {
		let availableColors = [...defaultColors]
		availableColors.sort(() => Math.random() - 0.5)

		const assigned = abilities.map((ability, index) => ({
			ability: ability.component,
			color: availableColors[index],
		}))

		setAssignedColors(assigned)
	}

	// Обновление цветов в таблице после нажатия на кнопку
	const refreshColors = async () => {
		let shuffledColors = [...defaultColors]
		shuffledColors.sort(() => Math.random() - 0.5)

		const updatedAssignedColors = abilities.map((ability, index) => ({
			ability: ability.component,
			color: shuffledColors[index],
		}))

		setAssignedColors(updatedAssignedColors)

		// Сохраняем обновленные цвета в таблице
		const updatedColorsForDB = abilities.map((ability, index) => ({
			ability: ability.name,
			color: shuffledColors[index],
		}))

		try {
			const { error } = await supabase
				.from('rooms')
				.update({ abilities_colors: updatedColorsForDB })
				.eq('name', roomName)

			if (error) {
				addConsoleMessage(
					<span className='text-danger'>
						Ошибка обновления цветов в базе данных: {error.message}
					</span>
				)
			} else {
				addConsoleMessage(
					<span className='text-success'>
						Цвета способностей обновлены в базе данных
					</span>
				)
			}
		} catch (err) {
			console.error('Ошибка обновления цветов способностей:', err)
			addConsoleMessage(
				<span className='text-danger'>Непредвиденная ошибка</span>
			)
		}
	}

	// Подписка на обновления способностей в реальном времени
	useEffect(() => {
		if (!roomName) return

		const channel = supabase
			.channel('abilities-update')
			.on(
				'postgres_changes',
				{
					event: '*',
					schema: 'public',
					table: 'rooms',
					filter: `name=eq.${roomName}`,
				},
				payload => {
					if (payload.eventType === 'UPDATE') {
						const updatedColors = payload.new.abilities_colors.map(
							(ability: { ability: string; color: string }) => ({
								ability: abilities.find(a => a.name === ability.ability)
									?.component as React.FC<{ color: string }>,
								color: ability.color,
							})
						)
						setAssignedColors(updatedColors)
						addConsoleMessage(
							<span>Цвета способностей обновлены в реальном времени</span>
						)
					}
				}
			)
			.subscribe()

		return () => {
			supabase.removeChannel(channel)
		}
	}, [roomName])

	// Загрузка цветов при подключении
	useEffect(() => {
		fetchAbilityColors()
	}, [roomName])

	return (
		<section>
			<div className='grid grid-flow-col gap-x-3 mb-4'>
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
			</div>

			{/* Кнопка для обновления цветов */}
			<button
				onClick={refreshColors}
				className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
			>
				Refresh Colors
			</button>
		</section>
	)
}

export default Abilities
