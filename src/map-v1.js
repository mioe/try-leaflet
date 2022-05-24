
/**
 * init map
 */
const map = L.map('map', {
	fullscreenControl: true,
	fullscreenControlOptions: {
		position: 'topleft',
	},
}).setView([0, 0], 1)

/**
 * set map tiles
 */
L.tileLayer(
	'/map_4096x4096/{z}/{x}/{y}.png',
	{
		minZoom: 3,
		maxZoom: 4,
		continuousWorld: false,
		noWrap: true,
		// crs: L.CRS.Simple,
	},
).addTo(map)


/**
 * pixel limit
 */
// const mapSW = [0, 4096]
// const mapNE = [4096, 0]
// map.setMaxBounds(new L.LatLngBounds(
// 	map.unproject(mapSW, map.getMaxZoom()),
// 	map.unproject(mapNE, map.getMaxZoom()),
// ))

/**
 * debugMarker - маркер для создания новых маркеров на карте через админку, показывает свои координаты при перетаскивании
 */
const debugMarker = L.marker([0, 0], {
	draggable: true,
}).addTo(map)
debugMarker.bindPopup('🦕 debugMarker [draggable]').openPopup()
debugMarker.on('dragend', () => {
	debugMarker.getPopup().setContent(`🦕 ${debugMarker.getLatLng().toString()} <br>🦕 ${map.project(debugMarker.getLatLng(), map.getMaxZoom().toString())}`).openOn(map)
})


const svgIcon = L.divIcon({
	html: `
		<svg viewBox="0 0 49 65" fill="none" xmlns="http://www.w3.org/2000/svg">
		<g filter="url(#filter0_d_8_19)">
		<path d="M25.4893 0L28.1018 0.315428C31.3803 0.751255 34.4813 2.06561 37.0786 4.12029C39.8888 6.43025 41.942 9.53496 42.9714 13.0311C44.0946 16.5549 44.5216 20.2649 44.2286 23.9529C43.902 27.5379 42.9233 31.0326 41.3411 34.2634C37.8901 41.3408 33.3935 47.8543 28.0036 53.5834C27.2571 54.3917 26.5107 55.2 25.725 55.9886C25.542 56.2334 25.3048 56.4321 25.032 56.569C24.7593 56.7059 24.4585 56.7771 24.1536 56.7771C23.8486 56.7771 23.5479 56.7059 23.2751 56.569C23.0024 56.4321 22.7651 56.2334 22.5821 55.9886C16.9369 50.3363 12.116 43.9116 8.2625 36.9051C6.30077 33.392 4.93965 29.5736 4.23572 25.6089C3.92143 23.2075 3.92143 20.7751 4.23572 18.3737C4.51175 15.262 5.39263 12.2346 6.82857 9.46286C8.81058 5.70122 12.1151 2.81334 16.1 1.36029C18.1469 0.620782 20.2915 0.188974 22.4643 0.0788571C22.5886 0.0861852 22.7132 0.0861852 22.8375 0.0788571L25.4893 0ZM14.0768 18.2357C14.0807 20.2343 14.6745 22.1869 15.7832 23.847C16.892 25.5071 18.4659 26.8003 20.3064 27.5633C22.1469 28.3264 24.1714 28.525 26.1243 28.1341C28.0771 27.7433 29.8708 26.7805 31.2789 25.3673C32.687 23.9541 33.6463 22.1538 34.0358 20.1938C34.4252 18.2339 34.2273 16.202 33.467 14.3549C32.7068 12.5077 31.4183 10.928 29.7642 9.8152C28.1101 8.70243 26.1645 8.10647 24.1732 8.10257C21.4955 8.10257 18.9274 9.17017 17.034 11.0705C15.1405 12.9708 14.0768 15.5482 14.0768 18.2357V18.2357Z" fill="white"/>
		</g>
		<defs>
		<filter id="filter0_d_8_19" x="0" y="0" width="48.3181" height="64.7772" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
		<feFlood flood-opacity="0" result="BackgroundImageFix"/>
		<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
		<feOffset dy="4"/>
		<feGaussianBlur stdDeviation="2"/>
		<feComposite in2="hardAlpha" operator="out"/>
		<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
		<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_8_19"/>
		<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_8_19" result="shape"/>
		</filter>
		</defs>
		</svg>
	`,
	className: 'svg-icon',
	iconSize: [23, 32],
})

const markers = window.mapMarkers || []

markers.forEach(marker => {
	L.marker(map.unproject(marker.coordinates, map.getMaxZoom()), { icon: svgIcon, title: marker.name })
		.addTo(map)
		.bindPopup(`🦕 ${marker.name}`)
		.openPopup()
})
