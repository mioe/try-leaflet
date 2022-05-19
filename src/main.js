import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './style.css'

const map = L.map('map').setView([50, -50], 2)

L.tileLayer(
	'/map.png',
	{
		maxZoom: 6,
		minZoom: 1,
		tileSize: 256,
	},
).addTo(map)
