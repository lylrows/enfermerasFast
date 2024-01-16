import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
//import { Database, set, ref, update } from '@angular/fire/database';
import { Observable, map } from 'rxjs';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { nursecita } from '../../models/nursecita/nursecita.model';
import { CitasService } from '../../services/citas.service';
import { ModalController } from '@ionic/angular';
import { OneChatComponent } from './onechat/onechat.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  msg: string;
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  dataList:any;
  objList:any;
  user: any;

  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private authService: AuthService,
    public citasService: CitasService,
    private modalCtrl: ModalController
  ) {

  }

  ngOnInit(): void {
    this.getCitas();
  }

  getCitas(){
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.citasService.getCitasDetalleRol(this.user.idRol,this.user.id).subscribe(res=>{
      if(res.status==1){
        //console.log(res.objModel);
        this.citasService.listChats=res.objModel;
        //console.log(this.citasService.listChats);
        
        if(this.user.idRol==3){
          this.citasService.listChats=this.citasService.listChats.filter(x=>x.idPaciente==this.user.id && x.estado!=5 && x.estado!=2);
          //console.log(this.citasService.listChats);
        }else if(this.user.idRol==2){
          this.citasService.listChats=this.citasService.listChats.filter(x=>x.idEnfermera==this.user.id && x.estado!=5 && x.estado!=2);
          
        }else if(this.user.idRol==1){
          //console.log("Es ADM");
        }
      }
      console.log("listChats",this.citasService.listChats);
    })
  }

  getUser(id:number){
    this.authService.getUserById(id).subscribe(res=>{
      if(res.status==1){

      }
    })
  }
  async openModal(item:any){
    //console.log(item);
    const modal = await this.modalCtrl.create({
      component: OneChatComponent,
      componentProps: {
        item:item
      }
    });
    modal.present();
  }

}
