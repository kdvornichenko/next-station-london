import React, { useContext, useEffect } from 'react'
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
import Cards from './Cards/Cards'
import { allCardNames, useGameStore } from '@/store/game.store'
import { getCardComponentByName } from '@/utils/cards/getCardComponentByName'

const GameDashboard = () => {
	const {
		redCardsCounter,
		setRedCardsCounter,
		roundsCounter,
		setRoundsCounter,
		isRoundOver,
		setIsRoundOver,
		isGameOver,
		setIsGameOver,
		user,
		isCreator,
		setIsCreator,
		setSelectedCards,
		setAvailableCards,
		setIsCardsLoading,
	} = useGameStore()

	const { setCurrentColor } = useColorStore()
	const { addConsoleMessage } = useConsoleStore()
	const { roomName } = useRoomStore()

	useEffect(() => {
		setIsCardsLoading(true)
		const fetchRoomData = async () => {
			if (!roomName || !user?.id) return

			try {
				const { data: roomData, error } = await supabase
					.from('rooms')
					.select('used_cards, round, created_by, red_cards_count')
					.eq('name', roomName)
					.single()

				if (error) {
					addConsoleMessage(
						<span className='text-danger'>
							Ошибка получения данных комнаты: {error.message}
						</span>
					)
					return
				}

				// Устанавливаем данные комнаты
				setIsCreator(roomData.created_by === user.id)
				setRoundsCounter(roomData.round || 1)
				updateCards(roomData.used_cards)
				setRedCardsCounter(roomData.red_cards_count || 0)
			} catch (err) {
				console.error('Ошибка получения данных комнаты:', err)
				addConsoleMessage(
					<span className='text-warning'>Ошибка загрузки данных комнаты</span>
				)
			}
		}

		if (user?.id) {
			fetchRoomData()
		}
	}, [roomName, user])

	useEffect(() => {
		addConsoleMessage(
			<span>Счётчик красных карт обновлён: {redCardsCounter}</span>
		)
	}, [redCardsCounter])

	const updateCards = (usedCards: string[]) => {
		const mappedCards = usedCards
			.map(getCardComponentByName)
			.filter((card): card is JSX.Element => card !== null) // Фильтруем null значения

		setSelectedCards(mappedCards)

		const availableCardNames = allCardNames.filter(
			cardName => !usedCards.includes(cardName)
		)
		const availableCards = availableCardNames
			.map(getCardComponentByName)
			.filter((card): card is JSX.Element => card !== null) // Фильтруем null значения

		setAvailableCards(availableCards)

		setIsCardsLoading(false)
	}

	// Сброс карт и обновление раунда
	const refreshCards = async () => {
		if (!isRoundOver) return

		try {
			const { data: roomData, error } = await supabase
				.from('rooms')
				.select('abilities_colors')
				.eq('name', roomName)
				.single()

			if (error) {
				addConsoleMessage(
					<span className='text-danger'>
						Ошибка получения данных комнаты: {error.message}
					</span>
				)
				return
			} else {
				console.log(roomData)
			}
		} catch (err) {
			console.error('Ошибка получения данных комнаты:', err)
			addConsoleMessage(
				<span className='text-warning'>Ошибка загрузки данных комнаты</span>
			)
		}

		const newRound = roundsCounter + 1
		setRoundsCounter(newRound)

		const { error } = await supabase
			.from('rooms')
			.update({ round: newRound, used_cards: [], red_cards_count: 0 })
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
				<Cards />
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
