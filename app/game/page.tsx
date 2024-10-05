'use client'

import { MutableRefObject, useEffect, useRef, useState } from 'react'
import Cards from '@/components/Cards'
import styles from '@/styles/main.module.scss'

import Map from '@/components/Map/Map'
import SvgSpite from '@/components/SvgSpite'
import Abilities from '@/components/abilities'
import Card from '@/components/Card'
import { supabase } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'

export default function Game() {
	const [movedCards, setMovedCards] = useState<Element[]>([])
	const [redCardsCounter, setRedCardsCounter] = useState<number>(0)
	const [refreshCardsCounter, setRefreshCardsCounter] = useState<number>(0)
	const [isModalActive, setIsModalActive] = useState<boolean>(false)
	const cardsContainerRef: MutableRefObject<HTMLElement | null> = useRef(null)
	const cardsArea = useRef<HTMLDivElement | null>(null)

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
		setIsModalActive(false)
	}

	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		const getUserProfile = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession()

			setUser(session?.user ?? null)
		}

		supabase.auth.onAuthStateChange((_event, session) => {
			setUser(session?.user ?? null)
		})

		getUserProfile()
	}, [])

	return (
		<div className={styles.cards}>
			{!user ? 'Loading' : <div>Привет, {user.email}!</div>}
			<SvgSpite />
			<section
				className={`${styles.cards__modal} ${isModalActive && styles.active}`}
			>
				<div className={styles.cards__modal_body}>
					{refreshCardsCounter === 3 ? (
						<button onClick={refreshAll}>Refresh All</button>
					) : (
						<button onClick={refreshCards}>Refresh Cards</button>
					)}
				</div>
			</section>

			<Abilities />

			<Map />

			<section className={styles.cards__container} ref={cardsContainerRef}>
				<Card.Branch />
				<Card.Blue.Any />
				<Card.Blue.Circle />
				<Card.Blue.Rectangle />
				<Card.Blue.Triangle />

				<Card.Red.Any />
				<Card.Red.Circle />
				<Card.Red.Pentagon />
				<Card.Red.Rectangle />
				<Card.Red.Triangle />
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
