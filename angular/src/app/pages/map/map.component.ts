import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map: any;

  icon = {
    icon: L.icon({
    iconSize: [ 25, 41 ],
    iconAnchor: [ 13, 0 ],
    iconUrl: 'assets/images/marker-icon.png',
    shadowUrl: 'assets/images/marker-shadow.png',
    popupAnchor: [13, 0],
  })};

  initMap(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
          // latitude: ,
          // longitude: ,
          console.log(position.coords.latitude,position.coords.longitude );
          this.map = L.map('map', {
            center: [ position.coords.latitude, position.coords.longitude ],
            zoom: 15
          });

          const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            minZoom: 3,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          });
          tiles.addTo(this.map);
    
          const marker = L.marker([position.coords.latitude, position.coords.longitude], this.icon);
          marker.addTo(this.map);
      });
    }
  };

  constructor() { }

  ngOnInit(): void {
   this.initMap();
  }
}
