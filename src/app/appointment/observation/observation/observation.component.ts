import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { observation } from '../../../models/Cita/observation.model';
import { CitasService } from '../../../services/citas.service';

@Component({
  selector: 'app-observation',
  templateUrl: './observation.component.html',
  styleUrls: ['./observation.component.scss'],
})
export class ObservationComponent implements OnInit {
  obsForm: FormGroup
  @Input("id") id;
  @Input("obs") obs;
  citaDatos:observation;
  constructor(
    private modalCtrl: ModalController,
    private citasService: CitasService
    ) { }

  ngOnInit() {
    //console.log(this.id);
    //console.log(this.obs);
    this.getCita();
    this.obsForm = new FormGroup({
      'obs':new FormControl(this.obs,Validators.compose([
        Validators.maxLength(200)
      ]))
    })
  }

  getObsForm(){
    let varr:string = this.obsForm.value.obs
    ////console.log(varr.split('-'));this.citaDatos.observacion+ "\n" +
    this.citaDatos.observacion=varr;
    this.citasService.updateObs(this.citaDatos).subscribe(res=>{
      if(res.status==1){
        //console.log(res);
      }
    })
  }

  getCita(){
    this.citasService.getCita(this.id).subscribe(res=>{
      if(res.status==1){
        this.citaDatos=res.objModel;
        ////console.log(this.citaDatos.observacion);
      }
    })
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
