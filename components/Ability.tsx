import { FC } from 'react'

type TAbility = {
	color: string
	className?: string
}

const Any: FC<TAbility> = ({ color, className }): JSX.Element => {
	return (
		<svg
			width='120'
			height='120'
			viewBox='0 0 120 120'
			fill='none'
			className={className}
		>
			<rect x='1' y='1' width='120' height='120' rx='9' fill='white' />
			<rect
				x='1'
				y='1'
				width='120'
				height='120'
				rx='9'
				stroke='black'
				strokeWidth='2'
			/>
			<rect width='120' height='120' fill={color} />
			<circle
				cx='60'
				cy='59'
				r='37.5'
				fill='#7DBAD7'
				stroke='black'
				strokeWidth='5'
			/>
			<line
				x1='49.6544'
				y1='49.0824'
				x2='69.9175'
				y2='69.3455'
				stroke='black'
				strokeWidth='2'
			/>
			<line
				x1='48.2715'
				y1='69.3155'
				x2='70.3768'
				y2='49.0523'
				stroke='black'
				strokeWidth='2'
			/>
			<circle
				cx='80.2631'
				cy='38.7368'
				r='13.7368'
				fill='white'
				stroke='black'
				strokeWidth='2'
			/>
			<path
				d='M79.6373 43.9368L71.4764 43.8885L80.2655 29.59L89.1676 43.9932L79.6373 43.9368Z'
				fill='white'
				stroke='black'
				strokeWidth='2'
			/>
			<circle
				cx='80.2631'
				cy='79.2631'
				r='13.7368'
				fill='white'
				stroke='black'
				strokeWidth='2'
			/>
			<rect
				x='72.0526'
				y='71.0526'
				width='16.4211'
				height='16.4211'
				rx='8.21053'
				fill='white'
				stroke='black'
				strokeWidth='2'
			/>
			<circle
				cx='39.7368'
				cy='79.2631'
				r='13.7368'
				fill='white'
				stroke='black'
				strokeWidth='2'
			/>
			<path
				d='M35.1091 87.4737L31.7026 77.9384L39.5864 71.3468L47.7669 77.9505L44.3647 87.4737H39.5753H35.1091Z'
				fill='white'
				stroke='black'
				strokeWidth='2'
			/>
			<circle
				cx='39.7368'
				cy='38.7368'
				r='13.7368'
				fill='white'
				stroke='black'
				strokeWidth='2'
			/>
			<rect
				x='33.3684'
				y='32.3684'
				width='12.7368'
				height='12.7368'
				fill='white'
				stroke='black'
				strokeWidth='2'
			/>
		</svg>
	)
}

const Branch: FC<TAbility> = ({ color, className }): JSX.Element => {
	return (
		<svg
			width='120'
			height='120'
			viewBox='0 0 120 120'
			fill='none'
			className={className}
		>
			<rect x='1' y='1' width='120' height='120' rx='9' fill='white' />
			<rect
				x='1'
				y='1'
				width='120'
				height='120'
				rx='9'
				stroke='black'
				strokeWidth='2'
			/>
			<rect width='120' height='120' fill={color} />
			<rect
				x='23.5'
				y='22.5'
				width='73'
				height='73'
				rx='5.5'
				fill='white'
				stroke='black'
				strokeWidth='5'
			/>
			<path
				d='M34 82.5625C34 82.5625 34.0125 77.3338 34 70.375C33.9937 66.8625 34.9385 61.6982 36.4375 59C42.2463 48.5442 56.2607 49.7485 60.8125 38.6875C63.2276 32.819 63.25 31.375 63.25 31.375M79.5 31.375C79.5 31.375 79.4776 32.819 77.0625 38.6875C72.5107 49.7485 58.4963 48.5442 52.6875 59C51.1885 61.6982 50.2437 66.8625 50.25 70.375C50.2625 77.3338 50.25 82.5625 50.25 82.5625'
				stroke='#FF0000'
				strokeWidth='3'
			/>
			<line
				x1='33.875'
				y1='31.375'
				x2='33.875'
				y2='83.375'
				stroke='black'
				strokeWidth='3'
			/>
			<line
				x1='50.125'
				y1='31.375'
				x2='50.125'
				y2='83.375'
				stroke='black'
				strokeWidth='3'
			/>
			<rect
				x='59.375'
				y='68.125'
				width='27.25'
				height='14.25'
				rx='3'
				fill='#21AFD3'
				stroke='black'
				strokeWidth='2'
			/>
			<circle cx='83.5' cy='64.5' r='7' fill='#E7C616' stroke='black' />
			<line x1='83.5' y1='60' x2='83.5' y2='69' stroke='black' />
			<line x1='79' y1='64.5' x2='88' y2='64.5' stroke='black' />
		</svg>
	)
}

