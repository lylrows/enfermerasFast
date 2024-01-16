import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { PerfilService } from '../../../services/perfil.service';
import { AuthService } from '../../../services/auth-service.service';
import { EspecialidadService } from '../../../services/especialidad.service';
import { perfilespecialidad } from '../../../models/speciality/especialidades.model';

export interface Especialidad{
  id:number;
  nameSpeciality:string;
}

@Component({
  selector: 'app-specialization',
  templateUrl: './specialization.component.html',
  styleUrls: ['./specialization.component.scss']
})
export class SpecializationComponent implements OnInit {

  specializationForm: FormGroup;
  especialidades: Array<Especialidad>;
  listSpeciality:any
  perfilEspecialidad: perfilespecialidad=new perfilespecialidad();

  customActionSheetOptions = {
    header: 'Selecciona una especialidad'
  };
  user: any;

  constructor(
    private modalCtrl: ModalController,
    public authService: AuthService,
    public especialidadService: EspecialidadService,
    private perfilService: PerfilService
  ) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('currentUser'));
    this.getListSpeciality();
    this.getListSpecialityByUser();
    this.especialidades = [
      {id: 1, nameSpeciality: 'Salud Mental y Psiquiatria'},
      {id: 2, nameSpeciality: 'Enfermería en UCI'},
      {id: 3, nameSpeciality: 'Enfermería en Cardiología'},
      {id: 4, nameSpeciality: 'Enfermería Oncológica'}
    ];

    this.specializationForm = new FormGroup({
      'speciality': new FormControl(this.especialidades[1].id,Validators.compose([
        Validators.required,
        Validators.maxLength(50)
      ]))
    })
  }

  saveEspecialityForm(){
    //console.log(this.specializationForm.value.speciality);
    //console.log(this.especialidadService.listSpecialityByUser);
    //console.log('save');
    
    this.perfilService.getPerfilByUserId(this.user.id).subscribe(res=>{
      if(res.status==1){
        let perfil=res.objModel;
        this.perfilEspecialidad.idPerfil=Number(perfil.id);
        this.perfilEspecialidad.idEspecialidad=Number(this.specializationForm.value.speciality);
        //console.log(this.especialidadService.listSpecialityByUser.length);
        if(this.especialidadService.listSpecialityByUser.length==0){
          //console.log('cuando lista es nula');
          this.especialidadService.savePerfilEspecialidad(this.perfilEspecialidad).subscribe(res=>{
            if(res.status==1){
              //console.log(res.objModel);
              this.getListSpecialityByUser();
            }
          })
        }else{
          for (let i = 0; i < this.especialidadService.listSpecialityByUser.length; i++) {
            if(this.perfilEspecialidad.idEspecialidad == this.especialidadService.listSpecialityByUser[i].idEspecialidad){
              //console.log('se repite');
              return;
            }else{
              //console.log('cuando no se repite');
              this.especialidadService.savePerfilEspecialidad(this.perfilEspecialidad).subscribe(res=>{
                if(res.status==1){
                  //console.log(res.objModel);
                  this.getListSpecialityByUser();
                }
              })
              return;
            }
          }          
        }
      }
    })
  }

  deleteSpeciality(item){
    this.perfilEspecialidad.id=item.idPerfilEspecialidad;
    this.perfilEspecialidad.idEspecialidad=item.idEspecialidad;
    this.perfilEspecialidad.idPerfil=item.idPerfil;
    this.especialidadService.deletePerfilEspecialidad(this.perfilEspecialidad).subscribe(res=>{
      if(res.status==1){
        //console.log(res.objModel);
        this.getListSpecialityByUser();
      }
    })
  }

  getListSpeciality(){//para la lista del select
    this.especialidadService.getEspecialidades().subscribe(res => {
      if(res.status==1){
        this.especialidadService.listSpeciality=res.objModel.filter(x=>x.esActivo==true);
      }
    })
  }

  getListSpecialityByUser(){//para la tabla
    this.especialidadService.getEspecialidadDetalle(this.user.id).subscribe(res=>{
      if(res.status==1){
        this.especialidadService.listSpecialityByUser=res.objModel
      }
    })
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}
