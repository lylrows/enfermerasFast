import { Component, OnInit } from '@angular/core';
import { LoginService } from '../firebasev2/login.service';
import { usuarios } from '../models/user/usuarios.model';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
  })
  export class MenuComponent implements OnInit {
    // usuario: usuarios = new usuarios;

    // app = [
    //     {
    //       title: 'Inicio',
    //       url: '/app/categories',
    //       ionicIcon: 'list-outline',
    //       rol: [
    //         {id:1},
    //         {id:2},
    //         {id:3}
    //       ],
    //     },
    //     {
    //       title: 'Perfil',
    //       url: '/app/user',
    //       ionicIcon: 'person-outline',
    //       rol: [
    //         {id:1},
    //         {id:2},
    //         {id:3}
    //       ],
    //     },
    //     {
    //       title: 'Editar Perfil',
    //       url: '/forms-and-validations',
    //       ionicIcon: 'reader-outline',
    //       rol: [
    //         {id:1},
    //         {id:2},
    //         {id:3}
    //       ],
    //     },
    //     {
    //       title: 'Contacto',
    //       url: '/contact-card',
    //       customIcon: './assets/custom-icons/side-menu/contact-card.svg',
    //       rol: [
    //         {id:1},
    //         {id:2},
    //         {id:0}
    //       ],
    //     },
    //     {
    //       title: 'Notificaciones',
    //       url: '/app/notifications',
    //       ionicIcon: 'notifications-outline',
    //       rol: [
    //         {id:1},
    //         {id:2},
    //         {id:0}
    //       ],
    //     }
    //   ];
      
    //   appPages: {}={}
    
    //   accountPages = [
    //     {
    //       title: 'Log In',
    //       url: '/auth/login',
    //       ionicIcon: 'log-in-outline',
    //       rol:1,
    //     },
    //     {
    //       title: 'Sign Up',
    //       url: '/auth/signup',
    //       ionicIcon: 'person-add-outline',
    //       rol:1,
    //     },
    //     {
    //       title: 'Tutorial',
    //       url: '/walkthrough',
    //       ionicIcon: 'school-outline',
    //       rol:1,
    //     },
    //     {
    //       title: 'Getting Started',
    //       url: '/getting-started',
    //       ionicIcon: 'rocket-outline',
    //       rol:1,
    //     },
    //     {
    //       title: '404 page',
    //       url: '/page-not-found',
    //       ionicIcon: 'alert-circle-outline',
    //       rol:1,
    //     }
    //   ];

    constructor(
        public loginService: LoginService
    ){

    }
    ngOnInit(): void {
        //this.getDataFirebase();
        // if(this.usuario.idRol==1){
        //     this.appPages=this.app
        //   }else{
        //     this.appPages=this.app.filter(x=>(x.rol[1].id && x.rol[2].id)==this.usuario.idRol);
        //   }
    }

    // getDataFirebase(){
    //     this.usuario = new usuarios;
    //     let patient = JSON.parse(localStorage.getItem('UserData'));
    //     let nurseAdm = JSON.parse(localStorage.getItem('currentUser'));
        
    //     //console.log('hey');
    //     if(patient==null){
    //       //console.log(nurseAdm);
    //       this.usuario = new usuarios;
    //       this.usuario.nombreUsuario=nurseAdm.nombreUsuario;
    //       this.usuario.nombre=nurseAdm.nombre;
    //       this.usuario.apellidoPaterno=nurseAdm.apellidoPaterno;
    //       this.usuario.idRol=+nurseAdm.idRol;
    //     }else if(nurseAdm==null){
    //       //console.log(patient);
    //       this.usuario = new usuarios;
    //       this.usuario.nombre=patient.profile.given_name;
    //       this.usuario.apellidoPaterno=patient.profile.family_name;
    //       this.usuario.nombreUsuario="nombreusuario";
    //       this.usuario.idRol=3;
    //       //this.PersonManagement.sfirstname.substring(0,1).toLowerCase() + lastname
    //     }
    //   }

    // logout(){
    //     let data = null;
    //     localStorage.removeItem('UserData')
    //     localStorage.removeItem('UserUID')
    //     localStorage.removeItem('currentUser');
    //     this.loginService.logout();
    //   }
  }