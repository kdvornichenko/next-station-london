'use client'

import { useState } from 'react'
import { login, signup } from './actions'
import { Button, Input } from '@nextui-org/react'
import { EyeFilledIcon, EyeSlashFilledIcon } from '@/components/icons'

export default function LoginPage() {
	const [isVisible, setIsVisible] = useState(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = async (isLogin: boolean) => {
		// Создаем объект FormData для передачи данных
		const formData = new FormData()
		formData.append('email', email)
		formData.append('password', password)

		if (isLogin) {
			await login(formData) // Логин
		} else {
			await signup(formData) // Регистрация
		}
	}

	const toggleVisibility = () => setIsVisible(!isVisible)

	return (
		<div className='max-w-xl w-full grid grid-rows-3 gap-y-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
			<Input
				type='email'
				label='Email'
				variant='bordered'
				required
				name='email'
				className='max-w-xl'
				value={email}
				onChange={e => setEmail(e.target.value)}
			/>
			<Input
				label='Password'
				variant='bordered'
				required
				name='password'
				value={password}
				onChange={e => setPassword(e.target.value)}
				endContent={
					<button
						className='focus:outline-none'
						type='button'
						onClick={toggleVisibility}
						aria-label='toggle password visibility'
					>
						{isVisible ? (
							<EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
						) : (
							<EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
						)}
					</button>
				}
				type={isVisible ? 'text' : 'password'}
				className='max-w-xl'
			/>

			<div className='grid grid-cols-2 gap-4'>
				<Button
					color='primary'
					variant='shadow'
					size='lg'
					type='button'
					onClick={() => handleSubmit(true)} // Вызов логина
				>
					Log in
				</Button>
				<Button
					color='primary'
					variant='ghost'
					size='lg'
					type='button'
					onClick={() => handleSubmit(false)} // Вызов регистрации
				>
					Sign up
				</Button>
			</div>
		</div>
	)
}
