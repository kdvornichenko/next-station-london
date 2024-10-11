import React, { useEffect, useState } from 'react'
import styles from '@/styles/main.module.scss'
import Card from './Card'
import { startColorSwitcher } from '@/utils/colorSwitcher'
import { useColorStore } from '@/store/colors.store'
import {
	Card as NextUICard,
	Button,
	CardBody,
	CardFooter,
	CardHeader,
	Divider,
} from '@nextui-org/react'
import Abilities from './abilities'
import { useConsoleStore } from '@/store/console.store'
import { supabase } from '@/utils/supabase/client'
import { useRoomStore } from '@/store/room.store'

const GameDashboard = () => {
	const [usedCards, setUsedCards] = useState<string[]>([])
	const [selectedCards, setSelectedCards] = useState<JSX.Element[]>([])
	const [availableCards, setAvailableCards] = useState<JSX.Element[]>([])
	const [redCardsCounter, setRedCardsCounter] = useState<number>(0)
	const [roundsCounter, setRoundsCounter] = useState<number>(1)
	const [isRoundOver, setIsRoundOver] = useState<boolean>(false)
	const [isGameOver, setIsGameOver] = useState<boolean>(false)
	const [userId, setUserId] = useState<string | null>(null)
	const [isCreator, setIsCreator] = useState<boolean>(false)
	const { setCurrentColor } = useColorStore()
	const { addConsoleMessage } = useConsoleStore()
	const { roomName } = useRoomStore()

	const allCardNames = [
		'Branch',
		'Blue.Any',
		'Blue.Circle',
		'Blue.Rectangle',
		'Blue.Triangle',
		'Red.Any',
		'Red.Circle',
		'Red.Pentagon',
		'Red.Rectangle',
		'Red.Triangle',
	]

	const getCardComponentByName = (cardName: string): JSX.Element | null => {
		const [color, type] = cardName.includes('.')
			? cardName.split('.')
			: [cardName, null]

		switch (color) {
			case 'Branch':
				return <Card.Branch />
			case 'Blue': {
				if (type && type in Card.Blue) {
					const Component = Card.Blue[type as keyof typeof Card.Blue]
					return <Component />
				} else {
					console.error(`Неизвестный тип карты для Blue: ${type}`)
					return null
				}
			}
			case 'Red': {
				if (type && type in Card.Red) {
					const Component = Card.Red[type as keyof typeof Card.Red]
					return <Component data-card-red />
				} else {
					console.error(`Неизвестный тип карты для Red: ${type}`)
					return null
				}
			}
			default:
				console.error(`Неизвестное имя карты: ${cardName}`)
				return null
		}
	}

	// Подписка на изменения в Supabase
	useEffect(() => {
		const subscribeToRoomChanges = async () => {
			if (!roomName) return

			const channel = supabase
				.channel('update')
				.on(
					'postgres_changes',
					{
						event: '*',
						schema: 'public',
						table: 'rooms',
						filter: `name=eq.${roomName}`,
					},
					payload => {
						console.log('Change received!', payload)

						if (payload.eventType === 'UPDATE') {
							// Обновляем раунд
							if (payload.new.round) {
								setRoundsCounter(payload.new.round)
								addConsoleMessage(
									<span>Раунд обновлен: {payload.new.round}</span>
								)
							}

							// Обновляем использованные карты
							if (payload.new.used_cards) {
								setUsedCards(payload.new.used_cards)

								const mappedCards: (JSX.Element | null)[] =
									payload.new.used_cards.map(getCardComponentByName)
								const newSelectedCards = mappedCards.filter(
									(card): card is JSX.Element => card !== null
								)

								setSelectedCards(newSelectedCards)

								// Обновляем доступные карты
								const newAvailableCardNames = allCardNames.filter(
									cardName => !payload.new.used_cards.includes(cardName)
								)
								const newAvailableCards = newAvailableCardNames
									.map(getCardComponentByName)
									.filter((card): card is JSX.Element => card !== null)
								setAvailableCards(newAvailableCards)

								addConsoleMessage(
									<span>
										Использованные карты обновлены:{' '}
										{payload.new.used_cards.join(', ')}
									</span>
								)
							}
						}
					}
				)
				.subscribe()

			return () => {
				supabase.removeChannel(channel)
			}
		}

		subscribeToRoomChanges()

		// Получение сессии пользователя
		const checkSession = async () => {
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

			setUserId(session.user.id)
		}

		checkSession()

		// Fetch initial data
		const fetchRoomData = async () => {
			if (!roomName || !userId) return // Проверяем наличие userId перед выполнением

			try {
				const { data: roomData, error } = await supabase
					.from('rooms')
					.select('used_cards, round, created_by')
					.eq('name', roomName)
					.single()

				if (error) {
					addConsoleMessage(
						<span className='text-danger'>
							Ошибка получения карт: {error.message}
						</span>
					)
					return
				}

				// Установка isCreator после того, как userId доступен
				setIsCreator(roomData.created_by === userId)

				// Обновляем раунд
				setRoundsCounter(roomData.round || 1)

				// Обновляем выбранные карты
				setUsedCards(roomData.used_cards || [])

				const mappedCards: (JSX.Element | null)[] = roomData.used_cards.map(
					getCardComponentByName
				)
				const newSelectedCards = mappedCards.filter(
					(card): card is JSX.Element => card !== null
				)

				setSelectedCards(newSelectedCards)

				// Обновляем доступные карты
				const newAvailableCardNames = allCardNames.filter(
					cardName => !roomData.used_cards.includes(cardName)
				)
				const newAvailableCards = newAvailableCardNames
					.map(getCardComponentByName)
					.filter((card): card is JSX.Element => card !== null)
				setAvailableCards(newAvailableCards)
			} catch (err) {
				console.error('Unexpected error fetching room data:', err)
				addConsoleMessage(
					<span className='text-warning'>Ошибка загрузки данных комнаты</span>
				)
			}
		}

		if (userId) {
			fetchRoomData()
		}
	}, [roomName, userId])

	useEffect(() => {
		console.log(userId)
		console.log(isCreator)
	}, [userId])

	// Функция для атомарного добавления карты в used_cards
	const addCardToUsedCards = async (
		roomName: string,
		cardName: string
	): Promise<boolean> => {
		while (true) {
			// Шаг 1: Получаем текущее состояние used_cards и updated_at
			const { data, error } = await supabase
				.from('rooms')
				.select('used_cards, updated_at')
				.eq('name', roomName)
				.single()

			if (error) {
				addConsoleMessage(
					<span className='text-danger'>
						Ошибка получения использованных карт: {error.message}
					</span>
				)
				return false
			}

			const currentUsedCards: string[] = data.used_cards || []
			const currentUpdatedAt = data.updated_at

			// Проверяем, не была ли карта уже использована
			if (currentUsedCards.includes(cardName)) {
				addConsoleMessage(
					<span className='text-warning'>
						Карта {cardName} уже использована
					</span>
				)
				return false
			}

			// Шаг 2: Добавляем новую карту к локальной копии used_cards
			const newUsedCards = [...currentUsedCards, cardName]

			// Шаг 3: Пытаемся обновить запись в базе данных с условием eq на updated_at
			const { error: updateError } = await supabase
				.from('rooms')
				.update({ used_cards: newUsedCards })
				.eq('name', roomName)
				.eq('updated_at', currentUpdatedAt)

			if (updateError) {
				// Если произошла ошибка, проверяем, не связано ли это с несоответствием условия
				if (
					updateError.code === 'PGRST116' ||
					updateError.message.includes('No rows')
				) {
					// Это означает, что условие eq не выполнено, нужно повторить попытку
					continue
				} else {
					// Иная ошибка
					addConsoleMessage(
						<span className='text-danger'>
							Ошибка обновления использованных карт: {updateError.message}
						</span>
					)
					return false
				}
			}

			// Обновление успешно
			return true
		}
	}

	// Выбор новой карты
	const onCardAreaClick = async () => {
		if (availableCards.length === 0 || !roomName) return

		const randomIndex = Math.floor(Math.random() * availableCards.length)
		const randomCard = availableCards[randomIndex]

		// Определяем, является ли карта красной
		const isRedCard = randomCard.props && randomCard.props['data-card-red']

		// Формируем имя карты с префиксом цвета
		const cardName = (() => {
			if (randomCard.type.name === 'Branch') return 'Branch'
			const color = isRedCard ? 'Red' : 'Blue'
			const typeName = randomCard.type.name
			return `${color}.${typeName}`
		})()

		// Атомарно добавляем карту в used_cards
		const success = await addCardToUsedCards(roomName, cardName)

		if (!success) {
			// Если не удалось добавить карту, выходим из функции
			return
		}

		addConsoleMessage(
			<span>
				Выпала карта:{' '}
				<span className={isRedCard ? 'text-card-red' : 'text-card-blue'}>
					{cardName}
				</span>
			</span>
		)

		// Обновляем локальное состояние
		setUsedCards(prevUsedCards => [...prevUsedCards, cardName])
		setSelectedCards(prevSelectedCards => [...prevSelectedCards, randomCard])

		// Убираем карту из доступных
		setAvailableCards(prevAvailableCards =>
			prevAvailableCards.filter((_, index) => index !== randomIndex)
		)

		// Увеличиваем счётчик, если карта красная
		if (isRedCard) {
			setRedCardsCounter(prev => prev + 1)
		}
	}

	// Сброс карт и обновление раунда
	const refreshCards = async () => {
		if (!isRoundOver) return

		const newRound = roundsCounter + 1
		setRoundsCounter(newRound)

		const { error } = await supabase
			.from('rooms')
			.update({ round: newRound, used_cards: [] })
			.eq('name', roomName)

		if (error) {
			addConsoleMessage(
				<span className='text-danger'>
					Ошибка обновления раунда и сброса карт
				</span>
			)
			return
		}

		// Обновляем локальные состояния
		setUsedCards([])
		setSelectedCards([])
		setAvailableCards(
			allCardNames
				.map(getCardComponentByName)
				.filter((card): card is JSX.Element => card !== null)
		)
		setRedCardsCounter(0)
		setIsRoundOver(false)

		addConsoleMessage(<span>Раунд {newRound} начался</span>)
	}

	// Отслеживание конца раунда
	useEffect(() => {
		if (redCardsCounter === 5) {
			setIsRoundOver(true)
			addConsoleMessage(<span>Раунд {roundsCounter} завершен</span>)
		}
	}, [redCardsCounter])

	// Отслеживание конца игры
	useEffect(() => {
		if (roundsCounter === 5) {
			setIsGameOver(true)
		}
	}, [roundsCounter])

	// Конец игры
	useEffect(() => {
		if (!isGameOver) return

		const stopSwitching = startColorSwitcher(color => {
			setCurrentColor(color)
		}, 500)

		return () => stopSwitching()
	}, [isGameOver])

	return (
		<NextUICard
			className={`card shadow-current-color rounded-3xl max-w-[610px]`}
			radius='none'
		>
			<CardHeader>
				<Abilities />
			</CardHeader>

			<Divider />

			<CardBody>
				<div className={styles.cards__selected}>
					{selectedCards.map((card, index) => (
						<React.Fragment key={index}>{card}</React.Fragment>
					))}
					<div
						className={`w-full max-w-sm aspect-video m-auto border-2 border-dashed border-slate-400 rounded-2xl cursor-pointer transition-all hover:border-solid hover:border-slate-50 ${
							(isRoundOver || isGameOver || !isCreator) &&
							'pointer-events-none opacity-0'
						}`}
						onClick={onCardAreaClick}
					/>
				</div>
			</CardBody>

			<Divider />

			<CardFooter className='justify-between'>
				{isGameOver ? 'Game Over' : `Раунд ${roundsCounter}`}
				{isCreator && !isGameOver && (
					<Button
						onClick={refreshCards}
						color='secondary'
						className={
							isRoundOver
								? 'pointer-events-auto'
								: 'pointer-events-none opacity-50'
						}
					>
						Обновить
					</Button>
				)}
			</CardFooter>
		</NextUICard>
	)
}

export default GameDashboard
