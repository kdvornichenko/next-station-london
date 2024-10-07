import '@/styles/globals.scss'
import { Metadata, Viewport } from 'next'
import clsx from 'clsx'

import { Providers } from './providers'

import { siteConfig } from '@/config/site'
import { fontSans } from '@/config/fonts'
import { Navbar } from '@/components/navbar'
import SvgSpite from '@/components/SvgSpite'

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: {
		icon: '/favicon.ico',
	},
}

export const viewport: Viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'white' },
		{ media: '(prefers-color-scheme: dark)', color: 'black' },
	],
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html suppressHydrationWarning lang='en'>
			<head />
			<body
				className={clsx(
					'min-h-screen bg-gray-950 bg-[url(/grid.svg)] font-sans antialiased',
					fontSans.variable
				)}
			>
				<Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
					<SvgSpite />
					<div className='flex flex-col h-screen'>
						{/* <Navbar /> */}
						<main className='h-full'>{children}</main>
					</div>
				</Providers>
			</body>
		</html>
	)
}
