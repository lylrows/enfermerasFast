import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { ParametrosService } from '../../../services/parametros.service';
import { parameter } from '../../../models/parameter/parameter.model';

@Component({
  selector: 'app-edit-parametro',
  templateUrl: './edit-parametro.component.html',
  styleUrls: ['./edit-parametro.component.scss'],
})
export class EditParametroComponent implements OnInit {

  titleButton= "";
  parametro: parameter = new parameter;
  parametroForm: FormGroup;


  constructor(
    private modalCtrl: ModalController,
    private navpar: NavParams,
    private parametroService: ParametrosService,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.titleButton = this.navpar.get('tituloBoton');
    let tp_parametro = this.navpar.get('parametro');
    let idPadre = this.navpar.get('idPadre');
    let numberOfChildren = this.navpar.get('numberOfChildren');

    this.parametroForm = new FormGroup({
      'nombreParametro': new FormControl("", Validators.compose([
        Validators.required
      ])),
      'descripcionParametro': new FormControl("", Validators.compose([
        Validators.required,
      ])),
      'abreviacionParametro': new FormControl("", Validators.compose([
        Validators.required,
      ])),
      'valorParametro': new FormControl("-", Validators.compose([
        Validators.required,
      ]))
    })
        
    if(tp_parametro != undefined && tp_parametro != null) {
      this.parametro = tp_parametro;
      this.getParametroForm();
    } else {
      this.parametro.idGrupo = idPadre == undefined? -1 : idPadre;
      this.parametro.idParametro = idPadre == undefined? -1 : Number(numberOfChildren) + 1;
      this.parametro.idPadre = -1;
    }


  }

  getParametroForm() {
    this.parametroForm.get('nombreParametro').setValue(this.parametro.nombreParametro);
    this.parametroForm.get('descripcionParametro').setValue(this.parametro.descripcionParametro);
    this.parametroForm.get('abreviacionParametro').setValue(this.parametro.abreviacionParametro);
    this.parametroForm.get('valorParametro').setValue(this.parametro.valorParametro);
  }

  saveParametro() {
    if(this.parametroForm.valid) {
      this.parametro.nombreParametro = this.parametroForm.get('nombreParametro').value;
      this.parametro.descripcionParametro = this.parametroForm.get('descripcionParametro').value;
      this.parametro.abreviacionParametro = this.parametroForm.get('abreviacionParametro').value;
      this.parametro.valorParametro = this.parametroForm.get('valorParametro').value;
  
      if(this.titleButton == 'Actualizar') {
        this.parametroService.putParametros(this.parametro).subscribe({
          next: (resp) => {
            this.presentAlert("Actualizado con éxito", "Se realizó el cambio correctamente")
            return this.modalCtrl.dismiss(resp.objModel, 'confirm');
          }
        })
      } else {
        this.parametroService.postParametros(this.parametro).subscribe({
          next: (resp) => {
            this.presentAlert("Creado con éxito", "Se creó el parámetro correctamente")
            return this.modalCtrl.dismiss(resp.objModel, 'confirm');
          }
        })
      }
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
