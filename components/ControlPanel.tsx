import {
	Card as NextUICard,
	Button,
	CardBody,
	CardHeader,
	Divider,
} from '@nextui-org/react'
import { ConsoleIcon, ExitIcon, ProfileIcon, SettingsIcon } from './icons'
import Link from 'next/link'
import Console from './Console'
import SettingsPanel from './SettingsPanel'
import { useState } from 'react'

type TTab = 'settings' | 'console'

const ControlPanel = () => {
	const [activeTab, setActiveTab] = useState<TTab>('console')

	// Массив с данными о кнопках
	const controlButtons = [
		{
			icon: <ConsoleIcon className='text-slate-50 w-12 h-12' />,
			action: () => setActiveTab('console'),
		},
		{
			icon: <SettingsIcon className='text-slate-50 w-12 h-12' />,
			action: () => setActiveTab('settings'),
		},
	]

	const navigationButtons = [
		{
			icon: <ProfileIcon className='text-slate-50 w-12 h-12' />,
			href: '/private',
		},
		{ icon: <ExitIcon className='text-slate-50 w-12 h-12' />, href: '/' },
	]

	// Компонент для активной вкладки
	const ActiveTabComponent = () => {
		switch (activeTab) {
			case 'settings':
				return <SettingsPanel />
			case 'console':
				return <Console />
			default:
				break
		}
	}

	return (
		<NextUICard className='card shadow-current-color rounded-3xl overflow-visible'>
			<CardHeader className='gap-x-3 justify-between'>
				<div className='flex gap-x-3'>
					{/* Отображение кнопок управления */}
					{controlButtons.map((button, index) => (
						<Button key={index} isIconOnly onClick={button.action}>
							{button.icon}
						</Button>
					))}
				</div>
				<div className='flex gap-x-3'>
					{/* Отображение навигационных кнопок */}
					{navigationButtons.map((button, index) => (
						<Button key={index} isIconOnly href={button.href} as={Link}>
							{button.icon}
						</Button>
					))}
				</div>
			</CardHeader>
			<Divider />
			<CardBody>
				<ActiveTabComponent />
			</CardBody>
		</NextUICard>
	)
}

export default ControlPanel
