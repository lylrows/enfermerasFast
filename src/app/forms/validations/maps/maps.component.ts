import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';

import { Geolocation } from '@capacitor/geolocation';

import { GoogleMapComponent } from '../../../components/google-map/google-map.component';
import { MapService } from '../../../services/map.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements AfterViewInit {

  @ViewChild(GoogleMapComponent, { static: false }) _GoogleMap: GoogleMapComponent;
  map: google.maps.Map;
  mapOptions: google.maps.MapOptions = {
    zoom: 15,
    center: { lat: -34.9199842, lng: -56.149849 },
    // uncomment the following line if you want to remove the default Map controls
    disableDefaultUI: true
  };
  loadingElement: any;

  marker: google.maps.Marker = null;

  myLatLng: any = null;

  constructor(
    private loadingController: LoadingController,
    private modalCtrl: ModalController,
    private mapService: MapService
  ) { }

  ngAfterViewInit(): void {
    // GoogleMapComponent should be available
    this._GoogleMap.$mapReady.subscribe(map => {
      this.map = map;
      this.map.addListener('click', (resp) => {

        this.myLatLng = { lat: resp.latLng.lat(), lng: resp.latLng.lng() };

        this.createMarker();

      });
    });
    this.createLoader();
  }

  async createLoader() {
    this.loadingElement = await this.loadingController.create({
      message: 'Trying to get your current location...'
    });
  }

  async presentLoader() {
    await this.loadingElement.present();
  }

  async dismissLoader() {
    if (this.loadingElement) {
      await this.loadingElement.dismiss();
    }
  }

  public createMarker(): void {

    if(this.marker != null) {
      this.marker.setMap(null);
    }
    
    this.map.panTo(this.myLatLng);

    // add a marker
    this.marker = new google.maps.Marker({
      position: this.myLatLng,
      title: 'Mi ubicación',
    });

    //console.log("Mi ubicación", this.myLatLng);

    this.marker.setMap(this.map);

  }

  public geolocateMe(): void {
    this.presentLoader();

    Geolocation.getCurrentPosition().then(position => {

      this.myLatLng = { lat: position.coords.latitude, lng: position.coords.longitude };

      this.createMarker();

    }).catch((error) => {
      //console.log('Error getting current location', error);

    }).finally(() => this.dismissLoader());
  }

  confirmLocate() {
    this.mapService.getGeocode(this.myLatLng.lat, this.myLatLng.lng).subscribe({
      next: (response) => {
        if (response != null) {
          const myAddress = response.results[0].formatted_address;

          return this.modalCtrl.dismiss({
            latitud: this.myLatLng.lat,
            longitud: this.myLatLng.lng,
            direccion: myAddress
          });

        }
      },
      error: (error) => {
        //console.log("Error");
      }
    });
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}
