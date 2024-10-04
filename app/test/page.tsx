'use server'

import Notes from '@/components/Notes'
import { createClient } from '@/utils/supabase/server'

export default async function NotesPage() {
	const supabase = createClient()
	const { data: todos, error } = await supabase.from('todos').select()

	if (error) {
		return <pre>{`Error: ${error.message}`}</pre>
	}

	return <Notes initialTodos={todos} />
}
