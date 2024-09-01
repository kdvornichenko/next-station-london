'use client'

import { MutableRefObject, useEffect, useRef, useState } from 'react'
import Cards from '@/components/Cards'
import styles from '@/styles/main.module.scss'
import {
	AbilityBranch,
	AbilityDouble,
	AbilityRepeat,
	AblilityAny,
} from '@/components/abilities'

export default function Home() {
	const [movedCards, setMovedCards] = useState<Element[]>([])
	const [redCardsCounter, setRedCardsCounter] = useState<number>(0)
	const [refreshCardsCounter, setRefreshCardsCounter] = useState<number>(0)
	const [isModalActive, setIsModalActive] = useState<boolean>(false)
	const cardsContainerRef: MutableRefObject<HTMLElement | null> = useRef(null)
	const cardsArea = useRef<HTMLDivElement | null>(null)

	const [colors] = useState<string[]>([
		'#ED127B',
		'#00ADEF',
		'#40B93C',
		'#602F93',
	])
	const [abilities] = useState<((color: string) => JSX.Element)[]>([
		AblilityAny,
		AbilityRepeat,
		AbilityBranch,
		AbilityDouble,
	])
	const [assignedColors, setAssignedColors] = useState<
		{ ability: (color: string) => JSX.Element; color: string }[]
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

	const onCardAreaClick = () => {
		const cards = cardsContainerRef.current?.children
		if (!cards || cards?.length === 0) return

		const randomIndex = Math.floor(Math.random() * cards.length)
		const randomCard = cards[randomIndex]

		cardsArea.current?.insertAdjacentElement('beforebegin', randomCard)

		setMovedCards([...movedCards, randomCard])

		setTimeout(() => {
			randomCard.hasAttribute('data-card-red') &&
				setRedCardsCounter(redCardsCounter + 1)
		}, 100)
	}

	useEffect(() => {
		redCardsCounter === 5 && setIsModalActive(true)
	}, [redCardsCounter])

	const refreshCards = () => {
		if (cardsContainerRef.current && cardsArea.current) {
			movedCards.forEach(card => {
				cardsContainerRef.current?.appendChild(card)
			})
		}

		setMovedCards([])

		setRedCardsCounter(0)

		setRefreshCardsCounter(refreshCardsCounter + 1)
		setIsModalActive(false)
	}

	const refreshAll = () => {
		refreshCards()
		setRefreshCardsCounter(0)
		assignColorsToAbilities()
		setIsModalActive(false)
	}

	return (
		<div className={styles.cards}>
			<section
				className={`${styles.cards__modal} ${isModalActive && styles.active}`}
			>
				<div className={styles.cards__modal_body}>
					{refreshCardsCounter === 4 ? (
						<button onClick={refreshAll}>Refresh All</button>
					) : (
						<button onClick={refreshCards}>Refresh Cards</button>
					)}
				</div>
			</section>

			<section className={styles.card__abilities}>
				{assignedColors.map(({ ability, color }, index) => (
					<div key={index} className={styles.card__ability}>
						<input type='checkbox' id={color} name={color} />
						<label htmlFor={color}>{ability(color)}</label>
					</div>
				))}
			</section>
			<section className={styles.cards__container} ref={cardsContainerRef}>
				<Cards.Red.Rectangle />
				<Cards.Default.Circle />
				<Cards.Default.Rectangle />
				<Cards.Red.Any />
				<Cards.Default.Triangle />
				<Cards.Red.Pentagon />
				<Cards.Default.Pentagon />
				<Cards.Red.Circle />
				<Cards.Default.Branch />
				<Cards.Red.Triangle />
				<Cards.Default.Any />
			</section>
			<div className={styles.cards__selected}>
				<div
					className={styles.cards__area}
					ref={cardsArea}
					onClick={onCardAreaClick}
				/>
			</div>
		</div>
	)
}
