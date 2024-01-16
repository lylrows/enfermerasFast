import { Component, forwardRef, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { observation } from '../../models/Cita/observation.model';
import { citarating } from '../../models/Cita/citarating.model';
import { CitasService } from '../../services/citas.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RatingComponent), multi: true }
  ],
  encapsulation: ViewEncapsulation.None
})
export class RatingComponent implements ControlValueAccessor,  OnInit {
  currentUser:any;
  @Input() max = 5;
  @Input() readOnly = false;
  @Input("item") item: observation;
  itemRating: citarating=new citarating();
  ListRatingbyIdCita:any;
  userRating:any;

  range: Array<number>;
  innerValue: any; // the value of the control
  propagateChange: any = () => {};
  constructor(
    private modalCtrl: ModalController,
    private citasService: CitasService
  ) { }

  ngOnInit() {
    this.getRatingByIdCita();
    this.range = []; // the amout of stars

    for (let i = 0; i < this.max; i++) {
      this.range[i] = 1;
    }
    //this.value=3;
    this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
    //console.log(this.currentUser);
    //console.log(this.value);
    //console.log(this.innerValue);
  }

  get value(): any {
    return this.innerValue;
  }

  set value(val: any) {
    if (val !== this.innerValue) {
      this.innerValue = val;
      this.propagateChange(val);
    }
  }

  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {
  }

  rate(amount: number) {
    if (!this.readOnly && amount >= 0 && amount <= this.range.length) {
      this.value = amount;
      //console.log(this.value);
      //console.log(this.userRating);
      if(this.userRating==null){
        //console.log('Save');
        //console.log(this.itemRating.id);
        this.itemRating.idCita=this.item.id;
        this.itemRating.idUsuarioCalifica=this.currentUser.id;
        if(this.currentUser.idRol==2){
          this.itemRating.idUsuarioCalificado=this.item.idPaciente;
        }else if(this.currentUser.idRol==3){
          this.itemRating.idUsuarioCalificado=this.item.idEnfermera;
        }
        this.itemRating.puntaje=this.value;
        //console.log(this.itemRating.id);
        this.citasService.saveRating(this.itemRating).subscribe(res=>{
          if(res.status==1){
            //console.log(res.objModel);
            return this.modalCtrl.dismiss(null, 'cancel');
          }
        })
      }else{
        this.itemRating.id=this.userRating.id;
        this.itemRating.idCita=this.userRating.idCita;
        this.itemRating.idUsuarioCalifica=this.currentUser.id;
        this.itemRating.idUsuarioCalificado=this.userRating.idUsuarioCalificado;
        this.itemRating.puntaje=this.value;
        //console.log(this.itemRating);
        this.citasService.updateRating(this.itemRating).subscribe(res=>{
          if(res.status==1){
            //console.log(res.objModel);
            return this.modalCtrl.dismiss(null, 'cancel');
          }
        })
      }

    }
  }

  getRatingByIdCita(){
    this.citasService.getRatingByIdCita(this.item.id).subscribe(res=>{
      if(res.status==1){
        this.ListRatingbyIdCita=res.objModel;
        //console.log("getRating,result: ",this.ListRatingbyIdCita);
        this.userRating=this.ListRatingbyIdCita.find(x=>x.idUsuarioCalifica==this.currentUser.id);
        if(this.userRating!=null){
          //console.log(this.userRating.puntaje);
          this.value=this.userRating.puntaje
        }else{
          //console.log('this.userRating.puntaje is null');
        }
      }
    })
  }

  getByIdRating(){

  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}
