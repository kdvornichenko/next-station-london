'use client'

import { supabase } from '@/utils/supabase/client'

export default function LoginPage() {
	const handleGoogleLogin = async () => {
		const { error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
		})
		if (error) console.log('Error logging in with Google:', error.message)
	}

	return (
		<div className='max-w-xl w-full grid grid-rows-3 gap-y-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
			<button onClick={handleGoogleLogin}>Войти через Google</button>
		</div>
	)
}
