import { Navbar as NextUINavbar } from '@nextui-org/navbar'
import Link from 'next/link'

export const Navbar = () => {
	return (
		<NextUINavbar maxWidth='xl' position='sticky'>
			<Link href={'test'}>Test</Link>
		</NextUINavbar>
	)
}
