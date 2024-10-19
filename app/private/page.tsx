'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'

export default function PrivatePage() {
	const router = useRouter()

	// Указываем тип для состояния пользователя как User | null
	const [user, setUser] = useState<User | null>(null)

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
		}

		checkUser()
	}, [router])

	if (!user) {
		return <p>Loading...</p>
	}

	return (
		<>
			<p>Hello {user.email}</p>
		</>
	)
}
