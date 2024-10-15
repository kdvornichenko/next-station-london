'use client'

import React, {
	CSSProperties,
	Suspense,
	useContext,
	useEffect,
	useRef,
} from 'react'

import Map from '@/components/Map/Map'
import { UserContext } from '../providers'
import Loading from '../loading'
import { TColorValues, useColorStore } from '@/store/colors.store'
import SettingsPanel from '@/components/SettingsPanel'
import { useRoomStore } from '@/store/room.store'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/utils/supabase/client'
import GameDashboard from '@/components/GameDashboard'
import ControlPanel from '@/components/ControlPanel'
import { useConsoleStore } from '@/store/console.store'
import { useGameStore } from '@/store/game.store'
// Определяем тип для CSS-переменной
interface CustomCSSProperties extends CSSProperties {
	'--nsl-current-color'?: TColorValues | null
}

export default function Game() {
	const userContext = useContext(UserContext)
	const { currentColor } = useColorStore()
	const { roomName, setRoomName } = useRoomStore()
	const searchParams = useSearchParams()
	const isInitialMount = useRef(true)
	const hasFetchedRoomData = useRef(false)
	const { addConsoleMessage } = useConsoleStore()
	const { setUserId } = useGameStore()

	// Проверяем, инициализирован ли контекст
	if (!userContext) {
		return <Loading />
	}

	// Получение кода комнаты из адресной строки
	useEffect(() => {
		if (isInitialMount.current) {
			isInitialMount.current = false

			if (!roomName) {
				addConsoleMessage(
					<span className='text-warning'>
						Код комнаты не найден, проверка наличия кода в адресной строке...
					</span>
				)
				const roomNameFromSearch = searchParams.get('room_name')
				if (roomNameFromSearch) {
					setRoomName(roomNameFromSearch)
					addConsoleMessage(
						<span className='text-warning'>
							Код комнаты в адресной строке найден и установлен в Zustand Store:{' '}
							{roomNameFromSearch}
						</span>
					)
				} else {
					addConsoleMessage(
						<span className='text-danger'>
							Код комнаты не найден в адресной строке.
						</span>
					)
				}
			} else {
				addConsoleMessage(
					<span className='text-success'>
						Установлен код комнаты из Zustand Store: {roomName}
					</span>
				)
			}
		}
	}, [])

	// useEffect для обработки комнаты и игрока
	useEffect(() => {
		const checkSession = async () => {
			// Получаем текущую сессию
			const {
				data: { session },
				error,
			} = await supabase.auth.getSession()

			if (error || !session) {
				addConsoleMessage(
					<span className='text-danger'>Пользователь не авторизован</span>
				)
				return
			}

			const user = session.user

			setUserId(user.id)

			// Проверяем наличие комнаты и загружаем данные о комнате
			if (roomName && !hasFetchedRoomData.current) {
				hasFetchedRoomData.current = true

				addConsoleMessage(
					<span className='text-warning'>
						Получение данных о комнате из Supabase: {roomName}
					</span>
				)

				const fetchData = async () => {
					try {
						// Получаем данные о комнате
						const { data: roomData, error: roomError } = await supabase
							.from('rooms')
							.select('name, players')
							.eq('name', roomName)
							.single()

						if (roomError || !roomData) {
							console.error('Error fetching room:', roomError?.message)
							addConsoleMessage(
								<span>
									Ошибка получения комнаты:
									<span className='text-danger'> {roomError?.message}</span>
								</span>
							)
							return
						}

						// Проверяем, если пользователь уже есть в списке игроков
						const players = roomData.players || []
						const isPlayerInRoom = players.includes(user.id)

						if (isPlayerInRoom) {
							addConsoleMessage(
								<span className='text-success'>
									Игрок уже находится в комнате
								</span>
							)
						} else {
							// Если пользователя нет в списке, добавляем его UUID
							players.push(user.id)

							const { error: updateError } = await supabase
								.from('rooms')
								.update({ players }) // Обновляем массив players
								.eq('name', roomName)

							if (updateError) {
								console.error('Error updating players:', updateError.message)
								addConsoleMessage(
									<span>
										Ошибка добавления игрока в массив players:
										<span className='text-danger'> {updateError.message}</span>
									</span>
								)
								return
							}

							addConsoleMessage(
								<span className='text-success'>
									Игрок успешно добавлен в комнату
								</span>
							)
						}
					} catch (err) {
						console.error('Unexpected error fetching room:', err)
						addConsoleMessage(
							<span className='text-warning'>
								Непредвиденная ошибка, сообщение в консоли
							</span>
						)
					}
				}

				fetchData()
			}
		}

		checkSession()
	}, [roomName])

	// Стили для переключени цвета тени
	const gridStyles: CustomCSSProperties = {
		...(currentColor ? { '--nsl-current-color': currentColor } : {}),
	}

	return (
		<Suspense fallback={<Loading />}>
			<div className='h-full' style={gridStyles}>
				<div className='grid [grid-template-columns:_3fr_6fr_3fr] p-4 h-full'>
					<GameDashboard />

					<Map />
					{/* Правый сайдбар */}
					<ControlPanel />
				</div>
			</div>
		</Suspense>
	)
}
