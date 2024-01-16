import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Especialidad } from '../../models/speciality/especialidades.model';
import { EspecialidadService } from '../../services/especialidad.service';

@Component({
  selector: 'app-mantenimiento-especialidad',
  templateUrl: './mantenimiento-especialidad.component.html',
  styleUrls: ['./mantenimiento-especialidad.component.scss'],
})
export class MantenimientoEspecialidadComponent implements OnInit {
  espForm: FormGroup;
  especialidad: Especialidad = new Especialidad();

  constructor(public especialidadService: EspecialidadService) { }

  ngOnInit() {
    this.getEspecialidades();
    this.espForm = new FormGroup({
      'nombreEspecialidad': new FormControl('',Validators.compose([
        Validators.required,
        Validators.maxLength(20)
      ]))
    })
  }

  saveSpecialityForm(){
    this.especialidad=new Especialidad();
    //console.log(this.espForm.value);
    if(this.especialidad.id==0){
      this.especialidad.nombreEspecialidad=this.espForm.value.nombreEspecialidad;
      this.especialidadService.saveSpeciality(this.especialidad).subscribe(res=>{
        if(res.status==1){
          //console.log(res.objModel);
          this.getEspecialidades();
        }
      })
    }else{
      this.especialidad.nombreEspecialidad=this.espForm.value.nombreEspecialidad;
      this.especialidadService.updateSpeciality(this.especialidad).subscribe(res=>{
        if(res.status==1){
          //console.log(res.objModel);
          this.getEspecialidades();
        }
      })
    }
      
  }

  updateEspecialidad(item:any){
    this.especialidad=new Especialidad();
    this.especialidad.id=item.id;
    this.espForm.get('nombreEspecialidad').setValue(item.nombreEspecialidad);
  }

  deleteEspecialidad(item){
    this.especialidad=new Especialidad();
    this.especialidad.id=item.id;
    this.especialidad.nombreEspecialidad=item.nombreEspecialidad;
    this.especialidad.esActivo=false;
    //console.log(this.especialidad);
    this.especialidadService.updateSpeciality(this.especialidad).subscribe(res=>{
      if(res.status==1){
        //console.log(res.objModel);
        this.getEspecialidades();
      }
    })
  }

  getEspecialidades(){
    this.especialidadService.getEspecialidades().subscribe(res=>{
      if(res.status==1){
        this.especialidadService.listEspecialidades=res.objModel.filter(x=>x.esActivo==true);
      }
    })
  }
}