const Double: FC<TAbility> = ({ color, className }): JSX.Element => {
	return (
		<svg
			width='120'
			height='120'
			viewBox='0 0 120 120'
			fill='none'
			className={className}
		>
			<rect x='1' y='1' width='120' height='120' rx='9' fill='white' />
			<rect
				x='1'
				y='1'
				width='120'
				height='120'
				rx='9'
				stroke='black'
				strokeWidth='2'
			/>
			<rect width='120' height='120' fill={color} />
			<circle
				cx='60.5'
				cy='58.5'
				r='39'
				fill='white'
				stroke='black'
				strokeWidth='5'
			/>
			<circle cx='61' cy='58' r='30' fill='#FF015A' />
			<path
				d='M45.6364 45.7273L50.3295 53.6591H50.5114L55.2273 45.7273H60.7841L53.6818 57.3636L60.9432 69H55.2841L50.5114 61.0568H50.3295L45.5568 69H39.9205L47.2045 57.3636L40.0568 45.7273H45.6364ZM63.7614 69V65.4545L72.0455 57.7841C72.75 57.1023 73.3409 56.4886 73.8182 55.9432C74.303 55.3977 74.6705 54.8636 74.9205 54.3409C75.1705 53.8106 75.2955 53.2386 75.2955 52.625C75.2955 51.9432 75.1402 51.3561 74.8295 50.8636C74.5189 50.3636 74.0947 49.9811 73.5568 49.7159C73.0189 49.4432 72.4091 49.3068 71.7273 49.3068C71.0152 49.3068 70.3939 49.4508 69.8636 49.7386C69.3333 50.0265 68.9242 50.4394 68.6364 50.9773C68.3485 51.5152 68.2045 52.1553 68.2045 52.8977H63.5341C63.5341 51.375 63.8788 50.053 64.5682 48.9318C65.2576 47.8106 66.2235 46.9432 67.4659 46.3295C68.7083 45.7159 70.1402 45.4091 71.7614 45.4091C73.428 45.4091 74.8788 45.7045 76.1136 46.2955C77.3561 46.8788 78.322 47.6894 79.0114 48.7273C79.7008 49.7652 80.0455 50.9545 80.0455 52.2955C80.0455 53.1742 79.8712 54.0417 79.5227 54.8977C79.1818 55.7538 78.572 56.7045 77.6932 57.75C76.8144 58.7879 75.5758 60.0341 73.9773 61.4886L70.5795 64.8182V64.9773H80.3523V69H63.7614Z'
				fill='white'
			/>
		</svg>
	)
}

const Repeat: FC<TAbility> = ({ color, className }): JSX.Element => {
	return (
		<svg
			width='120'
			height='120'
			viewBox='0 0 120 120'
			fill='none'
			className={className}
		>
			<rect x='1' y='1' width='120' height='120' rx='9' fill='white' />
			<rect
				x='1'
				y='1'
				width='120'
				height='120'
				rx='9'
				stroke='black'
				strokeWidth='2'
			/>
			<rect width='120' height='120' fill={color} />
			<circle
				cx='60.5'
				cy='58.5'
				r='39'
				fill='white'
				stroke='black'
				strokeWidth='5'
			/>
			<g clipPath='url(#clip0_18_331)'>
				<path
					d='M81.9901 52.1287C85.0725 63.6327 78.2144 75.4969 66.7104 78.5794L66.6414 78.5979L73.9684 81.0615C74.6878 81.3019 75.0773 82.0851 74.8369 82.8046C74.5965 83.524 73.8133 83.9135 73.0939 83.6731L62.4681 80.0965C62.0847 79.9668 61.7853 79.6772 61.633 79.306C61.6072 79.2495 61.594 79.2002 61.5782 79.141C61.491 78.8157 61.5248 78.4686 61.6855 78.1614L66.9552 67.8216C67.3029 67.1473 68.1276 66.8735 68.8117 67.2185C69.4859 67.5661 69.7597 68.3908 69.4147 69.0749L65.8987 75.9442L65.9973 75.9178C76.0423 73.2263 82.0174 62.877 79.3285 52.8419C76.6396 42.8068 66.2877 36.8218 56.2427 39.5133C46.1977 42.2049 40.2226 52.5541 42.9115 62.5892C44.2137 67.4491 47.332 71.5159 51.6915 74.0245C52.3539 74.407 52.5785 75.2449 52.196 75.9074C51.8135 76.5698 50.9756 76.7943 50.3132 76.4119C45.3136 73.5253 41.7423 68.872 40.2499 63.3024C37.1701 51.8083 44.0158 39.9369 55.5296 36.8518C67.0433 33.7667 78.9076 40.6248 81.9901 52.1287Z'
					fill='#FF015A'
				/>
			</g>
			<defs>
				<clipPath id='clip0_18_331'>
					<rect
						width='50'
						height='50'
						fill='white'
						transform='matrix(-1 0 0 1 89 34)'
					/>
				</clipPath>
			</defs>
		</svg>
	)
}

const Ability = {
	Any,
	Branch,
	Double,
	Repeat,
}

export default Ability
