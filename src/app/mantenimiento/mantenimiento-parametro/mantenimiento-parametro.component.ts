import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { parameter } from '../../models/parameter/parameter.model';
import { ParametrosService } from '../../services/parametros.service';
import { EditParametroComponent } from './edit-parametro/edit-parametro.component';

@Component({
  selector: 'app-mantenimiento-parametro',
  templateUrl: './mantenimiento-parametro.component.html',
  styleUrls: ['./mantenimiento-parametro.component.scss'],
})
export class MantenimientoParametroComponent implements OnInit {

  parametros: Array<parameter> = [];
  parametrosPadres: Array<parameter> = [];
  parametrosHijos: Array<parameter> = [];
  categoriaSeleccionada = 0;
  
  constructor(
    private parametroServices: ParametrosService,
    private modalCtrl: ModalController,
    public alertController: AlertController
  ){ }

  ngOnInit() {
    this.getParametros();
  }

  getParametros() {
    this.parametroServices.getParametros().subscribe({
      next: (next) => {
        this.parametros = next.objModel;
        this.parametrosPadres = this.parametros.filter(x => x.idGrupo == -1);
        this.categoriaSeleccionada = 0;
        this.parametrosHijos = [];
      },
      error: (error) => {
        //console.log("Error");
      }
    })
  }

  changeParametroPadre(idParametroPadre) {
    this.parametrosHijos = this.parametros.filter( x=> x.idGrupo == idParametroPadre);
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: EditParametroComponent,
      componentProps: {
        'tituloBoton': 'Crear'
      }
    });

    modal.onDidDismiss().then((resp: any)=> {
      this.getParametros();
    });

    modal.present();
  }

  async agregarParametro() {
    const modal = await this.modalCtrl.create({
      component: EditParametroComponent,
      componentProps: {
        'tituloBoton': 'Crear',
        'idPadre': this.categoriaSeleccionada,
        'numberOfChildren': this.parametrosHijos.length
      }
    });

    modal.onDidDismiss().then((resp: any)=> {
      this.getParametros();
    });

    modal.present();
  }

  async editParametro(parametro) {
    const modal = await this.modalCtrl.create({
      component: EditParametroComponent,
      componentProps: {
        'parametro': parametro,
        'tituloBoton': 'Actualizar'
      }
    });
    modal.onDidDismiss().then((resp: any)=> {
      //console.log(resp);
      this.getParametros();
    });
    modal.present();
  }

  async deleteParametro(parametro) {
    const alert = await this.alertController.create({
      header: "Eliminar Parámetro",
      message: "¿Estas seguro que deseas eliminar este parámetro?",
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
            this.parametroServices.deleteParametros(parametro).subscribe({
              next: (next) => {
                //console.log("Eliminado con exito");
                this.getParametros();
              }
            })
          }
        }
      ]
    });
    await alert.present();
  }
}
