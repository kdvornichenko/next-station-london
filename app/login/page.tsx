'use client'

import { useContext } from 'react'
import { UserContext } from '@/app/providers'
import { supabase } from '@/utils/supabase/client'

export default function LoginPage() {
	const userContext = useContext(UserContext)

	// Проверяем, инициализирован ли контекст
	if (!userContext) {
		return <div>Загрузка...</div>
	}

	const { user, setUser } = userContext

	const getURL = () => {
		let url =
			process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
			process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
			'http://localhost:3000/'
		// Make sure to include `https://` when not localhost.
		url = url.startsWith('http') ? url : `https://${url}`
		// Make sure to include a trailing `/`.
		url = url.endsWith('/') ? url : `${url}/`
		return url
	}

	const handleGoogleLogin = async () => {
		const { error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: getURL(),
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
