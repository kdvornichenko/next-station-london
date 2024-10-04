'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function Notes({ initialTodos }: { initialTodos: any[] }) {
	const [todos, setTodos] = useState(initialTodos)
	const supabase = createClient()

	useEffect(() => {
		const channel = supabase
			.channel('update')
			.on(
				'postgres_changes',
				{
					event: '*',
					schema: 'public',
					table: 'todos',
				},
				payload => {
					console.log('Change received!', payload)
					// Здесь можно обновить состояние `todos` в зависимости от изменения
				}
			)
			.subscribe()

		return () => {
			channel.unsubscribe()
		}
	}, [supabase])

	return <pre>{JSON.stringify(todos, null, 2)}</pre>
}
