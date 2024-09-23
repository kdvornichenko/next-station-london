type Props = {
	type: 'hexagon' | 'circle' | 'rectangle' | 'triangle'
	x: number
	y: number
}

const Hexagon = () => {
	return (
		<>
			<line
				x1='26.5987'
				y1='132'
				x2='18.1986'
				y2='138.102'
				stroke='#24265D'
				strokeWidth='2'
			/>
			<line
				x1='18.1986'
				y1='138.102'
				x2='21.4069'
				y2='147.976'
				stroke='#24265D'
				strokeWidth='2'
			/>
			<line
				x1='21.4069'
				y1='147.976'
				x2='31.7905'
				y2='147.976'
				stroke='#24265D'
				strokeWidth='2'
			/>
			<line
				x1='31.7905'
				y1='147.976'
				x2='34.9988'
				y2='138.102'
				stroke='#24265D'
				strokeWidth='2'
			/>
			<line
				x1='34.9988'
				y1='138.102'
				x2='26.5987'
				y2='132'
				stroke='#24265D'
				strokeWidth='2'
			/>
		</>
	)
}

const Triangle = () => {
	return (
		<>
			<line
				x1='27'
				y1='132'
				x2='18'
				y2='146'
				stroke='#24265D'
				stroke-width='2'
				stroke-linecap='round'
			/>
			<line
				x1='18'
				y1='146'
				x2='35'
				y2='146'
				stroke='#24265D'
				stroke-width='2'
				stroke-linecap='round'
			/>
			<line
				x1='35'
				y1='146'
				x2='27'
				y2='132'
				stroke='#24265D'
				stroke-width='2'
				stroke-linecap='round'
			/>
		</>
	)
}

const stations: Record<Props['type'], React.FC> = {
	hexagon: Hexagon,
	circle: () => <div>Circle placeholder</div>,
	rectangle: () => <div>Rectangle placeholder</div>,
	triangle: Triangle,
}

const Station = ({ x, y, type }: Props) => {
	const Component = stations[type]

	return (
		<g transform={`translate(${x}, ${y})`}>
			<circle
				cx='26.5987'
				cy='140.832'
				r='15.4253'
				strokeWidth={2}
				stroke='#24265D'
				fill='#ffffff'
			/>

			<Component />
		</g>
	)
}

export default Station
