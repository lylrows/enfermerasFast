import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { ServiciosService } from '../../../services/servicios.service';
import { Servicio } from '../../../models/servicio/servicio.model';
import { Especialidad } from '../../../models/speciality/especialidades.model';
import { EspecialidadService } from '../../../services/especialidad.service';
//import { parameterGroup } from 'src/app/models/parameter/parameter.model';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})

export class ServiceComponent implements OnInit {
  serviceForm: FormGroup;
  especialidades: Array<Especialidad>

  servicio: Servicio = new Servicio;

  titleButton= "";

  constructor(
    private modalCtrl: ModalController,
    private navpar: NavParams,
    private especialidadService: EspecialidadService,
    private servicioService: ServiciosService,
    public alertController: AlertController
  ) {

  }
  ngOnInit(): void {

    this.titleButton = this.navpar.get('tituloBoton');

    if(this.titleButton == 'Actualizar') {
      this.servicio = this.navpar.get('service');
    }
    
    this.getEspecialidades();
    this.serviceForm = new FormGroup({
      'speciality': new FormControl(Validators.compose([
        Validators.required
      ])),
      'name_service': new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(250)
      ])),
      'description': new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(400)
      ])),
      'price': new FormControl(0, Validators.compose([
        Validators.required,
      ])),
    })
  }

  getEspecialidades() {
    this.especialidadService.getEspecialidades().subscribe({
      next: (next) => {
        this.especialidades = next.objModel;
        if(this.titleButton == 'Actualizar') {
          this.serviceForm.get('speciality').setValue(this.servicio.idEspecialidad);
          this.serviceForm.get('name_service').setValue(this.servicio.nombre);
          this.serviceForm.get('description').setValue(this.servicio.descripcion);
          this.serviceForm.get('price').setValue(this.servicio.precio);
        }
      },
      error: (error) => {
        //console.log("Error");
      }
    })
  }

  saveService() {
    this.servicio.idEspecialidad = this.serviceForm.get('speciality').value;
    this.servicio.nombre = this.serviceForm.get('name_service').value;
    this.servicio.descripcion = this.serviceForm.get('description').value;
    this.servicio.precio = Number(this.serviceForm.get('price').value);

    if(this.titleButton == 'Actualizar') {
      this.servicioService.putServicio(this.servicio).subscribe({
        next: (next) => {
          if (next.status == 1) {
            this.presentAlert("Actualizado con éxito", "Se realizó el cambio correctamente")
          } else {
            this.presentAlert("Actualización fallida", "Ocurrió un problema al actualizar el servicio")
          }
        },
        error: (error) => {
          this.presentAlert("Actualización fallida", "Ocurrió un problema al actualizar el servicio")
        }
      })

    } else {
      this.servicioService.postServicio(this.servicio).subscribe({
        next: (next) => {
          if (next.status == 1) {
            this.presentAlert("Creado con éxito", "Se creó el servicio correctamente")
          } else {
          this.presentAlert("Creación fallida", "Ocurrió un problema al crear el servicio")
          }
        },
        error: (error) => {
          this.presentAlert("Creación fallida", "Ocurrió un problema al crear el servicio")
        }
      })
    }

  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async presentAlert(header, message)
  {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [ 'OK']
    });
    await alert.present();
  }
}