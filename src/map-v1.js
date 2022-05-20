const map = L.map('map', {
	fullscreenControl: true,
	fullscreenControlOptions: {
		position: 'topleft',
	},
}).setView([0, 0], 1)

L.tileLayer(
	'/map_4096x4096/{z}/{x}/{y}.png',
	{
		minZoom: 3,
		maxZoom: 4,
		continuousWorld: false,
		noWrap: true,
	},
).addTo(map)

const debugMarker = L.marker([0, 0], {
	draggable: true,
}).addTo(map)
debugMarker.bindPopup('🦕 debugMarker').openPopup()
debugMarker.on('dragend', () => {
	debugMarker.getPopup().setContent(`🦕 ${debugMarker.getLatLng().toString()}`).openOn(map)
})
