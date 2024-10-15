'use client'

import { useConsoleStore } from '@/store/console.store'
import { Button } from '@nextui-org/react'
import React, { useEffect, useRef } from 'react'

const Console = () => {
	const consoleEndRef = useRef<HTMLDivElement>(null)
	const { consoleMessages, clearConsoleMessages } = useConsoleStore()

	useEffect(() => {
		consoleEndRef.current?.scrollIntoView()
	}, [consoleMessages])

	return (
		<div className='console-container flex flex-col h-full'>
			<div className='console bg-transparent text-white rounded-lg flex-1 overflow-y-auto'>
				{consoleMessages.map((message, index) => (
					<div key={index} className='console-message mb-2'>
						<span className='timestamp text-gray-400 mr-2'>
							[{message.timestamp}]
						</span>
						<span className='message-text'>{message.content}</span>
					</div>
				))}
				<div ref={consoleEndRef} />
			</div>

			<Button onClick={clearConsoleMessages} variant='solid' color='danger'>
				Очистить консоль
			</Button>
		</div>
	)
}

export default Console
