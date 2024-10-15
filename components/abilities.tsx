import { useEffect, useState } from 'react'
import Ability from './Ability'
import { supabase } from '@/utils/supabase/client'
import { useConsoleStore } from '@/store/console.store'
import { useRoomStore } from '@/store/room.store'
import { colors } from '@/store/colors.store'
import { Spinner } from '@nextui-org/react'

const Abilities = () => {
	const defaultColors = [colors.pink, colors.blue, colors.green, colors.purple]

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
			isUsed: boolean
		}[]
	>([])

	const [isLoading, setIsLoading] = useState<boolean>(true)

	const { roomName } = useRoomStore()
	const { addConsoleMessage } = useConsoleStore()

	// Загрузка цветов способностей из таблицы
	const fetchAbilityColors = async () => {
		if (!roomName) return

		setIsLoading(true)

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

			if (data.abilities_colors) {
				const loadedColors = data.abilities_colors.map(
					(ability: { ability: string; color: string; isUsed: boolean }) => ({
						ability: abilities.find(a => a.name === ability.ability)
							?.component as React.FC<{ color: string }>,
						color: ability.color,
						isUsed: ability.isUsed, // Загружаем статус isUsed из базы данных
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

		setIsLoading(false)
	}

	// Функция для присвоения цветов способностям
	const assignColorsToAbilities = () => {
		let availableColors = [...defaultColors]
		availableColors.sort(() => Math.random() - 0.5)

		const assigned = abilities.map((ability, index) => ({
			ability: ability.component,
			color: availableColors[index],
			isUsed: false, // Устанавливаем isUsed по умолчанию
		}))

		setAssignedColors(assigned)
	}

	// Функция для обновления цветов в таблице и их синхронизации
	const refreshColors = async () => {
		let shuffledColors = [...defaultColors]
		shuffledColors.sort(() => Math.random() - 0.5)

		const updatedAssignedColors = abilities.map((ability, index) => ({
			ability: ability.component,
			color: shuffledColors[index],
			isUsed: false, // Сбрасываем isUsed при обновлении цветов
		}))

		setAssignedColors(updatedAssignedColors)

		// Обновляем цвета в базе данных
		const updatedColorsForDB = abilities.map((ability, index) => ({
			ability: ability.name,
			color: shuffledColors[index],
			isUsed: false, // Сбрасываем isUsed
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

	// Функция для отправки checked статуса и обновления isUsed
	const toggleAbilityUsed = async (abilityName: string) => {
		if (!roomName) return

		// Обновляем локально
		const updatedAssignedColors = assignedColors.map(assigned => ({
			...assigned,
			isUsed:
				abilities.find(a => a.component === assigned.ability)?.name ===
				abilityName
					? !assigned.isUsed
					: assigned.isUsed,
		}))

		setAssignedColors(updatedAssignedColors)

		// Обновляем в базе данных
		const updatedColorsForDB = updatedAssignedColors.map(assigned => ({
			ability: abilities.find(a => a.component === assigned.ability)?.name,
			color: assigned.color,
			isUsed: assigned.isUsed,
		}))

		try {
			const { error } = await supabase
				.from('rooms')
				.update({ abilities_colors: updatedColorsForDB })
				.eq('name', roomName)

			if (error) {
				addConsoleMessage(
					<span className='text-danger'>
						Ошибка обновления статуса в базе данных: {error.message}
					</span>
				)
			} else {
				addConsoleMessage(
					<span className='text-success'>Статус способностей обновлён</span>
				)
			}
		} catch (err) {
			addConsoleMessage(<span className='text-danger'>Ошибка обновления</span>)
		}
	}

	// Подписка на изменения в статусе isUsed для всех пользователей
	useEffect(() => {
		if (!roomName) return

		const channel = supabase
			.channel('public:rooms')
			.on(
				'postgres_changes',
				{
					event: 'UPDATE',
					schema: 'public',
					table: 'rooms',
					filter: `name=eq.${roomName}`,
				},
				payload => {
					const updatedColors = payload.new.abilities_colors.map(
						(ability: { ability: string; color: string; isUsed: boolean }) => ({
							ability: abilities.find(a => a.name === ability.ability)
								?.component as React.FC<{ color: string }>,
							color: ability.color,
							isUsed: ability.isUsed,
						})
					)

					// Функция для сравнения текущих данных с новыми
					const isEqual = (
						arr1: typeof assignedColors,
						arr2: typeof assignedColors
					) => {
						if (arr1.length !== arr2.length) return false
						for (let i = 0; i < arr1.length; i++) {
							if (
								arr1[i].color !== arr2[i].color ||
								arr1[i].isUsed !== arr2[i].isUsed
							) {
								return false
							}
						}
						return true
					}

					// Сравниваем новые данные с текущим состоянием
					if (!isEqual(assignedColors, updatedColors)) {
						setAssignedColors(updatedColors)
						addConsoleMessage(
							<span>Статус способностей обновлен в реальном времени</span>
						)
					}
				}
			)
			.subscribe()

		return () => {
			supabase.removeChannel(channel)
		}
	}, [roomName, assignedColors])

	// Загрузка цветов при подключении
	useEffect(() => {
		fetchAbilityColors()
	}, [roomName])

	return (
		<div className='flex flex-col gap-y-3 w-full'>
			{isLoading ? (
				<Spinner />
			) : (
				<>
					<div className='grid grid-flow-col gap-x-3'>
						{assignedColors.map(
							({ ability: AbilityComponent, color, isUsed }, index) => (
								<div key={index} className='rounded-xl overflow-hidden'>
									<input
										type='checkbox'
										id={color}
										name={color}
										checked={isUsed}
										onChange={() =>
											toggleAbilityUsed(
												abilities.find(a => a.component === AbilityComponent)
													?.name || ''
											)
										}
										className='hidden peer'
									/>
									<label
										htmlFor={color}
										className='peer-checked:opacity-30 cursor-pointer transition-opacity'
									>
										<AbilityComponent
											color={color}
											className='w-full h-full '
										/>
									</label>
								</div>
							)
						)}
					</div>

					{/* Кнопка для обновления цветов */}
					<button
						onClick={refreshColors}
						className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
					>
						Refresh Colors
					</button>
				</>
			)}
		</div>
	)
}

export default Abilities
