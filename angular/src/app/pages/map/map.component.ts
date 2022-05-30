import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Loader } from '@googlemaps/js-api-loader';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(public snackBar: MatSnackBar) { }

  openSnackBar() {
    this.snackBar.openFromComponent(MapComponent, {
      duration: 500,
    });
  }

  ngOnInit(): void {
    this.initMap();
}

initMap(): void {
  let loader =new Loader({
    apiKey: 'AIzaSyAFRms9o-1WMDcaOXa58C7AYpfbsuoJ8pM&libraries=places'
  })

  loader.load().then(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        const currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        const map = new google.maps.Map(
          document.getElementById("map") as HTMLElement,
          {
            zoom: 13,
            center: currentLocation,
          }
        );

        var request = {
          location: currentLocation,
          radius: 3000,
          type: 'hospital',
          keyword: "(emergency) AND ((medical centre) OR hospital) OR (24 hours)",
        };

        let service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, (results: any, status: any) => {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              if (!results[i].geometry || !results[i].geometry.location) return;
            
              const marker = new google.maps.Marker({
                map,
                position: results[i].geometry.location,
                icon: '../../../assets/flag.png',
              });
            }
          }
        });

        const marker = new google.maps.Marker({
          position: currentLocation,
          map: map,
          draggable: true,
          animation: google.maps.Animation.DROP,
        });
      })}
})
}
}
