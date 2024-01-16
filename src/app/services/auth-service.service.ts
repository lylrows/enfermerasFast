import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { certifications } from '../models/certification/certifications.model';
import { ContractorRequest } from '../models/contractor/ContractorRequest';

import { LoginRequestDTO } from '../models/login/login.model';
import { menu } from '../models/menu/menu.model';
import { ResponseDTO } from '../models/response/response.model';
import { Especialidad } from '../models/speciality/especialidades.model';
import { usuarios } from '../models/user/usuarios.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario: usuarios = new usuarios();
  appPages = {};
  listNurse:any;

  constructor(private httpClient: HttpClient) { }

  verificarGuard() {
    return sessionStorage.getItem('Guard') !== null ? true : false;
  }

  
  saveUser(user:usuarios) : Observable<ResponseDTO> {
    return this.httpClient
    .post<ResponseDTO>(`${environment.apiURL}usuarios`, user)
    .pipe(
      map((response) => {
      return response;
      }), catchError((error) => {
        const errorResponse: ResponseDTO = { status: error.status, description: error.message, objModel: error };
        return of(errorResponse);
      } 
    ));
  }

  updateUser(user: usuarios): Observable<ResponseDTO> {
    return this.httpClient
    .put<ResponseDTO>(`${environment.apiURL}usuarios`, user)
    .pipe(
      map((response) => {
      return response;
      }), catchError((error) => {
        const errorResponse: ResponseDTO = { status: error.status, description: error.message, objModel: error };
        return of(errorResponse);
      } 
    ));
  }

  getUserById(id: number) : Observable<ResponseDTO> {
    return this.httpClient
    .get<ResponseDTO>(`${environment.apiURL}usuarios/${id}`)
    .pipe(
      map((response) => {
      return response;
      }), catchError((error) => {
        const errorResponse: ResponseDTO = { status: error.status, description: error.message, objModel: error };
        return of(errorResponse);
      } 
    ));
  }

  getUserByUid(uid: string) : Observable<ResponseDTO> {
    return this.httpClient
    .get<ResponseDTO>(`${environment.apiURL}usuarios/uid/${uid}`)
    .pipe(
      map((response) => {
      return response;
      }), catchError((error) => {
        const errorResponse: ResponseDTO = { status: error.status, description: error.message, objModel: error };
        return of(errorResponse);
      } 
    ));
  }

  getLogin(request:LoginRequestDTO) : Observable<ResponseDTO> {
    return this.httpClient
    .post<ResponseDTO>(`${environment.apiURL}usuarios/login`, request)
    .pipe(
      map((response) => {
        //console.log("login", response.objModel)
      return response;
      }), catchError((error) => {
        const errorResponse: ResponseDTO = { status: error.status, description: error.message, objModel: error };
        return of(errorResponse);
      } 
    ));
  }

  generateCode(email:string) : Observable<ResponseDTO> {
    return this.httpClient
    .get<ResponseDTO>(`${environment.apiURL}usuarios/generadorCodigo/`+ email)
    .pipe(
      map((response) => {
      return response;
      }), catchError((error) => {
        const errorResponse: ResponseDTO = { status: error.status, description: error.message, objModel: error };
        return of(errorResponse);
      } 
    ));
  }
  validarCodigo(code: number, email: string): Observable<ResponseDTO> {
    return this.httpClient
    .get<ResponseDTO>(`${environment.apiURL}usuarios/validarCodigo/`+ code + '/' + email)
    .pipe(
      map((response) => {
      return response;
      }), catchError((error) => {
        const errorResponse: ResponseDTO = { status: error.status, description: error.message, objModel: error };
        return of(errorResponse);
      } 
    ));
  }
  actualizaContrasenia(contrasenia: string, email: string) {
    return this.httpClient
    .get<ResponseDTO>(`${environment.apiURL}usuarios/validarCodigo/`+ contrasenia + '/' + email)
    .pipe(
      map((response) => {
      return response;
      }), catchError((error) => {
        const errorResponse: ResponseDTO = { status: error.status, description: error.message, objModel: error };
        return of(errorResponse);
      } 
    ));
  }
  validateCode(code:number,email:string) : Observable<ResponseDTO> {
    return this.httpClient
    .get<ResponseDTO>(`${environment.apiURL}usuarios/validarCodigo/`+ email + `/` + code)
    .pipe(
      map((response) => {
      return response;
      }), catchError((error) => {
        const errorResponse: ResponseDTO = { status: error.status, description: error.message, objModel: error };
        return of(errorResponse);
      } 
    ));
  }
  resetPassword(pass:string,email:string) : Observable<ResponseDTO> {
    return this.httpClient
    .get<ResponseDTO>(`${environment.apiURL}usuarios/actualizaContrasenia/`+ pass + `/` + email)
    .pipe(
      map((response) => {
      return response;
      }), catchError((error) => {
        const errorResponse: ResponseDTO = { status: error.status, description: error.message, objModel: error };
        return of(errorResponse);
      } 
    ));
  }
  getUsers() : Observable<ResponseDTO> {
    return this.httpClient
    .get<ResponseDTO>(`${environment.apiURL}usuarios`)
    .pipe(
      map((response) => {
      return response;
      }), catchError((error) => {
        const errorResponse: ResponseDTO = { status: error.status, description: error.message, objModel: error };
        return of(errorResponse);
      } 
    ));
  }
  generateAlignetPayment(request: ContractorRequest): Observable<ResponseDTO> {
    return this.httpClient.post<ResponseDTO>(`${environment.apiURL}pagos/GenerateAlignetPayment`, request);
  }

  generateMenu() {
    let app = []
    if(this.usuario.idRol == 1) {
      app = [
        {
          title: 'Inicio',
          url: '/app/categories',
          ionicIcon: 'list-outline',
          rol: [
            {id:1},
            {id:2},
            {id:3}
          ],
        },
        {
          title: 'Editar Perfil',
          url: '/forms-and-validations',
          ionicIcon: 'reader-outline',
          rol: [
            {id:1},
            {id:2},
            {id:3}
          ],
        },
        // {
        //   title: 'Perfil',
        //   url: '/app/user',
        //   ionicIcon: 'person-outline',
        //   rol: [
        //     {id:1},
        //     {id:2},
        //     {id:3}
        //   ],
        // },
        // {
        //   title: 'Ver citas',
        //   url: '/app/categories/enfermera-cita',
        //   ionicIcon: 'location-outline',
        //   rol: [
        //     {id:1},
        //     {id:2},
        //     {id:3}
        //   ],
        // },
        {
          title: 'Mantenimiento Parámetros',
          url: '/app/categories/matenimiento-parametro',
          ionicIcon: 'toggle-outline',
          rol: [
            {id:1},
            {id:2},
            {id:3}
          ],
        },
        {
          title: 'Gestionar Especialidades',
          url: '/app/categories/matenimiento-especialidad',
          ionicIcon: 'copy-outline',
          rol: [
            {id:1},
            {id:2},
            {id:3}
          ],
        },
        {
          title: 'Mantenimiento Servicios',
          url: '/app/categories/mantenimiento-servicio',
          ionicIcon: 'checkbox-outline',
          rol: [
            {id:1},
            {id:2},
            {id:3}
          ],
        },
        {
          title: 'Gestionar Enfermeras(os)',
          url: '/app/categories/nurses',
          ionicIcon: 'people-outline',
          rol: [
            {id:1},
            {id:2},
            {id:3}
          ],
        },
        {
          title: 'Reportes',
          url: '/app/categories/report',
          ionicIcon: 'file-tray-full-outline',
          rol: [
            {id:1},
            {id:2},
            {id:3}
          ],
        },
        // {
        //   title: 'Contacto',
        //   url: '/contact-card',
        //   customIcon: './assets/custom-icons/side-menu/contact-card.svg',
        //   rol: [
        //     {id:1},
        //     {id:2},
        //     {id:0}
        //   ],
        // },
        // {
        //   title: 'Notificaciones',
        //   url: '/app/notifications',
        //   ionicIcon: 'notifications-outline',
        //   rol: [
        //     {id:1},
        //     {id:2},
        //     {id:0}
        //   ],
        // }
      ];
    }
    if(this.usuario.idRol==2) {
      app = [
        {
          title: 'Inicio',
          url: '/app/categories',
          ionicIcon: 'list-outline',
          rol: [
            {id:1},
            {id:2},
            {id:3}
          ],
        },
        // {
        //   title: 'Perfil',
        //   url: '/app/user',
        //   ionicIcon: 'person-outline',
        //   rol: [
        //     {id:1},
        //     {id:2},
        //     {id:3}
        //   ],
        // },
        {
          title: 'Editar Perfil',
          url: '/forms-and-validations',
          ionicIcon: 'reader-outline',
          rol: [
            {id:1},
            {id:2},
            {id:3}
          ],
        },
        {
          title: 'Alerta de citas',
          url: '/app/categories/enfermera-cita',
          ionicIcon: 'location-outline',
          rol: [
            {id:1},
            {id:2},
            {id:3}
          ],
        },
        // {
        //   title: 'Contacto',
        //   url: '/contact-card',
        //   customIcon: './assets/custom-icons/side-menu/contact-card.svg',
        //   rol: [
        //     {id:1},
        //     {id:2},
        //     {id:0}
        //   ],
        // },
        // {
        //   title: 'Notificaciones',
        //   url: '/app/notifications',
        //   ionicIcon: 'notifications-outline',
        //   rol: [
        //     {id:1},
        //     {id:2},
        //     {id:0}
        //   ],
        // }
      ];
    }
    if(this.usuario.idRol ==3){
      app = [
        {
          title: 'Inicio',
          url: '/app/categories',
          ionicIcon: 'list-outline',
          rol: [
            {id:1},
            {id:2},
            {id:3}
          ],
        },
        // {
        //   title: 'Perfil',
        //   url: '/app/user',
        //   ionicIcon: 'person-outline',
        //   rol: [
        //     {id:1},
        //     {id:2},
        //     {id:3}
        //   ],
        // },
        {
          title: 'Editar Perfil',
          url: '/forms-and-validations',
          ionicIcon: 'reader-outline',
          rol: [
            {id:1},
            {id:2},
            {id:3}
          ],
        },
        {
          title: 'Búsqueda Enfermera',
          url: '/app/categories/busqueda-enfermera',
          ionicIcon: 'location-outline',
          rol: [
            {id:1},
            {id:2},
            {id:3}
          ],
        },
        // {
        //   title: 'Contacto',
        //   url: '/contact-card',
        //   customIcon: './assets/custom-icons/side-menu/contact-card.svg',
        //   rol: [
        //     {id:1},
        //     {id:2},
        //     {id:0}
        //   ],
        // },
        // {
        //   title: 'Notificaciones',
        //   url: '/app/notifications',
        //   ionicIcon: 'notifications-outline',
        //   rol: [
        //     {id:1},
        //     {id:2},
        //     {id:0}
        //   ],
        // }
      ];
    }

    this.appPages = app;
  }
}