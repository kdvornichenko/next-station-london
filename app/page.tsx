'use client'

import { ArrowIcon } from '@/components/icons'
import { supabase } from '@/utils/supabase/client'
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	Input,
	Spinner,
} from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { checkUserSession } from '@/utils/auth/checkUserSession'
import { useRoomStore } from '@/store/room.store'

export default function Home() {
	const router = useRouter()
	const { setRoomName } = useRoomStore()
	const [roomCode, setRoomCode] = useState<string>('')
	const [user, setUser] = useState<User | null>(null)
	const [errorMessage, setErrorMessage] = useState<string>('')
	const [enterRoomIsLoading, setEnterRoomIsLoading] = useState<boolean>(false)
	const [createRoomIsLoading, setCreateRoomIsLoading] = useState<boolean>(false)

	useEffect(() => {
		// Вызываем утилиту для проверки сессии
		checkUserSession(router, setUser)
	}, [router])

	const generateRoomName = () => {
		// Функция для генерации случайного 4-буквенного имени
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
		let result = ''
		for (let i = 0; i < 4; i++) {
			result += characters.charAt(Math.floor(Math.random() * characters.length))
		}
		return result
	}

	const checkRoomExists = async (roomName: string): Promise<boolean> => {
		try {
			const { data, error } = await supabase
				.from('rooms')
				.select('id')
				.eq('name', roomName)

			if (error) {
				console.error('Ошибка при проверке имени комнаты:', error)
				return false
			}

			return data && data.length > 0
		} catch (err) {
			console.error('Ошибка при проверке комнаты:', err)
			return false
		}
	}

	const createRoom = async (roomName: string): Promise<boolean> => {
		try {
			const { data, error } = await supabase
				.from('rooms')
				.insert([{ name: roomName, created_by: user?.id }])
				.select()

			if (error) {
				console.error('Ошибка при создании комнаты:', error)
				return false
			}

			return data && data.length > 0
		} catch (err) {
			console.error('Ошибка при создании комнаты:', err)
			return false
		}
	}

	const navigateToRoom = (roomName: string) => {
		setRoomName(roomName)
		router.push(`/game?room_name=${roomName}`)
	}

	const handleCreateRoom = async () => {
		if (!user) {
			setTimeout(() => {
				handleCreateRoom()
			}, 200)
			return
		}

		setCreateRoomIsLoading(true)

		let roomName = generateRoomName()
		let roomExists = await checkRoomExists(roomName)

		// Повторяем, пока не найдётся уникальное имя
		while (roomExists) {
			roomName = generateRoomName()
			roomExists = await checkRoomExists(roomName)
		}

		const isCreated = await createRoom(roomName)
		if (isCreated) {
			setCreateRoomIsLoading(false)
			navigateToRoom(roomName)
		} else {
			setCreateRoomIsLoading(false)
			console.error('Не удалось создать комнату')
		}
	}

	const handleRoomCodeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.toUpperCase()
		if (value.length > 4) return
		setRoomCode(value)
		if (errorMessage) setErrorMessage('')
	}

	const onRoomEnterClick = async () => {
		if (roomCode.length !== 4) {
			setErrorMessage('Код комнаты должен состоять из 4 букв.')
			return
		}

		setEnterRoomIsLoading(true)

		const roomExists = await checkRoomExists(roomCode)
		if (roomExists) {
			navigateToRoom(roomCode)
			setEnterRoomIsLoading(false)
		} else {
			setErrorMessage('Комната с таким кодом не найдена.')
			setEnterRoomIsLoading(false)
		}
	}

	return (
		<div>
			<Card className='card card-shadow max-w-80 w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-slate-400/30'>
				<CardBody>
					<div className='flex flex-col gap-y-2'>
						<p className=''>Код комнаты</p>
						<div className='relative'>
							<Input
								fullWidth
								size='lg'
								classNames={{ input: ['uppercase'] }}
								value={roomCode}
								onInput={handleRoomCodeInput}
							/>
							<Button
								isIconOnly
								size='md'
								className={`${
									roomCode.length === 4
										? 'opacity-100 pointer-events-auto'
										: 'opacity-20 pointer-events-none'
								} absolute right-1 top-1/2 -translate-y-1/2 bg-metro-pink animate-bg-fade`}
								onClick={onRoomEnterClick}
							>
								{enterRoomIsLoading ? (
									<Spinner />
								) : (
									<ArrowIcon color='#fff' size={20} />
								)}
							</Button>
						</div>
						{errorMessage && (
							<p className='text-red-500 text-sm mt-2'>{errorMessage}</p>
						)}
					</div>
				</CardBody>
				<div className='flex items-center gap-x-2'>
					<div className='bg-divider border-none w-full h-divider' />
					<span className='text-sm'>или</span>
					<div className='bg-divider border-none w-full h-divider' />
				</div>
				<CardFooter>
					<Button
						fullWidth
						type='button'
						variant='solid'
						className='animate-gradient-shift bg-button-gradient [background-size:400%]'
						onClick={handleCreateRoom}
					>
						{createRoomIsLoading ? <Spinner /> : 'Создать комнату'}
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}
