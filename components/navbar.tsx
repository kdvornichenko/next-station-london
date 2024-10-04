import { siteConfig } from '@/config/site'
import { Navbar as NextUINavbar } from '@nextui-org/navbar'
import Link from 'next/link'

export const Navbar = () => {
	return (
		<NextUINavbar maxWidth='xl' position='sticky'>
			{siteConfig.navItems.map(item => {
				return <Link key={item.href}  href={item.href}>{item.label}</Link>
			})}
		</NextUINavbar>
	)
}
