import { redirect } from 'next/navigation'
import Notes from '@/components/Notes'

import { createClient } from '@/utils/supabase/server'
import React from 'react'

export default async function PrivatePage() {
	const supabase = createClient()

	const auth = await supabase.auth.getUser()
	const { data: todos } = await supabase.from('todos').select()

	if (auth.error || !auth.data?.user) {
		redirect('/login')
	}

	return (
		<>
			<p>Hello {auth.data.user.email}</p>

			{todos && <Notes initialTodos={todos} />}
		</>
	)
}
