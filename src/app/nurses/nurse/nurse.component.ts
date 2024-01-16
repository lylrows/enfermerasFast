import { Component, OnInit,Input } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth-service.service';
import { usuarios } from '../../models/user/usuarios.model';
import { UsernameValidator } from '../../validators/username.validator';
import { Perfil } from '../../models/perfil/perfil.model';
import { PerfilService } from '../../services/perfil.service';

@Component({
  selector: 'app-nurse',
  templateUrl: './nurse.component.html',
  styleUrls: ['./nurse.component.scss'],
})
export class NurseComponent implements OnInit {
  
  @Input("op") op:string='';
  @Input("item") item: usuarios = new usuarios();
  listNurse: any;

  nurseForm: FormGroup;
  nurse: usuarios = new usuarios();

  validations = {
    'username': [
      { type: 'required', message: 'Se requiere nombre de usuario.' },
      { type: 'minlength', message: 'El nombre de usuario debe tener al menos 5 caracteres.' },
      { type: 'maxlength', message: 'El nombre de usuario no puede tener más de 10 caracteres.' },
      { type: 'pattern', message: 'Tu nombre de usuario debe contener sólo números y letras.' },
      { type: 'usernameNotAvailable', message: 'Tu nombre de usuario ya está en uso.' }
    ],
    'name': [
      { type: 'required', message: 'Se requiere primer nombre.' },
      { type: 'minlength', message: 'El primer nombre debe tener al menos 3 caracteres.' },
      { type: 'maxlength', message: 'El primer nombre de usuario no puede tener más de 10 caracteres.' },
    ],
    'lastname': [
      { type: 'required', message: 'Se requiere el apellido paterno.' },
      { type: 'minlength', message: 'El apellido paterno de usuario debe tener al menos 3 caracteres.' },
      { type: 'maxlength', message: 'El apellido paterno de usuario no puede tener más de 15 caracteres.' },
    ],
    'password': [
      { type: 'required', message: 'Se requiere contraseña.' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 5 caracteres.' },
      { type: 'pattern', message: 'Su contraseña debe contener al menos una mayúscula, una minúscula y un número.' }
    ]
  };

  constructor(
    private modalCtrl: ModalController,
    private authService: AuthService,
    private perfilService: PerfilService
    ) { }

  ngOnInit() {
    if(this.op=='Actualizar'){
      //console.log(this.item.id);
      this.getNurse();
    }
    this.nurseForm = new FormGroup({
      'name': new FormControl((this.item.nombre || ''),Validators.compose([
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(3)
      ])),
      'lastname': new FormControl((this.item.apellidoPaterno || ''),Validators.compose([
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(3)
      ])),
      'nameuser': new FormControl((this.item.nombreUsuario || ''),Validators.compose([
        UsernameValidator.usernameNotAvailable,
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(5)
      ])),
      'pass': new FormControl((this.item.contrasenia || ''),Validators.compose([
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(5),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
    })
  }

  saveNurse(){
    if(this.op=='Actualizar'){
      this.nurse.nombre=this.nurseForm.value.name;
      this.nurse.apellidoPaterno=this.nurseForm.value.lastname;
      this.nurse.nombreUsuario=this.nurseForm.value.nameuser;
      this.nurse.contrasenia=this.nurseForm.value.pass;
      this.authService.updateUser(this.nurse).subscribe(res=>{
        if(res.status==1){
          //console.log("Actualizado?",res.objModel + "\n" + res.description);
          this.getNurses();
        }
      })
      
    }else if(this.op=='Nuevo'){
      this.nurse= new usuarios();
      this.nurse.nombre=this.nurseForm.value.name;
      this.nurse.apellidoPaterno=this.nurseForm.value.lastname;
      this.nurse.nombreUsuario=this.nurseForm.value.nameuser;
      this.nurse.contrasenia=this.nurseForm.value.pass;
      this.nurse.idRol=2;
      //console.log(this.nurse);
      this.authService.saveUser(this.nurse).subscribe(res=>{
        if(res.status==1){
          // Tengo que crear su perfil vacio
          let usuarioId = res.objModel;
          let perfil: Perfil = new Perfil;
          perfil.idUsuario = usuarioId;

          //console.log("Lo que envia", perfil);
          this.perfilService.postPerfil(perfil).subscribe({
            next: (next) => {
              //console.log("La respuesta", next);
            },
            error: (error) => {
              //console.log("Error");
            }
          })

          //console.log("Registrado?",res.objModel + "\n" + res.description);
          this.getNurses();
        }
      })
    }
  }

  getNurse(){
    this.authService.getUserById(this.item.id).subscribe(res=>{
      if(res.status==1){
        this.nurse=res.objModel
        ////console.log(this.nurse);
      }
    })
  }

  getNurses(){
    this.authService.getUsers().subscribe(res=>{
      if(res.status==1){{
        this.authService.listNurse = res.objModel.filter(x => x.idRol==2 && x.esActivo==true)
        return this.modalCtrl.dismiss('confirm');
      }}
    })
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}
