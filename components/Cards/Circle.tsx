import { colors } from '@/store/colors.store'
import { TCard } from '@/types/card.types'
import { FC } from 'react'

export const Circle: FC<TCard> = ({ color, className }) => {
	return (
		<svg
			width='200'
			height='120'
			viewBox='0 0 200 120'
			fill='none'
			data-is-red={color === colors.cardRed}
			className={className}
		>
			<g clipPath='url(#clip0_18_221)'>
				<rect width='200' height='120' rx='10' fill='white' />
				<path
					d='M2 10C2 5.58172 5.58172 2 10 2H190C194.418 2 198 5.58172 198 10V111H2V10Z'
					fill={color}
				/>
				<path
					d='M2.5 32H10.5V23H53.5V35.5H60V43H80V49.5M80 49.5H69.5V94M80 49.5H89.5M69.5 113V111M124 49.5V40H143M124 49.5H113M124 49.5V91.5M89.5 49.5V21.5L113 10.5V49.5M89.5 49.5H113M143 40H148V48M143 40C143 40 144.286 35.6523 146.193 30M173.5 40C171.155 33.3535 169.33 29.8372 165 24M173.5 40C172.643 36.4297 171.542 32.0029 170.277 27.5M173.5 40C173.81 41.2931 174.083 42.6344 174.323 44M176 69.5C170.279 50.1081 165.131 40.1295 156 24M176 69.5C176 69.5 176.089 66.4574 175.966 62M176 69.5V91.25M101 37.5V45M105 27V45M108.5 19V45M14.5 25.5H49.5M14.5 27.5H49.5M14.5 29.5H49.5M14.5 31.5H49.5M74 54V62M76 54V62M78 54V62M80 54V62M128 44H144.5M144.5 49.5H128M144.5 53.5H128M144.5 58H128M144.5 62.5H128M148.293 24C151.718 14.5818 156.069 4.5 159 4.5C162.522 4.5 166.25 13.9329 169.263 24M148.293 24C147.54 26.0701 146.832 28.1081 146.193 30M148.293 24C159.972 39.9523 164.035 50.009 171 69.5M148.293 24H156M169.263 24H165M169.263 24C169.611 25.1627 169.949 26.3339 170.277 27.5M146.193 30C154.199 43.7267 158.311 52.397 165 69.5M156 24H159M165 24C157.268 39.6743 153.561 49.6703 148 69.5M165 24H159M148 69.5V48M148 69.5V91.25M159 24C153.911 32.8661 151.498 38.1178 148 48M170.277 27.5C162.744 43.1059 159.217 52.3278 154 69.5M174.323 44H191V31.5H200M174.323 44C175.421 50.2505 175.827 57.0113 175.966 62M175.966 62H192V113M185 49V57.5M187 49V57.5M189 49V57.5M191 49V57.5M62 21.5L66.5 16M67 21.5L71.5 16M71.5 21.5L76 16M76 21.5L80.5 16M18.5 5.5L21 7.5L23.5 4.5M25 11.5L27.5 14L31 9.5M60 14H87C87 14 87.3369 12.4163 87 11.5C86.2743 9.52613 85.0796 9.31306 83 9C81.6484 8.79653 78.5 9.5 78.5 9.5C78.5 9.5 76.3412 5.69161 74 4.5C71.0417 2.99427 68.5256 3.13447 65.5 4.5C62.6028 5.8076 60.6848 7.39601 60 10.5C59.7055 11.8347 60 14 60 14Z'
					stroke='white'
				/>
				<line
					x1='166.431'
					y1='111.24'
					x2='166.431'
					y2='90.6211'
					stroke='black'
					strokeWidth='2'
				/>
				<line
					x1='160.64'
					y1='90.8512'
					x2='166.263'
					y2='96.4746'
					stroke='black'
					strokeWidth='2'
				/>
				<circle
					cx='167.431'
					cy='67.1905'
					r='22.4306'
					fill='#439E02'
					stroke='black'
					strokeWidth='2'
				/>
				<circle
					cx='154.309'
					cy='84.0605'
					r='8.37223'
					fill='#439E02'
					stroke='black'
					strokeWidth='2'
				/>
				<circle
					cx='2.46835'
					cy='2.46835'
					r='2.46835'
					transform='matrix(-1 0 0 1 177.304 106.911)'
					fill='#05053C'
				/>
				<circle
					cx='2.46835'
					cy='2.46835'
					r='2.46835'
					transform='matrix(-1 0 0 1 160.848 106.911)'
					fill='#05053C'
				/>
				<circle
					cx='2.46835'
					cy='2.46835'
					r='2.46835'
					transform='matrix(-1 0 0 1 146.038 106.911)'
					fill='#05053C'
				/>
				<circle
					cx='2.46835'
					cy='2.46835'
					r='2.46835'
					transform='matrix(-1 0 0 1 131.228 106.911)'
					fill='#05053C'
				/>
				<path
					d='M123 78.9367V106.911H167.474H188V93.7468L185.532 91.2785H174.013V78.9367L169.899 74H148.658H128.759L123 78.9367Z'
					fill='#FACC01'
				/>
				<path
					d='M167.474 106.911H188V93.7468L185.532 91.2785H174.013V78.9367L169.899 74H148.658M167.474 106.911H123V78.9367L128.759 74H148.658M167.474 106.911V91.2785H152.934V79.9868L148.658 74'
					stroke='black'
				/>
				<rect
					x='0.5'
					y='-0.5'
					width='18.1053'
					height='9.22785'
					transform='matrix(-1 0 0 1 173.367 82.2278)'
					fill='#E0D2D2'
					stroke='black'
				/>
				<rect
					x='0.5'
					y='-0.5'
					width='9.22785'
					height='9.22785'
					transform='matrix(-1 0 0 1 150.329 82.2278)'
					fill='#E0D2D2'
					stroke='black'
				/>
				<rect
					x='0.5'
					y='-0.5'
					width='9.22785'
					height='9.22785'
					transform='matrix(-1 0 0 1 138.81 82.2278)'
					fill='#E0D2D2'
					stroke='black'
				/>
				<circle
					cx='2.46835'
					cy='2.46835'
					r='2.46835'
					transform='matrix(-1 0 0 1 177.304 95.3924)'
					fill='black'
				/>
				<circle
					cx='2.46835'
					cy='2.46835'
					r='2.46835'
					transform='matrix(-1 0 0 1 185.532 95.3924)'
					fill='black'
				/>
				<path
					d='M90.5 105.5C88.9751 105.839 86.5 105.5 86.5 105.5C86.5 105.5 84.3437 105.75 83 105.5C79.0613 104.766 76.8456 102.274 75.5 98.5C74.5162 95.7412 75.5 91 75.5 91L85.5 58L97.5 91C97.5 91 98.4647 95.7345 97.5 98.5C96.2266 102.15 94.2739 104.661 90.5 105.5Z'
					fill='#39940A'
				/>
				<path
					d='M86.5 111V105.5M86.5 105.5C86.5 105.5 88.9751 105.839 90.5 105.5C94.2739 104.661 96.2266 102.15 97.5 98.5C98.4647 95.7345 97.5 91 97.5 91L85.5 58L75.5 91C75.5 91 74.5162 95.7412 75.5 98.5C76.8456 102.274 79.0613 104.766 83 105.5C84.3437 105.75 86.5 105.5 86.5 105.5Z'
					stroke='black'
				/>
				<path
					d='M3 114H197V114C197 116.209 195.209 118 193 118H7C4.79086 118 3 116.209 3 114V114Z'
					fill='#7DBAD7'
				/>
				<mask id='path-23-inside-1_18_221' fill='white'>
					<path d='M74 112C74 110.424 73.6508 108.864 72.9724 107.408C72.2939 105.952 71.2995 104.629 70.0459 103.515C68.7924 102.4 67.3041 101.517 65.6662 100.913C64.0283 100.31 62.2728 100 60.5 100C58.7272 100 56.9717 100.31 55.3338 100.913C53.6959 101.517 52.2076 102.4 50.9541 103.515C49.7005 104.629 48.7061 105.952 48.0276 107.408C47.3492 108.864 47 110.424 47 112L60.5 112H74Z' />
				</mask>
				<path
					d='M74 112C74 110.424 73.6508 108.864 72.9724 107.408C72.2939 105.952 71.2995 104.629 70.0459 103.515C68.7924 102.4 67.3041 101.517 65.6662 100.913C64.0283 100.31 62.2728 100 60.5 100C58.7272 100 56.9717 100.31 55.3338 100.913C53.6959 101.517 52.2076 102.4 50.9541 103.515C49.7005 104.629 48.7061 105.952 48.0276 107.408C47.3492 108.864 47 110.424 47 112L60.5 112H74Z'
					fill='#571C6E'
					stroke='black'
					strokeWidth='2'
					mask='url(#path-23-inside-1_18_221)'
				/>
				<line x1='32' y1='113' x2='32' y2='81' stroke='black' strokeWidth='2' />
				<circle
					cx='32'
					cy='57'
					r='23'
					fill='white'
					stroke='black'
					strokeWidth='2'
				/>
				<rect
					x='20'
					y='45'
					width='24'
					height='24'
					rx='12'
					fill='white'
					stroke='black'
					strokeWidth='2'
				/>
				<path
					d='M63 73V110.5H87.5V73L83 70.5H67L63 73Z'
					fill='#FF195D'
					stroke='black'
				/>
				<path
					d='M74.5 106.5L73.5 105.5V101.75V98V94.5V91V87.5V84V80.5L74.5 79.5H77H80.5H83L84 80.5V84V87.5V91V94.5V98V101.75V105.5L83 106.5H80.5H77H74.5Z'
					fill='#D9D9D9'
				/>
				<path
					d='M70 110.5V70.5M63 76H87.5M73.5 84V80.5L74.5 79.5H77M73.5 84H84M73.5 84V87.5M84 84V80.5L83 79.5H80.5M84 84V87.5M73.5 87.5H84M73.5 87.5V91M84 87.5V91M73.5 91H84M73.5 91V94.5M84 91V94.5M73.5 94.5H84M73.5 94.5V98M84 94.5V98M73.5 98H84M73.5 98V101.75M84 98V101.75M73.5 101.75V105.5L74.5 106.5H77M73.5 101.75H84M84 101.75V105.5L83 106.5H80.5M77 106.5V79.5M77 106.5H80.5M77 79.5H80.5M80.5 79.5V106.5'
					stroke='black'
				/>
				<path d='M94.5 111.5V101H127.5V111.5' stroke='black' strokeWidth='2' />
				<path
					d='M104 101H111H114.5V92C114.5 92 113.775 90.3339 113 89.5C112.335 88.7849 112 88.5 111 88C108.28 86.6399 106.165 88.7849 105.5 89.5C104.725 90.3339 104 92 104 92V101Z'
					fill='#0D9CD7'
				/>
				<path
					d='M113.5 111V103L111 101M111 101H104V92C104 92 104.725 90.3339 105.5 89.5C106.165 88.7849 108.28 86.6399 111 88C112 88.5 112.335 88.7849 113 89.5C113.775 90.3339 114.5 92 114.5 92V101M111 101H114.5M114.5 101L118 103V111'
					stroke='black'
				/>
				<path
					d='M104.5 91C104.5 91 100.894 92.962 100.5 95C100.352 95.7669 100.012 96.3901 100.5 97C101.11 97.7624 102.524 97.5 103.5 97.5C105.062 97.5 107 97 107 97'
					stroke='black'
				/>
				<path
					d='M109.5 92L105.5 101H115.5L119 92H109.5Z'
					fill='#D9D9D9'
					stroke='black'
				/>
				<circle cx='109' cy='83' r='2' fill='black' />
				<path
					d='M138.5 97.5C138.5 97.5 137.387 94.3601 138.5 93C139.86 91.3376 142.64 91.3376 144 93C145.113 94.3601 144 97.5 144 97.5'
					stroke='black'
				/>
				<path
					d='M145 96.5H144H138.5H138H137C137 96.5 136.321 99.3789 137 101C137.483 102.153 137.904 102.899 139 103.5C140.37 104.251 141.63 104.251 143 103.5C144.096 102.899 144.517 102.153 145 101C145.679 99.3789 145 96.5 145 96.5Z'
					fill='#1DADE3'
					stroke='black'
				/>
				<path
					d='M132.5 98H129.5L132.5 89.5L131.5 85.5V82L133 80H136L137.5 82V85.5L137 89.5L139.5 98H136H132.5Z'
					fill='#A91955'
				/>
				<path
					d='M132.5 111.5V98M132.5 98H129.5L132.5 89.5M132.5 98H136M132.5 89.5L131.5 85.5V82L133 80H136L137.5 82V85.5L137 89.5M132.5 89.5H137M137 89.5L139.5 98H136M136 98V111.5'
					stroke='black'
				/>
				<path
					d='M138.392 82.6897C138.221 82.4732 137.906 82.4366 137.69 82.6079C137.473 82.7793 137.437 83.0937 137.608 83.3103L138.392 82.6897ZM140.892 88.4783L141.384 88.39L140.892 88.4783ZM138 83C137.608 83.3103 137.608 83.3102 137.608 83.3102C137.608 83.3102 137.608 83.3102 137.608 83.3102C137.608 83.3102 137.608 83.3103 137.608 83.3104C137.608 83.3106 137.609 83.3111 137.609 83.3117C137.61 83.3129 137.612 83.3148 137.614 83.3175C137.618 83.3229 137.624 83.3312 137.633 83.3422C137.65 83.3644 137.676 83.3977 137.709 83.4412C137.775 83.5283 137.871 83.6562 137.987 83.8173C138.22 84.1398 138.536 84.5939 138.863 85.1194C139.529 86.1869 140.206 87.4877 140.4 88.5665L141.384 88.39C141.155 87.1107 140.386 85.6724 139.712 84.5903C139.369 84.041 139.041 83.5676 138.798 83.2314C138.676 83.0632 138.575 82.9289 138.505 82.8361C138.47 82.7897 138.442 82.7537 138.423 82.729C138.413 82.7166 138.406 82.7071 138.401 82.7005C138.398 82.6972 138.396 82.6947 138.395 82.6929C138.394 82.692 138.393 82.6913 138.393 82.6907C138.393 82.6905 138.392 82.6902 138.392 82.6901C138.392 82.69 138.392 82.6899 138.392 82.6899C138.392 82.6898 138.392 82.6897 138 83ZM140.4 88.5665C140.511 89.1874 140.514 90.0218 140.484 90.7262C140.469 91.0732 140.446 91.3792 140.428 91.5982C140.419 91.7076 140.41 91.795 140.404 91.8547C140.401 91.8845 140.399 91.9073 140.397 91.9225C140.397 91.9301 140.396 91.9358 140.396 91.9394C140.395 91.9412 140.395 91.9426 140.395 91.9434C140.395 91.9438 140.395 91.944 140.395 91.9442C140.395 91.9443 140.395 91.9443 140.395 91.9443C140.395 91.9443 140.395 91.9443 140.395 91.9443C140.395 91.9443 140.395 91.9442 140.892 92C141.389 92.0558 141.389 92.0557 141.389 92.0557C141.389 92.0556 141.389 92.0556 141.389 92.0555C141.389 92.0554 141.389 92.0552 141.389 92.055C141.389 92.0546 141.389 92.0541 141.389 92.0535C141.389 92.0522 141.389 92.0504 141.39 92.0481C141.39 92.0435 141.391 92.0368 141.392 92.0282C141.394 92.011 141.396 91.986 141.399 91.9539C141.406 91.8898 141.415 91.7974 141.424 91.6826C141.444 91.4531 141.467 91.1329 141.483 90.7689C141.513 90.0515 141.516 89.1251 141.384 88.39L140.4 88.5665Z'
					fill='black'
				/>
				<path
					d='M131.5 82.5C131.5 82.5 128.419 84.113 128 86C127.831 86.7624 127.725 87.269 128 88C128.588 89.5613 132 89.5 132 89.5'
					stroke='black'
				/>
				<circle cx='135' cy='76' r='2' fill='black' />
				<line y1='112.5' x2='200' y2='112.5' stroke='#04276B' strokeWidth='3' />
			</g>
			<rect
				x='1'
				y='1'
				width='198'
				height='118'
				rx='9'
				stroke='black'
				strokeWidth='2'
			/>
			<defs>
				<clipPath id='clip0_18_221'>
					<rect width='200' height='120' rx='10' fill='white' />
				</clipPath>
			</defs>
		</svg>
	)
}
