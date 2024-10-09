'use client'

import React, {
	CSSProperties,
	Suspense,
	useContext,
	useEffect,
	useState,
} from 'react'

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
import { TColorValues, useColorStore } from '@/store/colors.store'
import SettingsPanel from '@/components/SettingsPanel'
// Определяем тип для CSS-переменной
interface CustomCSSProperties extends CSSProperties {
	'--nsl-current-color'?: TColorValues | null
}

export default function Game() {
	const [availableCards, setAvailableCards] = useState<JSX.Element[]>([
		<Card.Branch />,
		<Card.Blue.Any />,
		<Card.Blue.Circle />,
		<Card.Blue.Rectangle />,
		<Card.Blue.Triangle />,
		<Card.Red.Any data-card-red />,
		<Card.Red.Circle data-card-red />,
		<Card.Red.Pentagon data-card-red />,
		<Card.Red.Rectangle data-card-red />,
		<Card.Red.Triangle data-card-red />,
	])
	const [usedCards, setUsedCards] = useState<JSX.Element[]>([])
	const [selectedCards, setSelectedCards] = useState<JSX.Element[]>([]) // Состояние для рендеринга выбранных карт
	const [redCardsCounter, setRedCardsCounter] = useState<number>(0)
	const [roundsCounter, setRoundsCounter] = useState<number>(1)
	const [isRoundOver, setIsRoundOver] = useState<boolean>(false)
	const [isGameOver, setIsGameOver] = useState<boolean>(false)
	const userContext = useContext(UserContext)
	const { currentColor } = useColorStore()

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
			setIsRoundOver(true)
		}
	}, [redCardsCounter])

	const refreshCards = () => {
		if (!isRoundOver) return

		setAvailableCards([...availableCards, ...usedCards]) // Возвращаем все карты
		setUsedCards([])
		setSelectedCards([]) // Сбрасываем выбранные карты
		setRedCardsCounter(0)
		setRoundsCounter(roundsCounter + 1)
		setIsRoundOver(false)
	}

	useEffect(() => {
		if (roundsCounter === 5) {
			setIsGameOver(true)
		}
	}, [roundsCounter])

	useEffect(() => {}, [currentColor])

	// Проверяем, инициализирован ли контекст
	if (!userContext) {
		return <div>Загрузка...</div>
	}

	const gridStyles: CustomCSSProperties = {
		...(currentColor ? { '--nsl-current-color': currentColor } : {}),
	}

	return (
		<Suspense fallback={<Loading />}>
			<div className='h-full' style={gridStyles}>
				<SettingsPanel />

				<div className='grid [grid-template-columns:_2fr_8fr_2fr] p-4 h-full'>
					<NextUICard
						className={`card rounded-3xl max-w-[610px] shadow-[var(--nsl-current-color)] [transition:all_0.7s_ease]`}
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
									className={`w-full max-w-sm aspect-video m-auto border-2 border-dashed border-slate-400 rounded-2xl cursor-pointer transition-all hover:border-solid hover:border-slate-50 ${
										(isRoundOver || isGameOver) &&
										'pointer-events-none opacity-0'
									}`}
									onClick={onCardAreaClick}
								/>
							</div>
						</CardBody>

						<Divider />

						<CardFooter className='justify-between'>
							{isGameOver ? 'Game Over' : roundsCounter}
							{!isGameOver && (
								<Button
									onClick={refreshCards}
									color='secondary'
									className={
										isRoundOver
											? 'pointer-events-auto'
											: 'pointer-events-none opacity-50'
									}
								>
									Refresh
								</Button>
							)}
						</CardFooter>
					</NextUICard>

					<Map />
				</div>
			</div>
		</Suspense>
	)
}
