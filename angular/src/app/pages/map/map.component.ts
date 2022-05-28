import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  icon = {
    icon: L.icon({
    iconSize: [ 25, 41 ],
    iconAnchor: [ 13, 0 ],
    iconUrl: 'assets/marker-icon.png',
    shadowUrl: 'assets/marker-shadow.png',
    popupAnchor: [13, 0],
  })};

  initMap(): void { 
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
          const map = L.map('map', {
            center: [ position.coords.latitude, position.coords.longitude ],
            zoom: 15
          });

          L.control.scale().addTo(map);

          const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            minZoom: 15,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          });

          tiles.addTo(map);

          const provider = new OpenStreetMapProvider();

          const searchControl = new (GeoSearchControl as any)({
            provider: provider,
            style: 'bar', // optional: bar|button  - default button
          });
          //searchControl.addTo(map);
          //map.addControl(searchControl);
          
          let marker = L.marker([position.coords.latitude, position.coords.longitude], this.icon);
          marker.addTo(map);

          map.on('geosearch/showlocation', () => {
            if (marker) {
              // check
              map.removeLayer(marker); // remove
            }
            map.eachLayer(item => {
              if (item instanceof L.Marker) {
                // Once you found it, set the properties
                item.options.draggable = true;
                item.options.autoPan = true;
                // Then enable the dragging. Without this, it wont work
                item.dragging!.enable();
              }
            });
          });
      });
    }
  };

  constructor() { }

  ngOnInit(): void {
   this.initMap();
  }
}
