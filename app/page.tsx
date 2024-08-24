import Cards from '@/components/Cards'
import styles from '@/styles/main.module.scss'

export default function Home() {
	return (
		<section className={styles.cards}>
			<Cards.Default.Any />
			<Cards.Default.Circle />
			<Cards.Default.Branch />
			<Cards.Default.Rectangle />
			<Cards.Default.Triangle />
			<Cards.Default.Pentagon />

			<Cards.Red.Circle />
			<Cards.Red.Any />
			<Cards.Red.Pentagon />
			<Cards.Red.Rectangle />
			<Cards.Red.Triangle />
		</section>
	)
}
