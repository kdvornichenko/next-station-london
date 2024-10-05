'use client'

import { supabase } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function Notes({ initialTodos }: { initialTodos: any[] }) {
	const [todos, setTodos] = useState(initialTodos)

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

					if (payload.eventType === 'INSERT') {
						// Добавляем новый элемент в список
						setTodos(prevTodos => [...prevTodos, payload.new])
					}

					if (payload.eventType === 'UPDATE') {
						// Обновляем существующий элемент в списке
						setTodos(prevTodos =>
							prevTodos.map(todo =>
								todo.id === payload.new.id ? payload.new : todo
							)
						)
					}

					if (payload.eventType === 'DELETE') {
						// Удаляем элемент из списка
						setTodos(prevTodos =>
							prevTodos.filter(todo => todo.id !== payload.old.id)
						)
					}
				}
			)
			.subscribe()

		const tetsChannel = supabase
			.channel('Тест realtime')
			.on('broadcast', { event: '*' }, payload => {
				console.log('Broadcast message:', payload)
			})
			.subscribe()

		// Отписываемся от канала при размонтировании компонента
		return () => {
			channel.unsubscribe()
			tetsChannel.unsubscribe()
		}
	}, [supabase])

	return <pre>{JSON.stringify(todos, null, 2)}</pre>
}
