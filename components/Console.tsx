'use client'

import { Button } from '@nextui-org/react'
import React, { useEffect, useRef } from 'react'

export interface ConsoleMessage {
	timestamp: string
	content: React.ReactNode
}

interface ConsoleProps {
	messages: ConsoleMessage[]
	onClear?: () => void
}

const Console: React.FC<ConsoleProps> = ({ messages, onClear }) => {
	const consoleEndRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [messages])

	return (
		<div className='console-container flex flex-col h-full'>
			<div className='console bg-black text-white rounded-lg flex-1 overflow-y-auto'>
				{messages.map((message, index) => (
					<div key={index} className='console-message mb-2'>
						<span className='timestamp text-gray-400 mr-2'>
							[{message.timestamp}]
						</span>
						<span className='message-text'>{message.content}</span>
					</div>
				))}
				<div ref={consoleEndRef} />
			</div>
			{onClear && (
				<Button onClick={onClear} variant='solid' color='danger'>
					Очистить консоль
				</Button>
			)}
		</div>
	)
}

export default Console
