import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Perfil } from '../models/perfil/perfil.model';
import { ResponseDTO } from '../models/response/response.model';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private httpClient: HttpClient) { }

  postPerfil(perfil: Perfil): Observable<ResponseDTO> {
    return this.httpClient
      .post<ResponseDTO>(`${environment.apiURL}perfiles`, perfil)
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

  putPerfil(perfil: Perfil): Observable<ResponseDTO> {
    return this.httpClient
      .put<ResponseDTO>(`${environment.apiURL}perfiles`, perfil)
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

  getPerfilById(id: number): Observable<ResponseDTO> {
    return this.httpClient
      .get<ResponseDTO>(`${environment.apiURL}perfiles/${id}`)
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

  getPerfilByUserId(id: number): Observable<ResponseDTO> {
    return this.httpClient
      .get<ResponseDTO>(`${environment.apiURL}perfiles/userId/${id}`)
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
  
  getPerfilesCercanos(lat: number, lng: number, dist: number, idServicio: number) {
    return this.httpClient
    .get<ResponseDTO>(`${environment.apiURL}perfiles/cercanos/${lat}/${lng}/${dist}/${idServicio}`)
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
