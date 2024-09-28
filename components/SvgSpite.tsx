import MapLines from './Map/MapLines'
import MapTopBot from './Map/MapTopBot'
import SvgSymbol from './SvgSymbol'

const SvgSpite = () => {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' style={{ display: 'none' }}>
			<SvgSymbol id='map-lines'>
				<MapLines />
			</SvgSymbol>

			<SvgSymbol id='map-top-bot'>
				<MapTopBot />
			</SvgSymbol>
		</svg>
	)
}

export default SvgSpite
