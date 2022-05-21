
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
		crs: L.CRS.Simple,
	},
).addTo(map)

map.setMaxBounds(new L.LatLngBounds(

))

/**
 * debugMarker - маркер для создания новых маркеров на карте через админку, показывает свои координаты при перетаскивании
 */
const debugMarker = L.marker([0, 0], {
	draggable: true,
}).addTo(map)
debugMarker.bindPopup('🦕 debugMarker [draggable]').openPopup()
debugMarker.on('dragend', () => {
	debugMarker.getPopup().setContent(`🦕 ${debugMarker.getLatLng().toString()}`).openOn(map)
})
