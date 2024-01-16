import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { IResolvedRouteData, ResolverHelper } from '../../utils/resolver-helper';
import { FashionListingModel } from './fashion-listing.model';
import { switchMap } from 'rxjs/operators';
import { ServiciosService } from '../../services/servicios.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ServiceComponent } from './service/service.component';
import { Servicio } from '../../models/servicio/servicio.model';

@Component({
  selector: 'app-fashion-listing',
  templateUrl: './fashion-listing.page.html',
  styleUrls: [
    './styles/fashion-listing.page.scss',
    './styles/fashion-listing.shell.scss'
  ]
})
export class FashionListingPage implements OnInit {
  // Gather all component subscription in one place. Can be one Subscription or multiple (chained using the Subscription.add() method)
  subscriptions: Subscription;

  listing: FashionListingModel;

  servicios: Array<Servicio> = [];

  user: any;

  @HostBinding('class.is-shell') get isShell() {
    return (this.listing && this.listing.isShell) ? true : false;
  }

  constructor(
    private serviciosService: ServiciosService,
    private modalCtrl: ModalController,
    public alertController: AlertController
    ) { }

  ngOnInit(): void {
    this.getServicios();
    this.user=JSON.parse(localStorage.getItem('currentUser'));
  }

  getServicios() {
    this.serviciosService.getServices().subscribe({
      next: (next) => {
        this.servicios = next.objModel;
        //console.log("Probando", next, this.servicios)
      },
      error: (error) => {
        //console.log("Error");
      }
    })
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ServiceComponent,
      componentProps: {
        'tituloBoton': 'Guardar'
      }
    });

    modal.onDidDismiss().then((resp: any)=> {
      this.getServicios();
    });

    modal.present();
  }

  async editService(service) {
    const modal = await this.modalCtrl.create({
      component: ServiceComponent,
      componentProps: {
        'service': service,
        'tituloBoton': 'Actualizar'
      }
    });
    modal.onDidDismiss().then((resp: any)=> {
      this.getServicios();
    });
    modal.present();
  }

  async deleteService(service) {
    const alert = await this.alertController.create({
      header: "Eliminar Servicio",
      message: "¿Estas seguro que deseas eliminar este servicio?",
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            //console.log("Se canceló");
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.serviciosService.deleteServicio(service).subscribe({
              next: (next) => {
                //console.log("Eliminado con exito");
                this.getServicios();
              }
            })
          }
        }
      ]
    });
    await alert.present();
  }
}
