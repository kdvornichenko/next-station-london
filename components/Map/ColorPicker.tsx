import { colors, TColorValues } from '@/store/colors.store'
import styles from './map.module.sass'
import { useSetStations } from '@/store/stations.store'

const ColorPicker = () => {
	const { setCurrentColor } = useSetStations()

	const onColorChange = (color: TColorValues) => setCurrentColor(color)

	return (
		<div className={styles.map__colors}>
			{Object.values(colors).map(color => {
				if (
					color === colors.default ||
					color === colors.white ||
					color === colors.yellow
				)
					return
				return (
					<>
						<input
							className={styles.map__colorinput}
							type='radio'
							name='color'
							id={color + 'radio'}
							onChange={() => onColorChange(color)}
							defaultChecked={color === colors.pink}
						/>
						<label
							key={color + 'radio'}
							htmlFor={color + 'radio'}
							className={styles.map__color}
							style={{ backgroundColor: color }}
						/>
					</>
				)
			})}
		</div>
	)
}

export default ColorPicker
