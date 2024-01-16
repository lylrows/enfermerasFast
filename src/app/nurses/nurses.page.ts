import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { usuarios } from '../models/user/usuarios.model';
import { AuthService } from '../services/auth-service.service';
import { NurseComponent } from './nurse/nurse.component';

@Component({
  selector: 'app-nurses',
  templateUrl: './nurses.page.html',
  styleUrls: ['./nurses.page.scss'],
})
export class NursesPage implements OnInit {
  aNurse: usuarios = new usuarios();
  page: number = 0;

  constructor(
    private modalCtrl: ModalController,
    public authService: AuthService) { }

  ngOnInit() {
    this.getNurses();
  }

  nextPage(){
    //console.log(this.authService.listNurse)
    //console.log(this.page);

    let value=this.authService.listNurse.length;
    
    if(this.page<=(value-5)){
      this.page+=5;
    }
  }

  prevPage(){
    if(this.page>0){
      this.page-=5;
    }
  }


  async openModal(op:string){
    const modal = await this.modalCtrl.create({
      component: NurseComponent,
      componentProps: {
        op:op
      }
    });
    modal.present();
  }

  async openModal2(op:string,item: any){
    const modal = await this.modalCtrl.create({
      component: NurseComponent,
      componentProps: {
        op:op, item:item
      }
    });
    modal.present();
    // const { data, role } = await modal.onWillDismiss();
    // if (role === 'confirm') {
    //   this.listNurse=data;
    //   ////console.log(data);
    // }
  }

  getNurses(){
    this.authService.getUsers().subscribe(res=>{
      if(res.status==1){{
        this.authService.listNurse = res.objModel.filter(x => x.idRol==2 && x.esActivo==true)
      }}
    })
  }

  disabledNurse(item:any){
    this.aNurse=item;
    this.aNurse.esActivo=false;
    //console.log(this.aNurse);
    
    this.authService.updateUser(this.aNurse).subscribe(res=>{
      if(res.status==1){
        //console.log(res.objModel);
        this.getNurses();
      }
    })
  }
  

}
