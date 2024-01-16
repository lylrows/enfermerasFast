import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { LoginService } from '../firebasev2/login.service';
import { LoginRequestDTO } from '../models/login/login.model';
import { AuthService } from '../services/auth-service.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { mergeMapTo } from 'rxjs';
import { PerfilService } from '../services/perfil.service';
import { Perfil } from '../models/perfil/perfil.model';
import { CitasService } from '../services/citas.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: [
    './styles/login.page.scss'
  ]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  isAuthenticate: boolean=false;
  loginRequestDTO: LoginRequestDTO = new LoginRequestDTO;
  public facebookIcon: SafeHtml;
  public googleIcon: SafeHtml;
  public twitterIcon: SafeHtml;
  public appleIcon: SafeHtml;
  tokenFireBase = "";
  perfil:Perfil = null;
  dataUser: any;

  constructor(
    public router: Router,
    public menu: MenuController,
    public loginService: LoginService,
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    private afMessaging: AngularFireMessaging,
    private perfilService: PerfilService,
    private alertController: AlertController,
    private citasService: CitasService
  ) {
    this.loginForm = new FormGroup({
      'nombreUsuario': new FormControl('', Validators.compose([
        Validators.required,
      ])),
      'password': new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }


  ngOnInit(): void {
     // Define el código HTML de cada icono
     const facebookIconHTML = '<ion-icon name="logo-facebook"></ion-icon>';
     const googleIconHTML = '<ion-icon name="logo-google"></ion-icon>';
     const twitterIconHTML = '<ion-icon name="logo-twitter"></ion-icon>';
     const appleIconHTML = '<ion-icon name="logo-apple"></ion-icon>';
 
     // Sanitiza el código HTML y lo asigna a las variables
     this.facebookIcon = this.sanitizer.bypassSecurityTrustHtml(facebookIconHTML);
     this.googleIcon = this.sanitizer.bypassSecurityTrustHtml(googleIconHTML);
     this.twitterIcon = this.sanitizer.bypassSecurityTrustHtml(twitterIconHTML);
     this.appleIcon = this.sanitizer.bypassSecurityTrustHtml(appleIconHTML);
  }

  getLogin(){
    this.loginRequestDTO.nombreUsuario=this.loginForm.value.nombreUsuario;
    this.loginRequestDTO.contrasenia=this.loginForm.value.password;

    this.authService.getLogin(this.loginRequestDTO).subscribe(res => {
      if(res.status==1){
        let response=res.objModel;
        if(response.idRol!=3){
          if(response != null) {
            console.log(res);
            let idPerfil = response.idPerfil;
            sessionStorage.setItem('Guard', res.token);
            // sessionStorage.setItem('Menu', JSON.stringify(res.menu));
            this.getPerfil(idPerfil, response);
          }          
        }else{
          this.alertMsj(1);
        }

      }else{
        this.alertMsj(2);
        console.log(res.description);
      }
    })
  }

  async alertMsj(op:number){
    if(op==1){
      const alert = await this.alertController.create({
      header: 'Mensaje',
      message: 'No tiene permisos',
      buttons: ['OK'],
      });
      await alert.present();
    }else if(op==2){
      const alert = await this.alertController.create({
        header: 'Mensaje',
        message: 'Usuario o contraseña incorrecta',
        buttons: ['OK'],
      });
      await alert.present();
    }
    
  }

  getPerfil(idPerfil, response) {
    this.perfilService.getPerfilById(idPerfil).subscribe({
      next: (resp) => {
        if(resp.objModel != null) {
          this.perfil = resp.objModel;
          this.requestPermission(response);
        } else {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.authService.usuario = response;
          this.authService.generateMenu();
          this.router.navigate(['app/categories']);
        }
      }
    })
  }

  requestPermission(response) {
    this.afMessaging.requestPermission
      .pipe(mergeMapTo(this.afMessaging.tokenChanges))
      .subscribe(
        (token) => { 
          this.perfil.tokenFireBase = token;
          console.log(this.perfil);
          this.perfilService.putPerfil(this.perfil).subscribe({
            next: (next) => {
              localStorage.setItem('currentUser', JSON.stringify(response));
              this.authService.usuario = response;
              this.authService.generateMenu();
              this.dataUser=JSON.parse(localStorage.getItem("currentUser"));
              this.getCitas(this.dataUser.idRol,this.dataUser.id);
              this.router.navigate(['app/categories']);
            }
          })
        },
        (error) => { console.error(error); },  
      );
  }

  getCitas(op:number,id:number){
    this.citasService.getCitasDetalleRol(op,id).subscribe(res=>{
      if(res.status==1){
        this.citasService.listCitas=res.objModel;
      }
    })
  }


  // Disable side menu for this page
  ionViewDidEnter(): void {
    this.menu.enable(false);
  }

  // Restore to default when leaving this page
  ionViewDidLeave(): void {
    this.menu.enable(true);
  }

  signInProv(prov: string){
    this.authService.usuario.idRol = 3;
    console.log("social:",prov);
    let msj = this.loginService.login(prov);
    sessionStorage.setItem('Guard', "probanding123");
    console.log('msj:', msj)
  }

  doLogin(): void {
    console.log('do Log In');
    this.router.navigate(['app/categories']);
  }

  goToForgotPassword(): void {
    console.log('redirect to forgot-password page');
  }

  doFacebookLogin(): void {
    console.log('facebook login');
    this.router.navigate(['app/categories']);
  }

  doGoogleLogin(): void {
    console.log('google login');
    this.router.navigate(['app/categories']);
  }

  doTwitterLogin(): void {
    console.log('twitter login');
    this.router.navigate(['app/categories']);
  }

  doAppleLogin(): void {
    console.log('apple login');
    this.router.navigate(['app/categories']);
  }
  sanitizeSvg(svg: string) {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }
}
