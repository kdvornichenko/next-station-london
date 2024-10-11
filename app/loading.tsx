import { Spinner } from '@nextui-org/react'

function Loading() {
	return (
		<Spinner
			className='flex min-h-screen justify-center items-center'
			classNames={{
				wrapper: 'w-20 h-20',
			}}
		/>
	)
}

export default Loading
