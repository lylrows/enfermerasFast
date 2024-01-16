import { Component, OnInit, HostBinding } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { SeoService } from './utils/seo/seo.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HistoryHelperService } from './utils/history-helper.service';

import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { LoginService } from './firebasev2/login.service';
import { usuarios } from './models/user/usuarios.model';
import { AuthService } from './services/auth-service.service';

interface CurrentUser {
  providerId: string | '';
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: [
    './side-menu/styles/side-menu.scss',
    './side-menu/styles/side-menu.shell.scss',
    './side-menu/styles/side-menu.responsive.scss'
  ]
})



export class AppComponent implements OnInit {

  subscriptions: Subscription;
  user: any = {};
  userCurrrent: object;
  providerId: string;
  idRol:number;
  usuario: usuarios = new usuarios();
  

  accountPages = [
    {
      title: 'Log In',
      url: '/auth/login',
      ionicIcon: 'log-in-outline',
      rol:1,
    },
    {
      title: 'Sign Up',
      url: '/auth/signup',
      ionicIcon: 'person-add-outline',
      rol:1,
    },
    {
      title: 'Tutorial',
      url: '/walkthrough',
      ionicIcon: 'school-outline',
      rol:1,
    },
    {
      title: 'Getting Started',
      url: '/getting-started',
      ionicIcon: 'rocket-outline',
      rol:1,
    },
    {
      title: '404 page',
      url: '/page-not-found',
      ionicIcon: 'alert-circle-outline',
      rol:1,
    }
  ];

  textDir = 'ltr';

  //private data$ : Observable<ProfileModel>;

 


  // Inject HistoryHelperService in the app.components.ts so its available app-wide
  constructor(
    public translate: TranslateService,
    public historyHelper: HistoryHelperService,
    private seoService: SeoService,
    private router: Router,
    private route: ActivatedRoute,
    public loginService: LoginService,
    public authService: AuthService,
  ) {
    this.initializeApp();
    this.setLanguage();
  }

  ngOnInit() {
    // Esto solo sirve para cuando le den el f5 no tenga que volver a logearse
    let patient = JSON.parse(localStorage.getItem('UserData'));
    let nurseAdm = JSON.parse(localStorage.getItem('currentUser'));
    if(patient != null || nurseAdm != null) {
      this.getUsuariosFromLocalStorage();
    }
  }

  getUsuariosFromLocalStorage() {
    let patient = JSON.parse(localStorage.getItem('UserData'));
    let nurseAdm = JSON.parse(localStorage.getItem('currentUser'));
    
    console.log(patient, nurseAdm);
    
    if(patient==null){
      this.usuario = new usuarios;
      this.usuario.nombreUsuario=nurseAdm.nombreUsuario;
      this.usuario.nombre=nurseAdm.nombre;
      this.usuario.apellidoPaterno=nurseAdm.apellidoPaterno;
      this.usuario.idRol = Number(nurseAdm.idRol);
      this.authService.usuario = this.usuario;
      this.authService.generateMenu();
    }else if(nurseAdm==null){
      this.usuario = new usuarios;
      this.usuario.nombre=patient.profile.given_name;
      this.usuario.apellidoPaterno=patient.profile.family_name;
      this.usuario.nombreUsuario=patient.profile.email;
      this.usuario.idRol=3;
      this.authService.usuario = this.usuario;
      this.authService.generateMenu();
    } else {
      this.usuario = new usuarios; 
      this.usuario.nombreUsuario=nurseAdm.nombreUsuario; 
      this.usuario.nombre=nurseAdm.nombre;
      this.usuario.apellidoPaterno=nurseAdm.apellidoPaterno; 
      this.usuario.idRol = Number(nurseAdm.idRol);
      this.authService.usuario = this.usuario;
      this.authService.generateMenu();
    }
  }

  async initializeApp() {
    try {
      await SplashScreen.hide();
    } catch (err) {
      console.log('This is normal in a browser', err);
    }
  }

  setLanguage() {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use('en');

    // this is to determine the text direction depending on the selected language
    // for the purpose of this example we determine that only arabic and hebrew are RTL.
    // this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    //   this.textDir = (event.lang === 'ar' || event.lang === 'iw') ? 'rtl' : 'ltr';
    // });
  }

  logout(){
    let data = null;
    localStorage.removeItem('UserData')
    localStorage.removeItem('UserUID')
    localStorage.removeItem('currentUser');
    this.authService.usuario = new usuarios();
    this.loginService.logout();
  }

}

