import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';//--
import { LoginRequestDTO } from '../models/login/login.model';
//AUTHSERVICE
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';
import { usuarios } from '../models/user/usuarios.model';
import { PerfilService } from '../services/perfil.service';
import { Perfil } from '../models/perfil/perfil.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public usuario: any = {};

  constructor(
    private router: Router,
    public afAuth: AngularFireAuth,
    private authService: AuthService,
    private perfilService: PerfilService,
    db: AngularFireDatabase) { 

      

      this.afAuth.authState.subscribe( auth => {
        if(!auth){
          return;
        }
        this.usuario.nombre= auth.displayName;
        this.usuario.email= auth.email;
        this.usuario.uid= auth.uid;
        this.usuario.photoURL= auth.photoURL;
      });
      //this.items = firestore.collection('users').valueChanges();
  }


  login(prov: string):any {
    
    if (prov=='google') {
        //this.authWithGoogle();
        this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then((result: any) => {
            localStorage.setItem('UserUID',result.user.uid)
            localStorage.setItem('UserData', JSON.stringify(result.additionalUserInfo));
            //console.log('Google Sign In');

            if(result != null) {
              this.getUser(result);
            }
        })
        .catch(err => { console.log(err);});
      }else if (prov=='facebook'){
        this.afAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then((result: any) => { 
          localStorage.setItem('UserUID',result.user.uid)
          localStorage.setItem('UserData', JSON.stringify(result.additionalUserInfo));
            //console.log('Facebook Sign In');
            if(result!=null){
              this.getUser(result);
            }
        })
        .catch(err => { console.log(err);});
      }else if (prov=='twitter'){
        this.afAuth.signInWithPopup(new firebase.auth.TwitterAuthProvider())
        .then((result: any) => {
          localStorage.setItem('UserUID',result.user.uid)
          localStorage.setItem('UserData', JSON.stringify(result.additionalUserInfo));
            //console.log('Twitter Sign In');
            //console.log(result.user.uid);
            //console.log(result.additionalUserInfo);
            if(result!=null){
              this.getUser(result);
            }
        })
        .catch(err => { console.log(err);});
      }else if (prov=='apple'){
        // this.afAuth.signInWithPopup(new firebase.auth)
        // .then(result => { //console.log('Twitter Sign In'); })
        // .catch(err => { //console.log(err);});
      }
  }

  getUser(result) {
    let loginRequestDTO: LoginRequestDTO = new LoginRequestDTO;
    loginRequestDTO.uidSocial = result.user.uid;

    console.log(loginRequestDTO.uidSocial);
    
    this.authService.getLogin(loginRequestDTO).subscribe({
      next: (res) => {
        console.log("getUser", res.objModel);
        if(res.objModel != null){
          let response= res.objModel;
          sessionStorage.setItem('Guard', res.token);
          localStorage.setItem('currentUser', JSON.stringify(response));
          //console.log("El response", response);
          
          this.authService.usuario = response;
        } else {
          // En caso no tenga se crea manual 
          console.log('En caso no tenga se crea manual ');
          
          let newUser:usuarios={
            id: 0,
            idRol: 3,
            uidSocial: result.user.uid,
            nombreUsuario: result.additionalUserInfo.profile.email || ' ',
            contrasenia: '',
            nombre: result.additionalUserInfo.profile.given_name || result.additionalUserInfo?.profile.name.split(' ')[0],
            apellidoPaterno: result.additionalUserInfo.profile.family_name || ' ',
            apellidoMaterno: '',
            genero: 0,
            fechaNacimiento: null,
            correo: '',
            celular: '',
            tipoDocumento: 0,
            documento: '',
            esActivo: true,
            fechaRegistro: new Date(),
            usuarioRegistro: 1,
            fechaActualizacion: new Date(),
            usuarioActualizacion: 1
          }
          this.authService.saveUser(newUser).subscribe(res => {
            if(res.status==1){
              newUser.id = res.objModel;    
              let newPerfil:Perfil={
                id: 0,
                idUsuario: newUser.id,
                foto: '',
                informacionContacto: '',
                latitud: 0,
                longitud: 0,
                direccion: '',
                codigoColegiatura: '',
                cargo: '',
                tokenFireBase: ''
              }     
              this.perfilService.postPerfil(newPerfil).subscribe( res =>{
                if(res.status==1){
                  console.log(loginRequestDTO.uidSocial);
                  this.authService.getLogin(loginRequestDTO).subscribe(res => {
                    if(res.status==1){
                      let response= res.objModel;
                      sessionStorage.setItem('Guard', res.token);
                      localStorage.setItem('currentUser', JSON.stringify(response));
                      this.authService.usuario.nombre=result.additionalUserInfo.profile.given_name || result.additionalUserInfo?.profile.name.split(' ')[0];
                      this.authService.usuario.apellidoPaterno=result.additionalUserInfo.profile.family_name || '';
                      this.authService.usuario.nombreUsuario=result.additionalUserInfo.profile.email || '';
                      this.authService.usuario.uidSocial = result.user.uid;
                      this.authService.usuario.idRol=3; 
                    }
                  })
                }
              })
            }
          })
         
        }
        this.authService.generateMenu();
        this.router.navigate(['/app']);
      }
    })
  }
  
  logout(){
    this.afAuth.signOut();
    this.authService.usuario = new usuarios();
    if(localStorage.getItem('currentUser')==null
    && localStorage.getItem('UserData')==null
    && localStorage.getItem('UserUID')==null){
      this.router.navigate(['/auth/login']);
    }
  }


  //   getTimeStamp(){
//     const now = new Date();
//     const date = now.getUTCFullYear() + '/' +
//                  (now.getUTCMonth() + 1) + '/' +
//                  now.getUTCDate();
//     const time = now.getUTCHours() + ':' +
//                  now.getUTCMinutes() + ':' +
//                  now.getUTCSeconds();
//     return (date + ' ' + time);
//   }
}
