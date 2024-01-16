import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  constructor(private httpClient: HttpClient) { }

  enviarMensajePush(tokey) {
    let headers = new HttpHeaders ({
      'Content-Type': 'application/json',
      'Authorization': 'key=AAAAv36V8mU:APA91bG5Bc3BgLLQfkXrAVSUxJd_B0fPz7Gyxc9UzSVau_MErEl9iHMhZQFYEh7MpVnYSDoCzowYpRxZRbi88Hf9fI1Oy786H0EHzyYcrj3Qg8qo5SsFEc11qVma7sXDTepKzw7DBHZF'
    })
    
    let options = {headers: headers}

    let body = {
      "notification": {
          "title": "Nueva Solicitud de cita FRONT",
          "body": "Ha sido solicitado(a) en una cita"
      },
      "to": tokey
    }

    console.log("Lo que va enviar", body);
    
    return this.httpClient
    .post<any>(`https://fcm.googleapis.com/fcm/send`, body, options)
  }
}
