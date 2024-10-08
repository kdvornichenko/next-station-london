'use client'

import React, { Suspense, useContext, useEffect, useRef, useState } from 'react'

import styles from '@/styles/main.module.scss'

import Map from '@/components/Map/Map'
import Abilities from '@/components/abilities'
import Card from '@/components/Card'
import { UserContext } from '../providers'
import {
	Card as NextUICard,
	CardBody,
	CardHeader,
	Divider,
	CardFooter,
	Button,
} from '@nextui-org/react'
import Loading from '../loading'

export default function Game() {
	const [availableCards, setAvailableCards] = useState<JSX.Element[]>([
		<Card.Branch />,
		<Card.Blue.Any />,
		<Card.Blue.Circle />,
		<Card.Blue.Rectangle />,
		<Card.Blue.Triangle />,
		<Card.Red.Any />,
		<Card.Red.Circle />,
		<Card.Red.Pentagon />,
		<Card.Red.Rectangle />,
		<Card.Red.Triangle />,
	])
	const [usedCards, setUsedCards] = useState<JSX.Element[]>([])
	const [selectedCards, setSelectedCards] = useState<JSX.Element[]>([]) // Состояние для рендеринга выбранных карт
	const [redCardsCounter, setRedCardsCounter] = useState<number>(0)
	const [refreshCardsCounter, setRefreshCardsCounter] = useState<number>(0)
	const [isModalActive, setIsModalActive] = useState<boolean>(false)
	const userContext = useContext(UserContext)

	const onCardAreaClick = () => {
		if (availableCards.length === 0) return // Проверка, что есть доступные карты

		const randomIndex = Math.floor(Math.random() * availableCards.length)
		const randomCard = availableCards[randomIndex]

		// Добавляем карту в область рендеринга
		setSelectedCards([...selectedCards, randomCard])

		// Удаляем выбранную карту из списка доступных
		const updatedAvailableCards = availableCards.filter(
			(_, index) => index !== randomIndex
		)
		setAvailableCards(updatedAvailableCards)

		// Добавляем карту в список использованных
		setUsedCards([...usedCards, randomCard])

		// Увеличиваем счётчик, если карта красная
		setTimeout(() => {
			if (randomCard.props && randomCard.props['data-card-red']) {
				setRedCardsCounter(redCardsCounter + 1)
			}
		}, 100)
	}

	useEffect(() => {
		if (redCardsCounter === 5) {
			setIsModalActive(true)
		}
	}, [redCardsCounter])

	const refreshCards = () => {
		setAvailableCards([...availableCards, ...usedCards]) // Возвращаем все карты
		setUsedCards([])
		setSelectedCards([]) // Сбрасываем выбранные карты
		setRedCardsCounter(0)
		setRefreshCardsCounter(refreshCardsCounter + 1)
		setIsModalActive(false)
	}

	const refreshAll = () => {
		refreshCards()
		setRefreshCardsCounter(0)
		setIsModalActive(false)
	}

	// Проверяем, инициализирован ли контекст
	if (!userContext) {
		return <div>Загрузка...</div>
	}

	const { user } = userContext

	return (
		<Suspense fallback={<Loading />}>
			<div className='grid [grid-template-columns:_2fr_8fr_2fr] p-4 h-full'>
				<NextUICard
					className='card rounded-3xl max-w-[610px]'
					shadow='none'
					radius='none'
				>
					<CardHeader>
						<Abilities />
					</CardHeader>

					<Divider />

					<CardBody>
						{/* Контейнер для добавления случайных карт */}
						<div className={styles.cards__selected}>
							{selectedCards.map((card, index) => (
								<React.Fragment key={index}>{card}</React.Fragment>
							))}
							<div
								className={styles.cards__area}
								onClick={onCardAreaClick}
							></div>
						</div>
					</CardBody>

					<Divider />

					<CardFooter>
						<Button onClick={refreshCards} color='warning'>
							Refresh
						</Button>
					</CardFooter>
				</NextUICard>

				<Map />
			</div>
		</Suspense>
	)
}
