'use client'

import React, {
	CSSProperties,
	Suspense,
	useContext,
	useEffect,
	useRef,
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
import { ExitIcon, ProfileIcon } from '@/components/icons'
import Link from 'next/link'
import { startColorSwitcher } from '@/utils/colorSwitcher'
import { useRoomStore } from '@/store/room.store'
import { useSearchParams } from 'next/navigation'
import Console, { ConsoleMessage } from '@/components/Console'
import { supabase } from '@/utils/supabase/client'
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
	const { currentColor, setCurrentColor } = useColorStore()
	const [testData, setTestData] = useState<string>('EMPTY')
	const { roomName, setRoomName } = useRoomStore()
	const searchParams = useSearchParams()
	const isInitialMount = useRef(true)
	const hasFetchedRoomData = useRef(false)
	const [consoleMessages, setConsoleMessages] = useState<ConsoleMessage[]>([])

	// Проверяем, инициализирован ли контекст
	if (!userContext) {
		return <div>Загрузка...</div>
	}

	// Сообщение в консоль
	const addConsoleMessage = (content: React.ReactNode) => {
		const timestamp = new Date().toLocaleTimeString()
		setConsoleMessages(prevMessages => [
			...prevMessages,
			{ timestamp, content },
		])
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

	// Получение данных о комнате
	useEffect(() => {
		if (!roomName || hasFetchedRoomData.current) return

		hasFetchedRoomData.current = true

		addConsoleMessage(
			<span className='text-warning'>
				Получение данных о комнате из Supabase: {roomName}
			</span>
		)

		const fetchData = async () => {
			try {
				const { data, error } = await supabase
					.from('rooms')
					.select('test_text')
					.eq('name', roomName)
					.single()

				if (error) {
					console.error('Error fetching room:', error.message)
					addConsoleMessage(
						<span>
							Ошибка получения комнаты:
							<span className='text-danger'> {error.message}</span>
						</span>
					)
				} else {
					setTestData(data?.test_text || '')
					addConsoleMessage(
						<span className='text-success'>Данные успешно получены</span>
					)

					setTimeout(() => {
						addConsoleMessage(
							<span>
								Данные: <span className='bg-red'>{data?.test_text}</span>
							</span>
						)
					}, 200)
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
	}, [roomName])

	// Выбор новой карты
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

		// Определяем, красная ли карта
		const isRedCard = randomCard.props && randomCard.props['data-card-red']

		// Получаем имя карты
		const cardName = randomCard.type.name

		// Логируем выбор карты
		addConsoleMessage(
			<span>
				Выпала карта:{' '}
				{
					<span className={isRedCard ? 'text-card-red' : 'text-card-blue'}>
						{cardName}
					</span>
				}
			</span>
		)

		// Увеличиваем счётчик, если карта красная
		setTimeout(() => {
			if (isRedCard) {
				setRedCardsCounter(prev => prev + 1)
				addConsoleMessage(<span>Счетчик красных карт +1</span>)
			}
		}, 100)
	}

	const refreshCards = () => {
		if (!isRoundOver) return

		setAvailableCards([...availableCards, ...usedCards])
		addConsoleMessage(<span>Все доступные карты обновлены</span>)

		setUsedCards([])
		addConsoleMessage(<span>Все использованные карты обновлены</span>)

		setSelectedCards([])
		addConsoleMessage(<span>Все использованные карты удалены со страницы</span>)

		setRedCardsCounter(0)
		addConsoleMessage(<span>Счетчик красных карт обнулен</span>)

		setRoundsCounter(roundsCounter + 1)
		addConsoleMessage(<span>Счетчик раундов +1</span>)

		setIsRoundOver(false)
		addConsoleMessage(<span>Стейт isRoundOver = false</span>)

		// Логируем обновление раунда
		addConsoleMessage(<span>Начался раунд {roundsCounter + 1}</span>)
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

		addConsoleMessage(
			<span className='text-success'>Игра окончена! Подсчет очков</span>
		)

		return () => stopSwitching()
	}, [isGameOver])

	// Стили для переключени цвета тени
	const gridStyles: CustomCSSProperties = {
		...(currentColor ? { '--nsl-current-color': currentColor } : {}),
	}

	return (
		<Suspense fallback={<Loading />}>
			<div className='h-full' style={gridStyles}>
				<SettingsPanel />

				<div className='grid [grid-template-columns:_2fr_8fr_2fr] p-4 h-full'>
					<NextUICard
						className={`card shadow-current-color rounded-3xl max-w-[610px]`}
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
					{/* Правый сайдбар */}
					<NextUICard className='card shadow-current-color rounded-3xl'>
						<CardHeader className='gap-x-3 justify-end'>
							<Button isIconOnly href='/private' as={Link}>
								<ProfileIcon className='text-slate-50 w-12 h-12' />
							</Button>
							<Button isIconOnly href='/' as={Link}>
								<ExitIcon className='text-slate-50 w-12 h-12' />
							</Button>
						</CardHeader>
						<Divider />
						<CardBody>
							<Console
								messages={consoleMessages}
								onClear={() => setConsoleMessages([])}
							/>
						</CardBody>
					</NextUICard>
				</div>
			</div>
		</Suspense>
	)
}
