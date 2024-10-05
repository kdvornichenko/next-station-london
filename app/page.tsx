'use client'

import { ArrowIcon } from '@/components/icons'
import { Button, Card, CardBody, CardFooter, Input } from '@nextui-org/react'
import Link from 'next/link'

export default function Home() {
	return (
		<div>
			<Card className='max-w-80 w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
				<CardBody>
					<div className='flex flex-col gap-y-2'>
						<p className=''>Код комнаты</p>
						<div className='relative'>
							<Input
								fullWidth
								size='lg'
								classNames={{
									input: ['uppercase'],
								}}
							/>
							<Button
								isIconOnly
								size='md'
								className='absolute right-1 top-1/2 -translate-y-1/2 bg-button-gradient animate-gradient-shift [background-size:400%]'
							>
								<ArrowIcon color='#fff' size={20} />
							</Button>
						</div>
					</div>
				</CardBody>
				<div className='flex items-center gap-x-2'>
					<div className='bg-divider border-none w-full h-divider' />
					<span className='text-sm'>или</span>
					<div className='bg-divider border-none w-full h-divider' />
				</div>
				<CardFooter>
					<Button
						fullWidth
						type='button'
						variant='solid'
						className='bg-button-gradient animate-gradient-shift [background-size:400%]'
						as={Link}
						href={'/game'}
					>
						Создать комнату
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}
