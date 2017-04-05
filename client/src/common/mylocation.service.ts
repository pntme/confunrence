import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
declare var google;

@Injectable()
export class MyLocation {
  public constructor(private geolocation: Geolocation) { }


  Get() {
    return new Promise((resolve, reject) => {
      this.geolocation.getCurrentPosition().then(pos => {
        var geocoder = new google.maps.Geocoder();
        var location = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        geocoder.geocode({ 'latLng': location }, (results, status) => {
          console.log(results)
        });

        resolve(pos);
      }, err => {
        reject(err);
      });
    });
  }
}
