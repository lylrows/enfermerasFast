import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { parameter } from '../models/parameter/parameter.model';
import { ResponseDTO } from '../models/response/response.model';


@Injectable({
  providedIn: 'root'
})
export class ParametrosService {

  constructor(private httpClient: HttpClient) { }

  getParametros(): Observable<ResponseDTO> {
    return this.httpClient
      .get<ResponseDTO>(`${environment.apiURL}parametros`)
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

  postParametros(parametro: parameter): Observable<ResponseDTO> {
    return this.httpClient
      .post<ResponseDTO>(`${environment.apiURL}parametros`, parametro)
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

  putParametros(parametro: parameter): Observable<ResponseDTO> {
    return this.httpClient
      .put<ResponseDTO>(`${environment.apiURL}parametros`, parametro)
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

  deleteParametros(parametro: parameter): Observable<ResponseDTO> {
    return this.httpClient
      .delete<ResponseDTO>(`${environment.apiURL}parametros`, {body: parametro})
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

  getParameterByGroupId(id: number): Observable<ResponseDTO> {
    return this.httpClient
      .get<ResponseDTO>(`${environment.apiURL}parametros/getParametersByGroupId/${id}`)
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
