import {
	Card as NextUICard,
	Button,
	CardBody,
	CardHeader,
	Divider,
} from '@nextui-org/react'
import { ExitIcon, ProfileIcon } from './icons'
import Link from 'next/link'
import Console from './Console'
import { useConsoleStore } from '@/store/console.store'

const ControlPanel = () => {
	const { addConsoleMessage } = useConsoleStore()

	return (
		<NextUICard className='card shadow-current-color rounded-3xl'>
			<CardHeader className='gap-x-3 justify-end'>
				<Button isIconOnly href='/private' as={Link}>
					<ProfileIcon className='text-slate-50 w-12 h-12' />
				</Button>
				<Button isIconOnly href='/' as={Link}>
					<ExitIcon className='text-slate-50 w-12 h-12' />
				</Button>
			</CardHeader>
			<Divider />
			<CardBody>
				<Console />
			</CardBody>
		</NextUICard>
	)
}

export default ControlPanel
