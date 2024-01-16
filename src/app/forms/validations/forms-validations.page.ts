import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { UsernameValidator } from '../../validators/username.validator';
import { PasswordValidator } from '../../validators/password.validator';
import { PhoneValidator } from '../../validators/phone.validator';

import { counterRangeValidator } from '../../components/counter-input/counter-input.component';
import { CountryPhone } from './country-phone.model';
import { AlertController, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ModalController } from '@ionic/angular';
import { CertificationsComponent } from './certification/certifications.component';
import { SpecializationComponent } from './specialization/specialization.component';
import { MapsComponent } from './maps/maps.component';
import { AuthService } from '../../services/auth-service.service';
import { usuarios } from '../../models/user/usuarios.model';
import { ParametrosService } from '../../services/parametros.service';
import { parameter, parameterGroup } from '../../models/parameter/parameter.model';
import { PerfilService } from '../../services/perfil.service';
import { Perfil } from '../../models/perfil/perfil.model';
import { TermsComponent } from './terms/terms.component';
import { Router } from '@angular/router';


export interface Rol{
  id:number,
  nameRol:string;
}
export interface Gender{
  id:number,
  nameGender:string;
}
export interface TypeDocument{
  id:number,
  nameTypeDoc:string;
}

@Component({
  selector: 'app-forms-validations-page',
  templateUrl: './forms-validations.page.html',
  styleUrls: [
    './styles/forms-validations.page.scss'
  ]
})
export class FormsValidationsPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;

  user: usuarios = new usuarios();

  maxNumber:number=0;

  validationsForm: FormGroup;
  matching_passwords_group: FormGroup;
  country_phone_group: FormGroup;
  countries: Array<CountryPhone> = [];
  genders: Array<parameterGroup> = [];
  typeDocuments: Array<parameterGroup> = [];
  rols: Array<parameterGroup> = [];
  perfil: Perfil = new Perfil;
  validations = {
    'username': [
      { type: 'required', message: 'Se requiere nombre de usuario.' },
      { type: 'minlength', message: 'El nombre de usuario debe tener al menos 5 caracteres.' },
      { type: 'maxlength', message: 'El nombre de usuario no puede tener más de 25 caracteres.' },
      { type: 'pattern', message: 'Tu nombre de usuario debe contener solo números y letras.' },
      { type: 'usernameNotAvailable', message: 'Tu nombre de usuario ya está en uso.' }
    ],
    'name': [
      { type: 'required', message: 'Se requiere primer nombre.' }
    ],
    'lastname': [
      { type: 'required', message: 'Se requiere el apellido paterno.' }
    ],
    'motherlastname': [
      { type: 'required', message: 'Se requiere el apellido materno.' }
    ],
    'typedocument': [
      { type: 'required', message: 'Tipo de documento es obligatorio.' }
    ],
    'numberdocument': [
      { type: 'required', message: 'Número de documento es obligatorio.' },
    ],
    'email': [
      { type: 'required', message: 'Se requiere correo electrónico.' },
      { type: 'pattern', message: 'Ingrese un correo electrónico válido.' }
    ],
    'phone': [
      { type: 'required', message: 'Se requiere teléfono.' },
      { type: 'invalidCountryPhone', message: 'El teléfono es incorrecto para el país seleccionado.' }
    ],
    'password': [
      { type: 'required', message: 'Se requiere contraseña.' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 5 caracteres.' },
      { type: 'pattern', message: 'Su contraseña debe contener al menos una mayúscula, una minúscula y un número.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Se requiere confirmación de contraseña.' }
    ],
    'matching_passwords': [
      { type: 'areNotEqual', message: 'La contraseña no coincide' }
    ],
    'guests': [
      { type: 'rangeError', message: 'Number must be between: ' }
    ],
    'bedrooms': [
      { type: 'rangeError', message: 'Number must be between: ' }
    ],
    'terms': [
      { type: 'pattern', message: 'Debes aceptar los términos y condiciones.' }
    ]
  };

  idRol:number;

  titleButton= "";

  constructor(
    private modalCtrl: ModalController,
    private authService: AuthService,
    private parameterService: ParametrosService,
    private perfilService: PerfilService,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit(): void {
    this.createFormGroups();
  }

  ionViewDidEnter() {
    //console.log("authService",this.authService.usuario)
    this.createFormGroups();
    
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if(currentUser.id) {
      this.getPerfil(currentUser.id);
    }
    let usuario = this.authService.usuario;
    if(currentUser.idRol == 2 || currentUser.idRol == 1) {     
      this.idRol= Number(currentUser.idRol);
      this.getUser(currentUser.id);
    }
    if(currentUser.idRol == 3) {      
      this.idRol= Number(currentUser.idRol);
      this.getUserByUid(currentUser.uidSocial)
    }
    this.getParameter();
  }

  getPerfil(id) {
    this.perfilService.getPerfilByUserId(id).subscribe({
      next: (response) => {
        if(response.objModel != null) {
          console.log("perfil",response.objModel)
          this.perfil = response.objModel;
        }
      }
    })
  }

  createFormGroups() {
    this.countries = [
      new CountryPhone('PE', 'Perú'),
      new CountryPhone('UY', 'Uruguay'),
      new CountryPhone('US', 'United States'),
      new CountryPhone('ES', 'España'),
      new CountryPhone('BR', 'Brasil'),
      new CountryPhone('FR', 'France')
    ];

    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        //Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('')
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areNotEqual(formGroup);
    });

    const country = new FormControl(this.countries[0], Validators.required);

    const phone = new FormControl('', Validators.compose([
      Validators.required,
      PhoneValidator.invalidCountryPhone(country)
    ]));

    this.country_phone_group = new FormGroup({
      country: country,
      phone: phone
    });

    

    this.validationsForm = new FormGroup({
      'username': new FormControl('username1', Validators.compose([
        UsernameValidator.usernameNotAvailable,
        Validators.maxLength(10),
        Validators.minLength(5),
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*)[a-zA-Z0-9]+$')
      ])),
      'name': new FormControl('', Validators.required),
      'lastname': new FormControl('', Validators.required),
      'mother_lastname': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'gender': new FormControl(Validators.required),
      'type_document': new FormControl(Validators.required),
      'number_document': new FormControl('', Validators.compose([
        Validators.required
      ])),
      'birthday': new FormControl('dd/mm/aaaa'),
      'professional_profile': new FormControl(''),
      'rol': new FormControl(Validators.required),
      'country_phone': this.country_phone_group,
      'matching_passwords': this.matching_passwords_group,
      // 'guests': new FormControl(6, counterRangeValidator(1, 12)),
      // 'bedrooms': new FormControl(3, counterRangeValidator(1, 5)),
      'terms': new FormControl(true, Validators.pattern('true'))
    });

  }

  getUser(id) {
    //console.log('hey');
    
    this.authService.getUserById(id).subscribe({
      next: (next) => {
        if(next.objModel != null) {
          this.user = next.objModel;
          console.log("user",this.user);
          this.insertUserToForm(2);
          this.titleButton= "Actualizar";
        } else {
          this.titleButton= "Guardar";
        }
      },
      error: (error) => {
        //console.log(error);
      }
    })
  }

  getUserByUid(uid) {
    this.authService.getUserByUid(uid).subscribe({
      next: (next) => {
        //console.log("Entra aqui", uid)
        if(next.objModel != null) {
          this.user = next.objModel;
          this.insertUserToForm(3);
          this.titleButton= "Actualizar";
        } else {
          this.insertUserGoogleToForm();
          this.titleButton= "Guardar";
        }
      },
      error: (error) => {
        //console.log(error);
      }
    })
  }


  insertUserToForm(type: number) {

    if(type == 2) {
      this.validationsForm.get('username').setValue(this.user.nombreUsuario);
      this.validationsForm.get('matching_passwords').get('password').setValue(this.user.contrasenia);
      this.validationsForm.get('matching_passwords').get('confirm_password').setValue(this.user.contrasenia);
    }
    
    this.user.fechaNacimiento = new Date(this.user.fechaNacimiento);
    let stringFecha = this.user.fechaNacimiento.getFullYear() + '-' +  ('0' + (this.user.fechaNacimiento.getMonth() + 1)).slice(-2)  + '-' + ('0' + this.user.fechaNacimiento.getDate()).slice(-2);
    
    this.validationsForm.get('name').setValue(this.user.nombre);
    this.validationsForm.get('lastname').setValue(this.user.apellidoPaterno);
    this.validationsForm.get('mother_lastname').setValue(this.user.apellidoMaterno);
    this.validationsForm.get('email').setValue(this.user.correo);
    this.validationsForm.get('gender').setValue(this.user.genero);
    this.validationsForm.get('type_document').setValue(this.user.tipoDocumento);
    this.validationsForm.get('number_document').setValue(this.user.documento);
    this.validationsForm.get('birthday').setValue(stringFecha);
    this.validationsForm.get('professional_profile').setValue(this.perfil.informacionContacto);
    this.validationsForm.get('rol').setValue(this.user.idRol);
    this.validationsForm.get('country_phone').get('phone').setValue(this.user.celular);
  }

  insertUserGoogleToForm() {
    let patient = JSON.parse(localStorage.getItem('UserData'));
    
    this.validationsForm.get('name').setValue(patient.profile.given_name);
    this.validationsForm.get('lastname').setValue(patient.profile.family_name);
    this.validationsForm.get('email').setValue(patient.profile.email);

  }


  getParameter() {
    this.parameterService.getParameterByGroupId(1).subscribe(
      res => {
        if(res.objModel != null) {
          
          this.typeDocuments = res.objModel;
          this.validationsForm.get('type_document').setValue(1);
        }
      }, err => {
        //console.log(err);
      }
    )

    this.parameterService.getParameterByGroupId(4).subscribe(
      res => {
        if(res.objModel != null) {
          this.genders = res.objModel;
          this.validationsForm.get('gender').setValue(1);
        }
      }, err => {
        //console.log(err);
      }
    )

    this.parameterService.getParameterByGroupId(8).subscribe(
      res => {
        if(res.objModel != null) {
          this.rols = res.objModel;
          this.validationsForm.get('rol').setValue(1);
        }
      }, err => {
        //console.log(err);
      }
    )


  }
  
  saveUsuario(){

    let uid = localStorage.getItem('UserUID');
    
    if(uid!=null){
      this.user.uidSocial=uid;
    }

    this.user.nombreUsuario=this.validationsForm.value.username
    this.user.nombre=this.validationsForm.value.name
    //this.user= this.validationsForm.value.second_name
    this.user.apellidoPaterno=this.validationsForm.value.lastname
    this.user.apellidoMaterno=this.validationsForm.value.mother_lastname
    this.user.correo=this.validationsForm.value.email
    this.user.genero=this.validationsForm.value.gender
    this.user.tipoDocumento=this.validationsForm.value.type_document
    this.user.documento=this.validationsForm.value.number_document
    this.user.fechaNacimiento=new Date(this.validationsForm.value.birthday)
    //this.user=this.validationsForm.value.professional_profile

    if(this.authService.usuario.idRol == 1) {
      this.user.idRol=this.validationsForm.value.rol
    } else {
      this.user.idRol = this.authService.usuario.idRol;
    }
    
    this.user.celular=this.validationsForm.value.country_phone.phone
    this.user.contrasenia=this.validationsForm.value.matching_passwords.password
    ////console.log(this.validationsForm.value.country_phone.phone);

    if(this.user.tipoDocumento==1){
      this.maxNumber=8;
      if(this.user.documento.length!=this.maxNumber){
        this.alertMsj(1);
        return;
      }
    }else if(this.user.tipoDocumento==2){
      this.maxNumber=12;
      if(this.user.documento.length!=this.maxNumber){
        this.alertMsj(2);
        return;
      }
    }
   
    if(this.titleButton == 'Actualizar') {
      this.authService.updateUser(this.user).subscribe(res => {
        if(res.status==1){

          //console.log(this.perfil);
          if(this.perfil.id) {
            this.perfil.informacionContacto = this.validationsForm.value.professional_profile
            this.perfilService.putPerfil(this.perfil).subscribe({
              next: (next) => {
                //console.log("La respuesta", next);
              },
              error: (error) => {
                //console.log("Error");
              }
            })
          } else {
            this.perfil.informacionContacto = this.validationsForm.value.professional_profile
            this.perfilService.postPerfil(this.perfil).subscribe({
              next: (next) => {
                //console.log("La respuesta", next);
              },
              error: (error) => {
                //console.log("Error");
              }
            })
          }
          this.router.navigate(['/app/categories']);
        }else{
          //console.log(res.description);
        }
      })
    } else {
      this.authService.saveUser(this.user).subscribe(res => {
        if(res.status==1){
          let response=res.objModel;
          this.perfil.idUsuario = response;
          this.perfilService.postPerfil(this.perfil).subscribe({
            next: (next) => {
              //console.log("La respuesta", next);
            },
            error: (error) => {
              //console.log("Error");
            }
          })
          this.router.navigate(['/app/categories']);
        }else{
          //console.log(res.description);
        }
      })
    }
  }

  async alertMsj(op:number){
    if(op==1){
      const alert = await this.alertController.create({
      header: 'Mensaje',
      message: 'Número de dígitos inválido para tipo de documento DNI',
      buttons: ['OK'],
      });
      await alert.present();
    }else if(op==2){
      const alert = await this.alertController.create({
        header: 'Mensaje',
        message: 'Número de dígitos inválido para tipo de documento Pasaporte',
        buttons: ['OK'],
      });
      await alert.present();
    }
    
  }

  onSubmit(values) {
    //console.log(values);
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: CertificationsComponent,
    });
    modal.present();
  }

  async openModal2() {
    const modal = await this.modalCtrl.create({
      component: SpecializationComponent,
    });
    modal.present();
  }

  async openModal3() {
    const modal = await this.modalCtrl.create({
      component: MapsComponent,
    });


    modal.onDidDismiss().then((resp: any)=> {
      if(resp != null) {
        if(resp.data != null && resp.data != undefined) {
          this.perfil.latitud = resp.data.latitud;
          this.perfil.longitud = resp.data.longitud;
          this.perfil.direccion = resp.data.direccion;
        }
      }
    });
    modal.present();
  }

  async openTerms(){
    const modal = await this.modalCtrl.create({
      component: TermsComponent,
    });
    modal.present();
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }
}
