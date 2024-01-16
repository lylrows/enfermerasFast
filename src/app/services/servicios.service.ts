import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment';

import { ResponseDTO } from '../models/response/response.model';
import { Servicio } from '../models/servicio/servicio.model';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  constructor(private httpClient: HttpClient) { }

  getServices(): Observable<ResponseDTO> {
    return this.httpClient
      .get<ResponseDTO>(`${environment.apiURL}servicios`)
      .pipe(
        map((response) => {
          return response;
        }), catchError((error) => {
          const errorResponse: ResponseDTO = { status: error.status, description: error.message, objModel: error };
          return of(errorResponse);
        }
        ));
  }

  postServicio(service: Servicio): Observable<ResponseDTO> {
    return this.httpClient
      .post<ResponseDTO>(`${environment.apiURL}servicios`, service)
      .pipe(
        map((response) => {
          return response;
        }), catchError((error) => {
          const errorResponse: ResponseDTO = { status: error.status, description: error.message, objModel: error };
          return of(errorResponse);
        }
        )
      );
  }

  putServicio(service: Servicio): Observable<ResponseDTO> {
    return this.httpClient
      .put<ResponseDTO>(`${environment.apiURL}servicios`, service)
      .pipe(
        map((response) => {
          return response;
        }), catchError((error) => {
          const errorResponse: ResponseDTO = { status: error.status, description: error.message, objModel: error };
          return of(errorResponse);
        }
        )
      );
  }

  deleteServicio(service: Servicio): Observable<ResponseDTO> {
    return this.httpClient
      .delete<ResponseDTO>(`${environment.apiURL}servicios`, { body: service})
      .pipe(
        map((response) => {
          return response;
        }), catchError((error) => {
          const errorResponse: ResponseDTO = { status: error.status, description: error.message, objModel: error };
          return of(errorResponse);
        }
        )
      );
  }
}