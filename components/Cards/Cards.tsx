import { useConsoleStore } from '@/store/console.store'
import { allCardNames, useGameStore } from '@/store/game.store'
import { useRoomStore } from '@/store/room.store'
import styles from '@/styles/main.module.scss'
import { addCardToUsedCards } from '@/utils/cards/addCardToUsed'
import React, { useEffect, useState } from 'react'
import { Database } from '@/types/database.types'
import { supabase } from '@/utils/supabase/client'
import { getCardComponentByName } from '@/utils/cards/getCardComponentByName'
import { Spinner } from '@nextui-org/react'

type Room = Database['public']['Tables']['rooms']['Row']

const Cards = () => {
	const {
		isRoundOver,
		isGameOver,
		isCreator,
		availableCards,
		setAvailableCards,
		redCardsCounter,
		setRedCardsCounter,
		setRoundsCounter,
		selectedCards,
		setSelectedCards,
		userId,
		isCardsLoading,
	} = useGameStore()
	const { roomName } = useRoomStore()
	const { addConsoleMessage } = useConsoleStore()
	const [isNewCardLoading, setIsNewCardLoading] = useState<boolean>()

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
	}

	useEffect(() => {
		const subscribeToRoomChanges = async () => {
			if (!roomName || !userId) return

			const updateRoomData = (payload: { new: Room }) => {
				// Обновляем раунд
				if (payload.new.round) {
					setRoundsCounter(payload.new.round)
				}

				// Обновляем использованные и доступные карты
				if (payload.new.used_cards) {
					updateCards(payload.new.used_cards)
					addConsoleMessage(
						<span>
							Использованные карты обновлены:{' '}
							{payload.new.used_cards.join(', ')}
						</span>
					)
				}

				// Обновляем счётчик красных карт
				if (payload.new.red_cards_count !== undefined) {
					setRedCardsCounter(payload.new.red_cards_count)
				}
			}

			const channel = supabase
				.channel('update')
				.on(
					'postgres_changes',
					{
						event: 'UPDATE',
						schema: 'public',
						table: 'rooms',
						filter: `name=eq.${roomName}`,
					},
					updateRoomData
				)
				.subscribe()

			return () => {
				supabase.removeChannel(channel)
			}
		}

		subscribeToRoomChanges()
	}, [roomName])

	// Выбор новой карты
	const onCardAreaClick = async () => {
		if (availableCards.length === 0 || !roomName) return

		setIsNewCardLoading(true)

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

		// Атомарно добавляем карту в used_cards и обновляем счётчик красных карт
		const success = await addCardToUsedCards(
			roomName,
			cardName,
			isRedCard,
			addConsoleMessage
		)

		if (!success) {
			setIsNewCardLoading(false)
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
		setSelectedCards([...selectedCards, randomCard])

		// Убираем карту из доступных
		setAvailableCards(
			availableCards.filter((_, index) => index !== randomIndex)
		)

		// Увеличиваем счётчик, если карта красная
		if (isRedCard) {
			setRedCardsCounter(redCardsCounter + 1)
		}

		setIsNewCardLoading(false)
	}

	return (
		<>
			{isCardsLoading ? (
				<Spinner size='lg' />
			) : (
				<>
					<div className={styles.cards__selected}>
						{selectedCards.map((card, index) => (
							<React.Fragment key={index}>{card}</React.Fragment>
						))}
						<div
							className={`w-full max-w-sm aspect-video m-auto flex items-center justify-center border-2 border-dashed border-slate-400 rounded-2xl cursor-pointer transition-all hover:border-solid hover:border-slate-50 ${
								(isRoundOver || isGameOver || !isCreator) &&
								'pointer-events-none opacity-0'
							}`}
							onClick={onCardAreaClick}
						>
							{isNewCardLoading && <Spinner />}
						</div>
					</div>
				</>
			)}
		</>
	)
}

export default Cards
