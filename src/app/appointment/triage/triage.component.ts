import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ParametrosService } from '../../services/parametros.service';
import { triage } from '../../models/Cita/triage.model';
import { CitasService } from '../../services/citas.service';
import { parameterGroup } from '../../models/parameter/parameter.model';

@Component({
  selector: 'app-triage',
  templateUrl: './triage.component.html',
  styleUrls: ['./triage.component.scss'],
})
export class TriageComponent implements OnInit {
  triageForm: FormGroup;
  @Input("id") id;
  @Input("triajeItem") triajeItem: triage=new triage();
  triaje: triage=new triage();
  listTriage: any;
  typeSegur: Array<parameterGroup> = [];;

  validations = {
    'sintomas': [
      { type: 'required', message: 'Se requiere síntomas.' },
      { type: 'maxlength', message: 'No puede tener más de 255 caracteres.' }
    ],
    'presionArterial': [
      { type: 'required', message: 'Se requiere presión arterial.' },
      { type: 'maxlength', message: 'No puede tener más de 7 caracteres.' }
    ],
    'frecuenciaCardiaca': [
      { type: 'required', message: 'Se requiere frecuencia cardíaca.' },
      { type: 'maxlength', message: 'No puede tener más de 3 dígitos.' }
    ],
    'temperatura': [
      { type: 'required', message: 'Se requiere temperatura.' },
      { type: 'maxlength', message: 'No puede tener más de 3 caracteres. Ejm 38.2' }
    ],
    'saturacionOxigeno': [
      { type: 'required', message: 'Se requiere saturación de oxígeno.' },
      { type: 'maxlength', message: 'No puede tener más de 3 dígitos.' }
    ],
    'peso': [
      { type: 'required', message: 'Se requiere peso.' },
      { type: 'maxlength', message: 'No puede tener más de 4 dígitos.' }
    ],
    'talla': [
      { type: 'required', message: 'Se requiere talla.' },
      { type: 'maxlength', message: 'No puede tener más de 3 dígitos.' }
    ],
    'antecedentesMedicos': [
      { type: 'required', message: 'Se requiere antecedentes médicos.' },
      { type: 'maxlength', message: 'No puede tener más de 500 caracteres.' }
    ],
    'diagnosticoProvisional': [
      { type: 'required', message: 'Se requiere diagnótico provisional.' },
      { type: 'maxlength', message: 'No puede tener más de 255 caracteres.' }
    ],
    'tratamientoRecomendado': [
      { type: 'required', message: 'Se requiere tratamiento recomendado.' },
      { type: 'maxlength', message: 'No puede tener más de 500 caracteres.' }
    ],
    'observaciones': [
      { type: 'required', message: 'Se requiere observaciones.' },
      { type: 'maxlength', message: 'No puede tener más de 500 caracteres.' }
    ]
  };
  dataUser: any;

  constructor(
    private modalCtrl: ModalController,
    private citasService: CitasService,
    private parameterService: ParametrosService,
    ) { }

  ngOnInit() {
    ////console.log(this.triajeItem);
    this.dataUser=JSON.parse(localStorage.getItem("currentUser"));
    this.getParameter();

    if(this.triajeItem==null){
      this.triajeItem=new triage()
    }

    this.triageForm = new FormGroup({
      'sintomas': new FormControl((this.triajeItem.signosSintomas || ''),Validators.compose([
        Validators.required,
        Validators.maxLength(255)
      ])),
      'presionArterial': new FormControl((this.triajeItem.presionArterial || ''),Validators.compose([
        Validators.required,
        Validators.maxLength(7)
      ])),
      'frecuenciaCardiaca': new FormControl((this.triajeItem.frecuenciaCardiaca || ''),Validators.compose([
        Validators.required,
        Validators.maxLength(3)
      ])),
      'temperatura': new FormControl((this.triajeItem.temperatura || ''),Validators.compose([
        Validators.required,
        Validators.maxLength(3)
      ])),
      'saturacionOxigeno': new FormControl((this.triajeItem.saturacionOxigeno || ''),Validators.compose([
        Validators.required,
        Validators.maxLength(3)
      ])),
      'peso': new FormControl((this.triajeItem.peso || ''),Validators.compose([
        Validators.required,
        Validators.maxLength(4)
      ])),
      'talla': new FormControl((this.triajeItem.talla || ''),Validators.compose([
        Validators.required,
        Validators.maxLength(3)
      ])),
      'antecedentesMedicos': new FormControl((this.triajeItem.antecedentesMedicos || ''),Validators.compose([
        Validators.required,
        Validators.maxLength(500)
      ])),
      'diagnosticoProvisional': new FormControl((this.triajeItem.diagnosticoProvisional || ''),Validators.compose([
        Validators.required,
        Validators.maxLength(255)
      ])),
      'tratamientoRecomendado': new FormControl((this.triajeItem.tratamientoRecomendado || ''),Validators.compose([
        Validators.required,
        Validators.maxLength(500)
      ])),
      'seguro': new FormControl((this.triajeItem.idSeguro || this.typeSegur[0]?.idParametro),Validators.compose([
        Validators.required,
        Validators.maxLength(500)
      ])),
      'observaciones': new FormControl((this.triajeItem.observaciones || ''),Validators.compose([
        Validators.required,
        Validators.maxLength(500)
      ])),
    })
  }

