import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { CitasService } from '../../../services/citas.service';

@Component({
    selector: 'app-onechat',
    templateUrl: './onechat.component.html',
    styleUrls: ['./onechat.component.scss']
  })

  export class OneChatComponent implements OnInit {
    @Input("item") item:any;
    msg: string;
    itemsRef: AngularFireList<any>;
    items: Observable<any[]>;
    //prove: Observable<any>;
    user: any;
    idUser:number;
    name: string;
    nameChat:string;
    nameNurse: string;
    isPatient: boolean;
    isNurse: boolean;

    constructor(
        public db: AngularFireDatabase,
        public afAuth: AngularFireAuth,
        private router: Router,
        private modalCtrl: ModalController,
        public citasService: CitasService,
        private alertController: AlertController
    ){
        
    }

    ngOnInit(): void {
        ////console.log(this.item);
        this.user=JSON.parse(localStorage.getItem('currentUser'))
        this.getCita();
    }

    createChat() {
        //console.log(this.item.id);
        let valueid:string=this.item.id
        this.itemsRef = this.db.list('chat'+valueid)
        // Use snapshotChanges().map() to store the key
        this.items = this.itemsRef.snapshotChanges().pipe(
          map(changes =>
            changes.map(c => (
                { key: c.payload.key, ...c.payload.val() }
                ))
          )
        );
        
    }

    getCita(){
        this.citasService.getCitaById(this.item.id).subscribe(res=>{
            if(res.status==1){
                let itemCita = res.objModel;
                if(itemCita.estado!=5 && itemCita.estado!=2){
                    if(this.item!=null){
                        this.createChat();
                        if(this.user.idRol==2){
                            this.name=this.item.nombreEnfermera;
                            this.nameChat=this.item.nombrePaciente;
                            this.idUser=this.user.id;
                            this.isPatient=false;
                            this.isNurse=true;
                            //console.log(this.name + ' ' +this.idUser);
                        }else if(this.user.idRol==3){
                            this.name=this.item.nombrePaciente;
                            this.nameChat=this.item.nombreEnfermera;
                            this.idUser=this.user.id;
                            this.isPatient=true;
                            this.isNurse=false;
                            //console.log(this.name + ' ' +this.idUser);
                        }
                    }
                }else{
                    this.alertMsj();
                    this.getCitas();
                    return this.modalCtrl.dismiss('confirm');
                }
            }
        })
    }

    getCitas(){
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
          })
    }

    async alertMsj(){
        const alert = await this.alertController.create({
        header: 'Mensaje',
        message: 'Cita terminada.',
        buttons: ['OK'],
        });
        await alert.present();
    }
    
    addItem(name: string, msj: string) {
        this.msg="";
        if(msj != null && name != null){
            if (msj != "" && name != "") {
                //console.log('name:',name);
                this.itemsRef.push({ name: name, text: msj, id:this.user.id });
                this.scrollLastmsj();
            } else {
                //console.log('Datos nulos');
                return
            }
        }
    }

    handleSubmit(event: { keyCode: number; }) {
        if (event.keyCode === 13) {
            this.addItem(this.name, this.msg);
        }
    }

    scrollLastmsj(){
        //console.log('hey');
        
        let elements = document.getElementsByClassName('msj');
        let ultimo: any = elements[(elements.length - 1)];
        let toppos = ultimo?.offsetTop;
        //console.log(elements);
        //console.log(ultimo);
        //console.log(toppos);
        //@ts-ignore
        document.getElementById('contenedorMensajes')?.scrollTop=toppos;

        //console.log('F');

    }

    deleteEverything() {
        let valueid:string=this.item.id
        const prove = this.db.list('chat'+valueid);
        prove.remove();
    }

    cancel() {
        return this.modalCtrl.dismiss(null, 'cancel');
    }

  }