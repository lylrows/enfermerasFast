import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { certifications } from '../models/certification/certifications.model';
import { ResponseDTO } from '../models/response/response.model';

@Injectable({
  providedIn: 'root'
})
export class CertificacionService {

    listCertification:any;

  constructor(private httpClient: HttpClient) { }

  saveCertification(certf:certifications) : Observable<ResponseDTO> {
    return this.httpClient
    .post<ResponseDTO>(`${environment.apiURL}perfilescertificados`, certf)
    .pipe(
      map((response) => {
      return response;
      }), catchError((error) => {
        const errorResponse: ResponseDTO = { status: error.status, description: error.message, objModel: error };
        return of(errorResponse);
      } 
    ));
  }

  updateCertification(certf:certifications){
    return this.httpClient
    .put<ResponseDTO>(`${environment.apiURL}perfilescertificados`, certf)
    .pipe(
      map((response) => {
      return response;
      }), catchError((error) => {
        const errorResponse: ResponseDTO = { status: error.status, description: error.message, objModel: error };
        return of(errorResponse);
      } 
    ));
  }

  getCertification() : Observable<ResponseDTO> {
    return this.httpClient
    .get<ResponseDTO>(`${environment.apiURL}perfilescertificados`)
    .pipe(
      map((response) => {
      return response;
      }), catchError((error) => {
        const errorResponse: ResponseDTO = { status: error.status, description: error.message, objModel: error };
        return of(errorResponse);
      } 
    ));
  }

  getCertificadoDetalle(id:number) : Observable<ResponseDTO>{
    return this.httpClient
    .get<ResponseDTO>(`${environment.apiURL}perfilescertificados/getCertificadoDetalle/`+ id)
    .pipe(
      map((response) => {
      return response;
      }), catchError((error) => {
        const errorResponse: ResponseDTO = { status: error.status, description: error.message, objModel: error };
        return of(errorResponse);
      } 
    ));
  }

  deletePerfilCertificado(cert: certifications) : Observable<ResponseDTO>{
    let options = {
      body: cert
    };
    return this.httpClient
    .delete<ResponseDTO>(`${environment.apiURL}perfilescertificados`, options)
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