  saveTriage(){
      if(this.triajeItem.id==0){
        this.triaje= new triage();
        this.triaje.id=0;
        this.triaje.idCita=Number(this.id);
        this.triaje.signosSintomas=this.triageForm.value.sintomas;
        this.triaje.presionArterial=this.triageForm.value.presionArterial;
        this.triaje.frecuenciaCardiaca=Number(this.triageForm.value.frecuenciaCardiaca);
        this.triaje.temperatura=Number(this.triageForm.value.temperatura);
        this.triaje.saturacionOxigeno=Number(this.triageForm.value.saturacionOxigeno);
        this.triaje.peso=Number(this.triageForm.value.peso);
        this.triaje.talla=Number(this.triageForm.value.talla);
        this.triaje.antecedentesMedicos=this.triageForm.value.antecedentesMedicos;
        this.triaje.diagnosticoProvisional=this.triageForm.value.diagnosticoProvisional;
        this.triaje.tratamientoRecomendado=this.triageForm.value.tratamientoRecomendado;
        this.triaje.idSeguro=this.triageForm.value.seguro;
        this.triaje.observaciones=this.triageForm.value.observaciones;
        ////console.log(this.triaje);
        this.citasService.saveTriage(this.triaje).subscribe(res=>{
          if(res.status==1){
            //console.log(res.objModel);
            this.getTriage();
          }
        })
      }else {
        //console.log(this.triajeItem.id);
        this.triaje.id=this.triajeItem.id;
        this.triaje.idCita=Number(this.id);
        this.triaje.signosSintomas=this.triageForm.value.sintomas;
        this.triaje.presionArterial=this.triageForm.value.presionArterial;
        this.triaje.frecuenciaCardiaca=Number(this.triageForm.value.frecuenciaCardiaca);
        this.triaje.temperatura=Number(this.triageForm.value.temperatura);
        this.triaje.saturacionOxigeno=Number(this.triageForm.value.saturacionOxigeno);
        this.triaje.peso=Number(this.triageForm.value.peso);
        this.triaje.talla=Number(this.triageForm.value.talla);
        this.triaje.antecedentesMedicos=this.triageForm.value.antecedentesMedicos;
        this.triaje.diagnosticoProvisional=this.triageForm.value.diagnosticoProvisional;
        this.triaje.tratamientoRecomendado=this.triageForm.value.tratamientoRecomendado;
        this.triaje.idSeguro=this.triageForm.value.seguro;
        this.triaje.observaciones=this.triageForm.value.observaciones;
        ////console.log(this.triaje);
        this.citasService.updateTriage(this.triaje).subscribe(res=>{
          ////console.log(res);
          if(res.status==1){
            //console.log(res.objModel);
            this.getTriage();
          }
        })
      }
  }

  getTriage(){
    this.citasService.getTriageList().subscribe(res=>{
      if(res.status==1){
        this.listTriage=res.objModel;
        let itemtriage=this.listTriage.find(x=>x.idCita==this.id)
        if(itemtriage!=null){
          //console.log('entra 1er if');
          this.getCita(this.id);//cambiar estado a 4 : en proceso(cita)
        }
        return this.modalCtrl.dismiss(this.listTriage, 'confirm');//mandar la lista actualizada de triajes a appointment
      }
    })
  }

  getCita(idCita:number){
    this.citasService.getCitaById(idCita).subscribe(res=>{
      if(res.status==1){
        let cita =res.objModel;
        if(cita.estado!=4){
          cita.estado=4;
          //console.log(cita);
          this.citasService.updateObs(cita).subscribe(res=>{
            if(res.status==1){
              //console.log(res.objModel);
              this.getCitas(this.dataUser.idRol,this.dataUser.id);
            }
          })          
        }

      }
    })
  }

  getCitas(op:number,id:number){
    this.citasService.getCitasDetalleRol(op,id).subscribe(res=>{
      if(res.status==1){
        this.citasService.listCitas=res.objModel;
        //console.log(this.citasService.listCitas)
      }
    })
  }

  getParameter(){
    this.parameterService.getParameterByGroupId(1017).subscribe(
      res => {
        if(res.objModel != null) {
          this.typeSegur = res.objModel;
        }
      }, err => {
        //console.log(err);
      }
    )
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}
