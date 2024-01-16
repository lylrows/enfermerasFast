import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  
  constructor(private httpClient: HttpClient) { }

  // getGeolocation(): Observable<any> {
  //   return this.httpClient.post<any>("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDxR7idb5PPstlEWs04HHiobs7KkYuS3nQ", null);
  // }

  getGeocode(lat: number, lng: number): Observable<any> {
    return this.httpClient.get<any>(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&result_type=street_address&key=AIzaSyDxR7idb5PPstlEWs04HHiobs7KkYuS3nQ`);
  }

}
