import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { observation } from '../models/Cita/observation.model';
import { Cita } from '../models/cita/cita.model';
import { triage } from '../models/Cita/triage.model';
import { citarating } from '../models/Cita/citarating.model'
import { ResponseDTO } from '../models/response/response.model';
import { CitaDetalle } from '../models/cita/citaDetalle.model';


@Injectable({
  providedIn: 'root'
})

export class CitasService {

  listCitas: any;
  listChats: any;

  constructor(private httpClient: HttpClient) { }

  getCitasDetalleRol(option: number, id: number): Observable<ResponseDTO> {
    return this.httpClient
      .get<ResponseDTO>(`${environment.apiURL}citas/getCitaDetalleRol/${option}/${id}`)
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

  updateObs(obs: observation): Observable<ResponseDTO> {
    return this.httpClient
      .put<ResponseDTO>(`${environment.apiURL}citas`, obs)
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

  getCita(id: number): Observable<ResponseDTO> {
    return this.httpClient
      .get<ResponseDTO>(`${environment.apiURL}citas/${id}`)
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

  getCitas(): Observable<ResponseDTO> {
    return this.httpClient
      .get<ResponseDTO>(`${environment.apiURL}citas`)
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

  getCitaById(id: number): Observable<ResponseDTO> {
    return this.httpClient
      .get<ResponseDTO>(`${environment.apiURL}citas/${id}`)
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


  getCitasByEnfermeraId(id: number): Observable<ResponseDTO> {
    return this.httpClient
      .get<ResponseDTO>(`${environment.apiURL}citas/enfermeraId/${id}`)
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

  postCita(cita: Cita): Observable<ResponseDTO> {
    return this.httpClient
      .post<ResponseDTO>(`${environment.apiURL}citas`, cita)
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

  putCita(cita: Cita): Observable<ResponseDTO> {
    return this.httpClient
      .put<ResponseDTO>(`${environment.apiURL}citas`, cita)
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

  saveTriage(trg: triage): Observable<ResponseDTO> {
    return this.httpClient
      .post<ResponseDTO>(`${environment.apiURL}triajes`, trg)
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

  updateTriage(trg: triage): Observable<ResponseDTO> {
    return this.httpClient
      .put<ResponseDTO>(`${environment.apiURL}triajes`, trg)
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

  getTriageList(): Observable<ResponseDTO> {
    return this.httpClient
      .get<ResponseDTO>(`${environment.apiURL}triajes`)
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

  getTriageById(id: number): Observable<ResponseDTO> {
    return this.httpClient
      .get<ResponseDTO>(`${environment.apiURL}triajes/${id}`)
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

    saveRating(Rtg: citarating): Observable<ResponseDTO>{
      return this.httpClient
      .post<ResponseDTO>(`${environment.apiURL}citasCalificaciones`, Rtg)
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

    updateRating(Rtg: citarating): Observable<ResponseDTO>{
      return this.httpClient
      .put<ResponseDTO>(`${environment.apiURL}citasCalificaciones`, Rtg)
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

    getByIdRating(id:number): Observable<ResponseDTO>{
      return this.httpClient
      .get<ResponseDTO>(`${environment.apiURL}citasCalificaciones/${id}`)
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

    getRatingByIdCita(id:number): Observable<ResponseDTO>{
      return this.httpClient
      .get<ResponseDTO>(`${environment.apiURL}citasCalificaciones/calificacionDeCita/${id}`)
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

  deleteCita(cita: Cita): Observable<ResponseDTO> {
    let options = {
      body: cita
    };

    return this.httpClient
      .delete<ResponseDTO>(`${environment.apiURL}citas`, options)
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

  // CITA DETALLE
  postCitaDetalle(citaDetalle: CitaDetalle): Observable<ResponseDTO>  {
    return this.httpClient
    .post<ResponseDTO>(`${environment.apiURL}citasDetalle`, citaDetalle)
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

