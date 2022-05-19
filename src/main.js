import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './style.css'

const map = L.map('map').setView([0, 0], 1)

L.tileLayer(
	'/map/{z}/{x}/{y}.png',
	{
		minZoom: 3,
		maxZoom: 6,
		continuousWorld: false,
		noWrap: true,
	},
).addTo(map)
