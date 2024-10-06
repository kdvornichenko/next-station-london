'use client'

import { NextUIProvider } from '@nextui-org/system'
import { useRouter } from 'next/navigation'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { supabase } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'
import { createContext, useEffect, useState } from 'react'

export interface ProvidersProps {
	children: React.ReactNode
	themeProps?: ThemeProviderProps
}

export const UserContext = createContext<{
	user: User | null
	setUser: React.Dispatch<React.SetStateAction<User | null>>
} | null>(null)

export function Providers({ children, themeProps }: ProvidersProps) {
	const router = useRouter()
	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		const getUserProfile = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession()
			setUser(session?.user ?? null)
		}

		getUserProfile()

		const { data: authListener } = supabase.auth.onAuthStateChange(
			(_event, session) => {
				setUser(session?.user ?? null)
			}
		)

		return () => {
			authListener?.subscription.unsubscribe()
		}
	}, [])

	return (
		<UserContext.Provider value={{ user, setUser }}>
			<NextUIProvider navigate={router.push}>
				<NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
			</NextUIProvider>
		</UserContext.Provider>
	)
}
