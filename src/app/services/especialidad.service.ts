import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { ResponseDTO } from '../models/response/response.model';
import { Especialidad, perfilespecialidad } from '../models/speciality/especialidades.model';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  listSpeciality:any;
  listSpecialityByUser:any;
  listEspecialidades: any;

  constructor(private httpClient: HttpClient) { }

  getEspecialidades(): Observable<ResponseDTO> {
    return this.httpClient
    .get<ResponseDTO>(`${environment.apiURL}especialidades`)
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

  saveSpeciality(esp:Especialidad) : Observable<ResponseDTO> {
    return this.httpClient
    .post<ResponseDTO>(`${environment.apiURL}especialidades`, esp)
    .pipe(
      map((response) => {
      return response;
      }), catchError((error) => {
        const errorResponse: ResponseDTO = { status: error.status, description: error.message, objModel: error };
        return of(errorResponse);
      } 
    ));
  }

  updateSpeciality(esp:Especialidad) : Observable<ResponseDTO> {
    return this.httpClient
    .put<ResponseDTO>(`${environment.apiURL}especialidades`, esp)
    .pipe(
      map((response) => {
      return response;
      }), catchError((error) => {
        const errorResponse: ResponseDTO = { status: error.status, description: error.message, objModel: error };
        return of(errorResponse);
      } 
    ));
  }

  savePerfilEspecialidad(perfEsp: perfilespecialidad) : Observable<ResponseDTO>{
    return this.httpClient
    .post<ResponseDTO>(`${environment.apiURL}perfilesespecialidades`, perfEsp)
    .pipe(
      map((response) => {
      return response;
      }), catchError((error) => {
        const errorResponse: ResponseDTO = { status: error.status, description: error.message, objModel: error };
        return of(errorResponse);
      } 
    ));
  }

  deletePerfilEspecialidad(perfEsp: perfilespecialidad) : Observable<ResponseDTO>{
    let options = {
      body: perfEsp
    };
    return this.httpClient
    .delete<ResponseDTO>(`${environment.apiURL}perfilesespecialidades`, options)
    .pipe(
      map((response) => {
      return response;
      }), catchError((error) => {
        const errorResponse: ResponseDTO = { status: error.status, description: error.message, objModel: error };
        return of(errorResponse);
      } 
    ));
  }

  getEspecialidadDetalle(id:number) : Observable<ResponseDTO> {
    return this.httpClient
    .get<ResponseDTO>(`${environment.apiURL}especialidades/getEspecialidadDetalle/`+ id)
    .pipe(
      map((response) => {
      return response;
      }), catchError((error) => {
        const errorResponse: ResponseDTO = { status: error.status, description: error.message, objModel: error };
        return of(errorResponse);
      } 
    ));
  }


}
