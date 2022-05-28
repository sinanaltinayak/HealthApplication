import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment.prod';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    (mapboxgl as any).accessToken = environment.mapboxKey;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
          const map = new mapboxgl.Map({
            container: 'map', // Container ID
            style: 'mapbox://styles/mapbox/streets-v11', // Map style to use
            center: [position.coords.longitude+0.001, position.coords.latitude-0.01], // Starting position [lng, lat]
            zoom: 14, // Starting zoom level
          });

          const marker1 = new mapboxgl.Marker()
          .setLngLat([position.coords.longitude, position.coords.latitude])
          .addTo(map);
 
          const geocoder = new MapboxGeocoder({
            // Initialize the geocoder
            accessToken: mapboxgl.accessToken, // Set the access token
            marker: false, // Do not use the default marker style
            placeholder: 'Search for places in your area',
            bbox: [position.coords.longitude - 0.02, position.coords.latitude - 0.02, position.coords.longitude + 0.02, position.coords.latitude + 0.02], // Boundary for Berkeley
            proximity: {
              longitude: position.coords.longitude,
              latitude: position.coords.latitude
            } // Coordinates of UC Berkeley
          });
          
          // Add the geocoder to the map
          map.addControl(geocoder);

          map.on('load', () => {
            map.addSource('single-point', {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: []
              }
            });
          
            map.addLayer({
              id: 'point',
              source: 'single-point',
              type: 'circle',
              paint: {
                'circle-radius': 10,
                'circle-color': '#448ee4'
              }
            });
            geocoder.on('result', (event) => {
              const source: mapboxgl.GeoJSONSource = map.getSource('single-point') as mapboxgl.GeoJSONSource
              source.setData(event.result.geometry);
            });
          
      });
      })
    }
 }
}
