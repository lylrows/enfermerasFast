import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ResultadoEnvio } from '../models/login/login.model';
import { AuthService } from '../services/auth-service.service';
import { PasswordValidator } from '../validators/password.validator';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: [
    './styles/forgot-password.page.scss'
  ]
})
export class ForgotPasswordPage {
  forgotPasswordForm: FormGroup;
  codeValidationForm: FormGroup;
  resetPasswordForm: FormGroup;

  isforgotPasswordForm: boolean=true;
  iscodeValidationForm: boolean=false;
  isresetPasswordForm: boolean=false;

  validation_messages = {
    'email': [
      { type: 'required', message: 'Ingrese su correo.' },
      { type: 'pattern', message: 'Ingrese un correo válido.' }
    ],
    'code': [
      { type: 'required', message: 'Código es obligatorio.' }
    ],
    'password': [
      { type: 'required', message: 'La conttraseña es obligatoria.' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 5 caracteres.' },
      { type: 'pattern', message: 'Su contraseña debe contener al menos una mayúscula, una minúscula y un número.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'La confirmación de contraseña es obligatoria.' }
    ],
    'matching_passwords': [
      { type: 'areNotEqual', message: 'La contraseña no coincide.' }
    ]
  };
  resultSend:ResultadoEnvio
  email: string;

  constructor(
    public router: Router,
    public menu: MenuController,
    public authService: AuthService
  ) {
    this.forgotPasswordForm = new FormGroup({
      'email': new FormControl('test@test.com', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });
    this.codeValidationForm = new FormGroup({
      'code': new FormControl('000000', Validators.compose([
        Validators.minLength(6),
        Validators.required,
      ]))
    });
    this.resetPasswordForm = new FormGroup({
      'password': new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      'confirm_password': new FormControl('', Validators.required)
    }
    , (formGroup: FormGroup) => {
      return PasswordValidator.areNotEqual(formGroup);
    }
    );
  }

  // Disable side menu for this page
  ionViewDidEnter(): void {
    this.menu.enable(false);
  }

  // Restore to default when leaving this page
  ionViewDidLeave(): void {
    this.menu.enable(false);
  }

  recoverPassword(): void {
    //console.log(this.forgotPasswordForm.value);
    this.router.navigate(['app/categories']);
  }

  forgotPassword(){
    //console.log(this.forgotPasswordForm.value);
    this.email = this.forgotPasswordForm.value.email;
    this.authService.generateCode(this.email).subscribe( res =>{
      //console.log("res", res.objModel)
      this.resultSend = res.objModel;
      if(res.objModel.fueExitoso){
        this.isforgotPasswordForm=false;
        this.iscodeValidationForm=true;
      }
    })
 
  }

  codeValidation(){
    //console.log(this.codeValidationForm.value);
    let code= this.codeValidationForm.value.code;
    this.authService.validarCodigo(code, this.email).subscribe( res =>{
      if(res.objModel){
        this.iscodeValidationForm=false;
        this.isresetPasswordForm=true;
      }
    })
    
  }

  resetPassword(){
    //console.log(this.resetPasswordForm.value);
    let contrasenia = this.resetPasswordForm.value.password;
    this.authService.actualizaContrasenia(contrasenia, this.email).subscribe( res =>{
      if(res.objModel){
        this.router.navigate(['/auth/login']);
      }
    })
  }

}
