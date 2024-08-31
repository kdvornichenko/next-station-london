'use client'

import { MutableRefObject, useEffect, useRef, useState } from 'react'
import Cards from '@/components/Cards'
import styles from '@/styles/main.module.scss'
import AbilityAny from '@/assets/ability-any.png'
import AbilityRepeat from '@/assets/ability-repeat.png'
import AbilityBranch from '@/assets/ability-branch.png'
import AbilityDouble from '@/assets/ability-bouble.png'

export default function Home() {
	const [movedCards, setMovedCards] = useState<Element[]>([])
	const [redCardsCounter, setRedCardsCounter] = useState<number>(0)
	const cardsContainerRef: MutableRefObject<HTMLElement | null> = useRef(null)
	const cardsArea = useRef<HTMLDivElement | null>(null)

	const [colors, setColors] = useState<string[]>([
		'pink',
		'blue',
		'green',
		'purple',
	])
	const [abilities, setAbilities] = useState<string[]>([
		'any',
		'repeat',
		'branch',
		'double',
	])
	const [abilitiesColors, setAbilitiesColors] = useState<
		{
			color: 'pink' | 'blue' | 'green' | 'purple'
			ability: 'any' | 'double' | 'branch' | 'repeat'
		}[]
	>([])

	useEffect(() => {
		for (let i = 0; i < 4; i++) {
			const randomIndex = Math.floor(Math.random() * colors.length)
			const filtered = colors.filter(color => color !== colors[randomIndex])
			const element = colors[randomIndex]
			setColors(filtered)

			console.log(filtered)
		}
	}, [])

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
		if (redCardsCounter === 5) {
			alert('Game Over!')
		}
	}, [redCardsCounter])

	return (
		<div className={styles.cards}>
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
