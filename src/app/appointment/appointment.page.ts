import { Component, OnInit } from '@angular/core';
import { CitasService } from '../services/citas.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ObservationComponent } from './observation/observation/observation.component';
import { TriageComponent } from './triage/triage.component';
import { triage } from '../models/Cita/triage.model';
import { RatingComponent } from './rating/rating.component';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MapaDesplazamientoComponent } from '../enfermera-citas/mapa-desplazamiento/mapa-desplazamiento.component';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss','./appointment.responsive.scss'],
})
export class AppointmentPage implements OnInit {
  //Page para CITAS
  listAppointment: any;
  msg:string="";
  triageList: any;
  triageItem: any;
  isEnd: boolean=false;
  dataUser:any;
  handlerMessage = '';
  roleMessage = '';
  page: number = 0;
  listCitas:any;

  constructor(
    public citasService: CitasService,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private db: AngularFireDatabase,) { }

  ngOnInit() {
    this.dataUser=JSON.parse(localStorage.getItem("currentUser"));
    this.getCitas(this.dataUser.idRol,this.dataUser.id);
    //console.log(this.dataUser);
    this.getTriage();
  }

  nextPage(){

    let value=this.citasService.listCitas.length;
    
    if(this.page<=(value-5)){
      this.page+=5;
    }
  }

  prevPage(){
    if(this.page>0){
      this.page-=5;
    }
  }

  getCitas(op:number,id:number){
    this.citasService.getCitasDetalleRol(op,id).subscribe(res=>{
      if(res.status==1){
        this.listAppointment={};
        this.listAppointment=res.objModel;
        this.citasService.listCitas=res.objModel;
        //console.log(this.citasService.listCitas)
      }
    })
  }

  async openModal(id:number,obs:string){//observación
    //console.log(obs);
    
    const modal = await this.modalCtrl.create({
      component: ObservationComponent,
      componentProps: {
        id: id, obs:obs
      }
    });
    modal.present();
  }

  async openModal1(id:number,estado:number){//triaje
    this.triageItem=this.triageList.find(x=>x.idCita==id)//para que el modal obtenga los datos actualizados
    ////console.log(this.triageItem);
    const modal = await this.modalCtrl.create({
      component: TriageComponent,
      componentProps: {
        id: id, triajeItem:this.triageItem
      }
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.triageList=data;//recibir la lista actualizada desde el modal
      ////console.log(data);
      this.getCitas(this.dataUser.idRol,this.dataUser.id);
      // if(estado==4){
      //   
      // }
    }
  }

  async openModalRating(item:any){
    const modal = await this.modalCtrl.create({
      component: RatingComponent,
      componentProps: {
        item: item
      }
    });
    modal.present();
  }

  async endAppointment(estado:number,id:number){
    if(estado==4){
        const alert = await this.alertController.create({
        header: '¿Desea terminar la atención?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              this.handlerMessage = 'Cancelado';
            },
          },
          {
            text: 'Confirmar',
            role: 'confirm',
            handler: () => {
              this.handlerMessage = 'Confirmado';
            },
          },
        ],
      });

      await alert.present();

      const { role } = await alert.onDidDismiss();
      this.roleMessage = `${role}`;
      if(this.roleMessage===`confirm`){
        //console.log('cambiar estado a 5');
        this.getCita(id);
        this.deleteChat(id);
      }
    }else if(estado==5){
      const alert1 = await this.alertController.create({
        header: 'Mensaje',
        message: 'La cita ya está terminada',
        buttons: ['OK'],
      });
  
      await alert1.present();
    }
  }

  deleteChat(id:number){
    let valueid:string=id.toString();
    const prove = this.db.list('chat'+valueid);
    prove.remove();
  }

  getTriage(){
    this.citasService.getTriageList().subscribe(res=>{
      if(res.status==1){
        this.triageList=res.objModel;
        ////console.log(this.triageList);
      }
    })
  }

  getCita(idCita:number){
    this.citasService.getCitaById(idCita).subscribe(res=>{
      if(res.status==1){
        let cita =res.objModel;
        if(cita.estado!=5){
          cita.estado=5;
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

  async openMapaDesplazamiento(item) {
    const modal = await this.modalCtrl.create({
      component: MapaDesplazamientoComponent,
      componentProps: {
        'cita': item
      }
    });

    // modal.onDidDismiss().then((resp: any)=> {
    //   this.getServicios();
    // });

    modal.present();
  }

}
