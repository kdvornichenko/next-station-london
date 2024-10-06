'use client'

import { useContext } from 'react'
import { UserContext } from '@/app/providers'
import { supabase } from '@/utils/supabase/client'

export default function LoginPage() {
	const userContext = useContext(UserContext)
	console.log(process.env.NODE_ENV)
	console.log(window.location.origin)

	// Проверяем, инициализирован ли контекст
	if (!userContext) {
		return <div>Загрузка...</div>
	}

	const { user, setUser } = userContext

	const handleGoogleLogin = async () => {
		const redirectUrl =
			process.env.NODE_ENV === 'production'
				? 'https://next-station-london.vercel.app/login'
				: `${window.location.origin}/login`

		const { error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: redirectUrl,
			},
		})
		if (error) console.log('Error logging in with Google:', error.message)
	}

	const handleLogout = async () => {
		const { error } = await supabase.auth.signOut()
		if (error) console.log('Error logging out:', error.message)
		else setUser(null) // Обновляем состояние пользователя
	}

	return (
		<div className='max-w-xl w-full grid grid-rows-3 gap-y-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
			{user ? (
				<>
					<p>Привет, {user.email}</p>
					<button onClick={handleLogout}>Выйти</button>
				</>
			) : (
				<button onClick={handleGoogleLogin}>Войти через Google</button>
			)}
		</div>
	)
}
