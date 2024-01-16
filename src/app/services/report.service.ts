import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Dates } from '../models/report/Dates.model';
import { DateSales } from '../models/report/DatesSales.model';
import { ResponseDTO } from '../models/response/response.model';

@Injectable({
    providedIn: 'root'
  })

  export class ReportService {
    constructor(private httpClient: HttpClient) { }

    getReportNurses(dates: Dates): Observable<ResponseDTO> {
        return this.httpClient
        .post<ResponseDTO>(`${environment.apiURL}citas/getReporteEnfermeras`,dates)
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

    getReportPatients(dates: Dates): Observable<ResponseDTO> {
        return this.httpClient
        .post<ResponseDTO>(`${environment.apiURL}citas/getReportePacientes`,dates)
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

    getReportSales(datesSales: DateSales): Observable<ResponseDTO> {
        return this.httpClient
        .post<ResponseDTO>(`${environment.apiURL}citas/getReporteIngresos`,datesSales)
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