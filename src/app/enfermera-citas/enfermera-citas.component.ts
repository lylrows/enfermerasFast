import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cita } from '../models/cita/cita.model';
import { CitasService } from '../services/citas.service';
import { MapaDesplazamientoComponent } from './mapa-desplazamiento/mapa-desplazamiento.component';

@Component({
  selector: 'app-enfermera-citas',
  templateUrl: './enfermera-citas.component.html',
  styleUrls: ['./enfermera-citas.component.scss'],
})
export class EnfermeraCitasComponent implements OnInit {

  idEnfermera: number;
  citas: Array<Cita> = [];
  citasFiltrado: Array<Cita> = [];
  estadoFiltro = 3;
  constructor(
    private citasService: CitasService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  ionViewDidEnter() {
    this.idEnfermera = JSON.parse(localStorage.getItem('currentUser')).id;
    this.estadoFiltro = 3;
    this.getMisCitas();
  }
  
  getMisCitas() {
    this.citasService.getCitasByEnfermeraId(this.idEnfermera).subscribe({
      next: (resp) => {
        if(resp.objModel != null) {
          this.citas = resp.objModel;
          this.filtrarCitas();
          // this.citas = resp.objModel.filter(x => x.estado == 3);
        } else {
          this.citas = [];
        }
      }
    })
  }

  filtrarCitas() {
    //console.log("Probanding");
    
    this.citasFiltrado = this.citas.filter(x => x.estado == this.estadoFiltro);
  }


  operacionCita(item, option) {
    item.estado = option == 1? 1:2;
    this.citasService.putCita(item).subscribe({
      next: (resp) => {
        if(resp.objModel) {
          //console.log("SE ACTUALIZÓ CON EXITO");
        } 
        else {
          //console.log("Esta cita no esta disponible", resp);
        }
        this.getMisCitas();
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
