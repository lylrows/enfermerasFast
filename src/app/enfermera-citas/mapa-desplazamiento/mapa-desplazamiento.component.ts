import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ModalController, NavParams } from '@ionic/angular';

import { Geolocation, WatchPositionCallback } from '@capacitor/geolocation';
import { GoogleMapComponent } from '../../components/google-map/google-map.component';
import { MapService } from '../../services/map.service';
import { PerfilService } from '../../services/perfil.service';
import { first } from 'rxjs';


@Component({
  selector: 'app-mapa-desplazamiento',
  templateUrl: './mapa-desplazamiento.component.html',
  styleUrls: ['./mapa-desplazamiento.component.scss'],
})
export class MapaDesplazamientoComponent implements AfterViewInit {

  @ViewChild(GoogleMapComponent, { static: false }) _GoogleMap: GoogleMapComponent;

  map: google.maps.Map;
  mapOptions: google.maps.MapOptions = {
    zoom: 15,
    center: { lat: -34.9199842, lng: -56.149849 },
    // uncomment the following line if you want to remove the default Map controls
    disableDefaultUI: true
  };
  loadingElement: any;

  markerPaciente: google.maps.Marker = null;
  marker: google.maps.Marker = null;

  myLatLng: any = null;

  perfil = null;

  watchId: any;

  firstTime = true;

  constructor(
    private loadingController: LoadingController,
    private modalCtrl: ModalController,
    private mapService: MapService,
    private navpar: NavParams,
    private perfilService: PerfilService
  ) { }

  ngAfterViewInit(): void {
    // GoogleMapComponent should be available
    this._GoogleMap.$mapReady.subscribe(map => {
      this.map = map;
    });
    this.createLoader();
  }

  ionViewDidEnter() {
    this.firstTime = true;
    let cita = this.navpar.get('cita');
    this.getPerfilPaciente(cita.idPaciente);
    this.getCurrentPosition();
  }

  getCurrentPosition() {
    const callback: WatchPositionCallback = (position) => {
      //console.log("Mi posición actual", position);

      this.myLatLng = { lat: position.coords.latitude, lng: position.coords.longitude };

      this.createMarker();
    };

    const options = {
      'enableHighAccuracy': false,
      'maximumAge': 0,
      'timeout': Infinity
    }

    this.watchId = Geolocation.watchPosition(options, callback).then((callbackId: any) => {
      this.watchId = callbackId;
    })


  }

  getPerfilPaciente(idPaciente) {

    this.perfilService.getPerfilByUserId(idPaciente).subscribe({
      next: (response) => {

        this.perfil = response.objModel;
        //console.log(this.perfil, idPaciente);
        this.createMarkerPaciente({ lat: this.perfil.latitud, lng: this.perfil.longitud });
      }
    })
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

    if (this.marker != null) {
      this.marker.setMap(null);
    }

    if (this.firstTime) {
      this.map.panTo(this.myLatLng);
      this.firstTime = false;
    }

    // add a marker
    this.marker = new google.maps.Marker({
      position: this.myLatLng,
      title: 'Mi ubicación',
      icon: {
        url: '../../assets/icon/enfermera-icon.png',
        size: new google.maps.Size(32, 32), // tamaño deseado en píxeles

      }
    });

    this.marker.setMap(this.map);
  }


  public createMarkerPaciente(LatLng): void {

    //console.log("Agrega el paciente en", LatLng);

    if (this.markerPaciente != null) {
      this.markerPaciente.setMap(null);
    }

    this.map.panTo(LatLng);


    // add a marker
    this.markerPaciente = new google.maps.Marker({
      position: LatLng,
      title: 'Mi ubicación',
      icon: {
        url: '../../assets/icon/paciente-icon.png',
        size: new google.maps.Size(32, 32), // tamaño deseado en píxeles

      }
    });

    var contentString = '<div id="content">' +
      `<p>Ubicación paciente: ${LatLng.lat}  ${LatLng.lng}</p>` +
      '<a href='+`https://www.google.com/maps?q=${LatLng.lat},${LatLng.lng}`+ ' target="_blank">Ver en Google Maps</a>' +
      '</div>';

    (function (marker, map) {
      var infoWindow = new google.maps.InfoWindow({
        content:  contentString
      });

      // Agregue el event listener 'click' al marcador
      marker.addListener('click', function () {
        infoWindow.open(map, marker);
      });

    })(this.markerPaciente, this.map);

    this.markerPaciente.setMap(this.map);
    if (this.markerPaciente) {
      const start = new google.maps.LatLng(this.myLatLng);
      const end = new google.maps.LatLng(this.markerPaciente.getPosition().toJSON());
      this.addRouteLine(start, end);
    }
    if (this.marker) {
      const start = new google.maps.LatLng(this.marker.getPosition().toJSON());
      const end = new google.maps.LatLng(LatLng);
      this.addRouteLine(start, end);
    }
  }

  ionViewDidLeave() {
    Geolocation.clearWatch({ id: this.watchId }).then(() => {
      //console.log("Se borra el watchId", this.watchId);
    })
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
  addRouteLine(start: google.maps.LatLng, end: google.maps.LatLng): void {
    const routePath = new google.maps.Polyline({
      path: [start, end],
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
  
    routePath.setMap(this.map);
  }
  /*addRouteLine(start: google.maps.LatLng, end: google.maps.LatLng): void {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({ suppressMarkers: true });
  
    directionsRenderer.setMap(this.map);
  
    const request: google.maps.DirectionsRequest = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.DRIVING
    };
  
    directionsService.route(request, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(response);
      } else {
        console.error('Error al obtener la ruta:', status);
      }
    });
  }*/
}
