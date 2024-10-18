import { useEffect, useState, FC } from 'react'
import Ability from './Ability'
import { supabase } from '@/utils/supabase/client'
import { useConsoleStore } from '@/store/console.store'
import { useRoomStore } from '@/store/room.store'
import { Spinner } from '@nextui-org/react'
import { useGameStore } from '@/store/game.store'
import { User } from '@supabase/supabase-js'
import { colors, TColorValues, useColorStore } from '@/store/colors.store'

interface AbilityData {
	ability: string
	color: string
	isUsed: boolean
	player?: User | null
}

interface AssignedAbility extends AbilityData {
	component: FC<{ color: string; className?: string }>
}

const Abilities = () => {
	const { user } = useGameStore()
	const { roomName } = useRoomStore()
	const { addConsoleMessage } = useConsoleStore()
	const [isLoading, setIsLoading] = useState(true)
	const [assignedAbilities, setAssignedAbilities] = useState<AssignedAbility[]>(
		[]
	)

	const { setCurrentColor } = useColorStore()

	const abilityComponents: {
		[key: string]: FC<{ color: string; className?: string }>
	} = {
		Any: Ability.Any,
		Repeat: Ability.Repeat,
		Branch: Ability.Branch,
		Double: Ability.Double,
	}

	// Получаем способности из БД
	const fetchAbilities = async () => {
		if (!roomName || !user?.id) return
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
						Ошибка загрузки способностей: {error.message}
					</span>
				)
				return
			}

			if (data?.abilities_colors) {
				const abilities: AssignedAbility[] = data.abilities_colors.map(
					(ability: AbilityData) => ({
						...ability,
						component: abilityComponents[ability.ability],
					})
				)
				setAssignedAbilities(abilities)
			}
		} catch (err) {
			console.error('Ошибка загрузки способностей:', err)
			addConsoleMessage(
				<span className='text-warning'>
					Ошибка загрузки данных способностей
				</span>
			)
		} finally {
			setIsLoading(false)
		}
	}

	// Обновляем способности в БД
	const updateAbilitiesInDB = async (abilities: AbilityData[]) => {
		try {
			const { error } = await supabase
				.from('rooms')
				.update({ abilities_colors: abilities })
				.eq('name', roomName)

			if (error) {
				addConsoleMessage(
					<span className='text-danger'>
						Ошибка обновления в базе данных: {error.message}
					</span>
				)
			} else {
				addConsoleMessage(
					<span className='text-success'>Способности успешно обновлены</span>
				)
			}
		} catch (err) {
			console.error('Ошибка обновления способностей:', err)
			addConsoleMessage(
				<span className='text-danger'>Непредвиденная ошибка</span>
			)
		}
	}

	// Привязка пользователя к рандомной спосбоности
	const assignRandomAbility = async () => {
		if (assignedAbilities.some(ability => ability.player?.id === user?.id)) {
			addConsoleMessage(
				<span className='text-danger'>
					Для игрока уже присвоена способность
				</span>
			)
			return
		}

		const availableAbilities = assignedAbilities.filter(
			ability => !ability.isUsed
		)

		if (availableAbilities.length === 0) {
			addConsoleMessage(
				<span className='text-danger'>
					Нет доступных способностей для присвоения игроку
				</span>
			)
			return
		}

		const randomAbility =
			availableAbilities[Math.floor(Math.random() * availableAbilities.length)]

		setCurrentColor(randomAbility.color as TColorValues)

		const updatedAbilities = assignedAbilities.map(ability =>
			ability === randomAbility
				? { ...ability, isUsed: false, player: user }
				: ability
		)

		setAssignedAbilities(updatedAbilities)
		await updateAbilitiesInDB(
			updatedAbilities.map(({ component, ...rest }) => rest)
		)
	}

	// Переключаем статус способности
	const toggleAbilityUsage = async (abilityName: string) => {
		const updatedAbilities = assignedAbilities.map(ability =>
			ability.ability === abilityName && ability.player?.id === user?.id
				? { ...ability, isUsed: !ability.isUsed }
				: ability
		)

		setAssignedAbilities(updatedAbilities)
		await updateAbilitiesInDB(
			updatedAbilities.map(({ component, ...rest }) => rest)
		)
	}

	// Real-time подписка на обновление в БД
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
					const updatedAbilities: AssignedAbility[] =
						payload.new.abilities_colors.map((ability: AbilityData) => ({
							...ability,
							component: abilityComponents[ability.ability],
						}))

					setAssignedAbilities(prevAbilities => {
						if (
							JSON.stringify(prevAbilities) !== JSON.stringify(updatedAbilities)
						) {
							addConsoleMessage(
								<span>Статус способностей обновлен в реальном времени</span>
							)
							return updatedAbilities
						}
						return prevAbilities
					})
				}
			)
			.subscribe()

		return () => {
			supabase.removeChannel(channel)
		}
	}, [roomName])

	useEffect(() => {
		fetchAbilities()
	}, [roomName, user?.id])

	useEffect(() => {
		// This effect will only run when assignedAbilities or user is updated
		if (assignedAbilities.length > 0 && user?.id) {
			const userAbility = assignedAbilities.find(
				ability => ability.player?.id === user.id
			)
			setCurrentColor((userAbility?.color as TColorValues) || colors.pink)
		}
	}, [assignedAbilities, user?.id])

	return (
		<div className='flex flex-col gap-y-3 w-full'>
			{isLoading ? (
				<Spinner />
			) : (
				<>
					<div className='grid grid-cols-4 gap-x-3'>
						{assignedAbilities.map(
							(
								{ ability, component: AbilityComponent, color, isUsed, player },
								index
							) => (
								<div key={index} className='flex flex-col'>
									<input
										type='checkbox'
										id={color}
										name={color}
										checked={isUsed}
										onChange={() => toggleAbilityUsage(ability)}
										className='hidden peer'
										disabled={player?.id !== user?.id}
									/>
									<label
										htmlFor={color}
										className={`peer-checked:opacity-30 cursor-pointer transition-opacity rounded-xl overflow-hidden ${
											player?.id !== user?.id
												? 'pointer-events-none'
												: 'pointer-events-auto'
										}`}
									>
										<AbilityComponent color={color} className='w-full h-full' />
									</label>
									<div className='flex flex-col text-sm'>
										<span>{player?.user_metadata.full_name}</span>
										<span>{player?.email}</span>
									</div>
								</div>
							)
						)}
					</div>

					<button
						onClick={assignRandomAbility}
						className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
					>
						Assign Random Ability to Player
					</button>
				</>
			)}
		</div>
	)
}

export default Abilities
