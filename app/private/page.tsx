'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Notes from '@/components/Notes'
import { supabase } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'

type TTodos = {
	id: number
	created_at: string
	text: string
}

export default function PrivatePage() {
	const router = useRouter()

	// Указываем тип для состояния пользователя как User | null
	const [user, setUser] = useState<User | null>(null)
	const [todos, setTodos] = useState<TTodos[]>([])

	useEffect(() => {
		// Проверка сессии на клиентской стороне
		const checkUser = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession()

			// Если сессии нет - перенаправляем на страницу логина
			if (!session) {
				router.push('/login')
				return
			}

			// Если сессия существует - устанавливаем пользователя
			setUser(session.user)

			// Загружаем todos для авторизованного пользователя
			const { data: todosData, error: todosError } = await supabase
				.from('todos')
				.select()

			if (todosError) {
				console.error('Error fetching todos:', todosError.message)
			} else {
				setTodos(todosData || [])
			}
		}

		checkUser()
	}, [router])

	if (!user) {
		return <p>Loading...</p>
	}

	return (
		<>
			<p>Hello {user.email}</p>
			{todos.length > 0 && <Notes initialTodos={todos} />}
		</>
	)
}
