import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root'
})

export class UsersService {
    constructor(
        private _http: HttpClient,
    ){ }

    getNursesList(): Observable<any>{
        return this._http.get<any>('http://localhost:3000/nurses')
    }

    getPatientsList(): Observable<any>{
        return this._http.get<any>('http://localhost:3000/patients')
    }

    getUser(uid:string): Observable<any> {
        return this._http.get<any>('http://localhost:3000/patients?uid='+uid);
    }

    updateUser(uid:number,data:any): Observable<any> {
        return this._http.post<any>('http://localhost:3000/patients?id='+uid,data);
    }
}