import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Pago } from '../models/Pago/pago.model';
import { ResponseDTO } from '../models/response/response.model';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  constructor(private httpClient: HttpClient  ) { }

  postPago(pago: Pago): Observable<ResponseDTO> {
    return this.httpClient
      .post<ResponseDTO>(`${environment.apiURL}pagos`, pago)
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
