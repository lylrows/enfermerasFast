import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { MapsComponent } from '../forms/validations/maps/maps.component';
import { Cita } from '../models/cita/cita.model';
import { Perfil } from '../models/perfil/perfil.model';
import { Servicio } from '../models/servicio/servicio.model';
import { AuthService } from '../services/auth-service.service';
import { CitasService } from '../services/citas.service';
import { FirebaseServiceService } from '../services/firebase-service.service';
import { PerfilService } from '../services/perfil.service';
import { ServiciosService } from '../services/servicios.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { EspecialidadService } from '../services/especialidad.service';
import { Especialidad } from '../models/speciality/especialidades.model';
import { CitaDetalle } from '../models/cita/citaDetalle.model';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { ContractorRequest } from '../models/contractor/ContractorRequest';
import { PagoService } from '../services/pago.service';
import { Pago } from '../models/Pago/pago.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
//import { NgxSpinnerService } from 'ngx-spinner';
declare const alignetTokenize: any;

@Component({
  selector: 'app-maps',
  templateUrl: './enfermera-busqueda.component.html',
  styleUrls: ['./enfermera-busqueda.component.scss']
})
export class EnfermeraBusquedaComponent  implements OnInit {


  validationsForm: FormGroup;
  servicios: Array<Servicio> = [];
  serviciosFiltro: Array<Servicio> = [];
  especialidades: Array<Especialidad> = [];
  perfiles: Array<any> = [];

  usuarioId: number;


  cita: Cita = new Cita();
  costoTotal: number = 0;
  idCita: number = 0;

  contractor: ContractorRequest = new ContractorRequest();
  private loading: any;
  alignetKey: string = environment.alignetTokenizationKey || "";

  constructor(
    private modalCtrl: ModalController,
    private serviciosService: ServiciosService,
    private perfilService: PerfilService,
    private usuarioService: AuthService,
    private firebaseService: FirebaseServiceService,
    private citaService: CitasService,
    private especialidadService: EspecialidadService,
    private pagoService: PagoService,
    private loadingController: LoadingController,
    private spinner: NgxSpinnerService,
    private router: Router,
    private alertController: AlertController
  ) {

  }

  ngOnInit(): void {
    this.validationsForm = new FormGroup({
      'idEspecialidad': new FormControl(Validators.required),
      'idServicio': new FormControl(Validators.required),
      'latitud': new FormControl(Validators.required),
      'longitud': new FormControl(Validators.required),
      'distancia': new FormControl(1, Validators.required),
      'stringFecha': new FormControl(Validators.required),
      'stringHora': new FormControl(Validators.required),
    });
    this.setDevValues();
    this.getEspecialidad();
    this.getServicios();
    this.getUsuario();
  }

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  
  setDevValues() {
    this.contractor.names = 'JUNIOR';
    this.contractor.lastname1 = 'LAST1';
    this.contractor.lastname2 = 'LAST2';
    this.contractor.idDocType = 15;
    this.contractor.docNumber = this.getRandomInt(0, 99999999).toString();
    this.contractor.verificationDigit = 5;
    this.contractor.email =
      this.contractor.names +
      (this.getRandomInt(0, 50) +
        "@gmail.com");
    this.contractor.email = this.contractor.email.toLowerCase()
    this.contractor.idGender = 1;
    this.contractor.address = 'test dirección';
    this.contractor.telNumber = '941384723';
  }


  getUsuario() {
    let uid = localStorage.getItem('UserUID');

    this.usuarioService.getUserByUid(uid).subscribe({
      next: (next) => {
        this.usuarioId = next.objModel.id

        this.perfilService.getPerfilByUserId(this.usuarioId).subscribe({
          next: (resp) => {
            this.validationsForm.get('latitud').setValue(resp.objModel.latitud);
            this.validationsForm.get('longitud').setValue(resp.objModel.longitud);
          }
        })
      }
    })
  }

  getEspecialidad() {
    this.especialidadService.getEspecialidades().subscribe({
      next: (next) => {
        this.especialidades = next.objModel;
      },
      error: (error) => {
        //console.log("Error");
      }
    })
  }

  getServicios() {
    this.serviciosService.getServices().subscribe({
      next: (next) => {
        this.servicios = next.objModel;
      },
      error: (error) => {
        //console.log("Error");
      }
    })
  }

  numberOnlyValidation(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  busquedaEnfer() {
    if (this.validationsForm) {
      const lat = this.validationsForm.get('latitud').value;
      const lng = this.validationsForm.get('longitud').value;
      const distancia = this.validationsForm.get('distancia').value;
      const idEspecialidad = this.validationsForm.get('idEspecialidad').value;

      //this.presentLoading();
      this.perfilService.getPerfilesCercanos(lat, lng, distancia, idEspecialidad).subscribe({
        next: (next) => {
          if (next.objModel != null) {
            this.perfiles = next.objModel;
            //console.log(this.perfiles);
            this.processArray(this.perfiles, 0);
          }
          else {
            this.perfiles = [];
          }
        },
        error: (error) => {
          this.dismissLoading();
          //console.log("Error");
        }
      })
    }

  }

  processArray(array: Perfil[], index: number = 0): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (index < array.length) {
        const item = array[index];
        //console.log(item);
        
        if(item.tokenFireBase != null) {
          const request = this.firebaseService.enviarMensajePush(item.tokenFireBase)
          request.subscribe(
            (response) => {
              if (response.success > 0) { 
  
                this.cita.idEnfermera = item.idUsuario;
                this.cita.idPaciente = this.usuarioId
                this.cita.fechaAtencion = new Date(this.validationsForm.get('stringFecha').value + "T" + this.validationsForm.get('stringHora').value)
                // En el back llega con 5 horas más.
                this.cita.fechaAtencion.setHours(this.cita.fechaAtencion.getHours() - 5);
                this.cita.estado = 3
  
                // Creo la cita pendiente
                console.log("La cita", this.cita);
                
                this.citaService.postCita(this.cita).subscribe({
                  next: (resp) => {
                    let idCita = resp.objModel;
                    this.idCita = idCita;
                    
                    //console.log("Se creó la cita", idCita);
  
                    setTimeout(() => {
                      const checkRequest = this.citaService.getCitaById(idCita);  // Crear la segunda petición HTTP GET para determinar si se debe pasar al siguiente elemento o terminar el recorrido
                      checkRequest.subscribe(
                        (checkResponse) => {
                          if (checkResponse.objModel.estado == 1) {
                            this.dismissLoading();
                            this.createCitaDetalle(idCita);
                            resolve();
                          } else {
                            //console.log("No se aceptó a cita, procede a eliminarse");
                            this.citaService.deleteCita(checkResponse.objModel).subscribe({
                              next: (resp) => {
                                //console.log(resp);
                                this.processArray(array, index + 1).then(resolve).catch(reject);
                              }
                            })
                          }
                        },
                        (checkError) => {
                          //console.log(`Error processing item ${index} check: ${checkError}`);
                          reject(checkError);
                        }
                      );
                    }, 60000);
                  }
                })
              }
              else {
                // Este tokenFirebase no esta registrado, procede a pasar al siguiente
                //console.log('La enfermera no esta logueada');
                
                this.processArray(array, index + 1).then(resolve).catch(reject);
              }
  
            },
            (error) => {
              this.dismissLoading();
              //console.log(`Error processing item ${index}: ${error}`);
              reject(error);
            }
          );
        } else {
          this.processArray(array, index + 1).then(resolve).catch(reject);
        }

      } else {
        // Debe enviar el mensaje de que no hay enfermeras
        //console.log("Ya no hay enfermeras en lista");
        this.dismissLoading();
        this.presentAlert("Advertencia", "Lo sentimos, no se ha encontrado enfermeras para su búsqueda, intenta ampliando la distancia");
        resolve();
      }
    });
  }

  async createCitaDetalle(idCita) {
    this.presentAlert("Confirmado", "Una enfermera ha aceptado la cita");
    
    await this.recorrerServicios(idCita);

    // Este codigo luego de que se crearon las citas

    this.abrirModalPago(idCita);
    
  }

  abrirModalPago(idCita) {

    let tokenRequest = {
      "action": "tokenize",
      "transaction": {
          "meta": {
              "internal_operation_number": 1,
              "additional_fields": {}
          }
      },
      "card_holder": [
          {
              "first_name": 'Nombre1',
              "last_name": 'Apellido1',
              "email_address": 'prueba1apellido1@gmail.com',
              "identity_document_country": "PE",
              "identity_document_type": "DNI",
              "identity_document_identifier": "76748343"
          }
      ]
    };

    let scope = {
      contractor: this.contractor,
      usuarioService: this.usuarioService,
      pagoService: this.pagoService,
      idCita: idCita,
      costoTotal: this.costoTotal,
      router: this.router,
      sendToken: this.sendToken,
      guardarLog: this.guardarLog
    }

    //console.log(this.alignetKey, idCita, this.costoTotal, this.contractor);
    
    alignetTokenize(this.alignetKey,tokenRequest,"#demo", scope, this.spinner);
  }

  sendToken(response: any) {
    
    //console.log(response);
    
    
    if (response != null){
      if (response.token != null && response.token.length > 0) {
        this.contractor.token = response.token[0].id;
        this.usuarioService.generateAlignetPayment(this.contractor).subscribe((response: any) => {
          // Esto deberia estar dentro del if pero aun no se recibe respuesta
          //console.log('resultado generateAlignetPayment => ', response);
          let pago = new Pago();
          pago.estado = 2;
          pago.fecha = new Date();
          pago.idCita = this.idCita;
          pago.monto = this.costoTotal;
          pago.idTransaccion = Math.floor(Math.random() * 100 + (Math.random() * 100)).toString();
          //console.log("Lo que va pagar", pago);
          this.pagoService.postPago(pago).subscribe({
            next: (next) => {
              //console.log("Pago Realizado con exito");
              this.router.navigate(['/app/categories/appointment']);
            }
          })

          if(response.objModel != null) {
            if (response.resultado == 0) {
              // this.presentAlert("Se realizó el pago con éxito", "Se realizó el pago con éxito");
            } else {
              // this.presentAlert("¡Ocurrió un invonveniente al registrar tu tarjeta!", "Por favor, intenta nuevamente.");
            }            
          } else {
            // this.presentAlert("¡Ocurrió un invonveniente al registrar tu tarjeta!", "Por favor, intenta nuevamente.");
          }       
        }, (error:any) => {
          console.error(error);
          if(error.status == '401') {
            // this.presentAlert("¡Ocurrió un invonveniente!", "Su sesión ha caducado.");
          } else {
            // this.presentAlert("¡Ocurrió un invonveniente al registrar tu tarjeta!", "Por favor, intenta nuevamente.");
          }
        });
      } else {
        // this.presentAlert("¡Ocurrió un invonveniente al registrar tu tarjeta!", "Por favor, intenta nuevamente.");
      }
    } else {
      //console.log("Error al registrar pago");
      // this.presentAlert("¡Ocurrió un invonveniente al registrar tu tarjeta!", "Por favor, intenta nuevamente.");
    }
  }

  guardarLog(mensaje: string) {
    //console.log("El guardarLog", mensaje);
  }

  
  changeServicios(event) {
    //console.log("Evento", );
    this.costoTotal = 0;

    if(event.detail.value.length > 0) {
      event.detail.value.forEach(element => {
       let costoSerivico = this.serviciosFiltro.find(x => x.id == element).precio;
        this.costoTotal += costoSerivico;    
      });
    }

    //console.log("Costo total", this.costoTotal);
    

  }

  async recorrerServicios(idCita) {
    
    let detalleObservable = [];

    for (let servicioId of this.validationsForm.get('idServicio').value) {
      let costoSerivico = this.serviciosFiltro.find(x => x.id == servicioId).precio;
      let citaDetalle: CitaDetalle = {
        id: 0,
        idCita: idCita,
        idServicio: servicioId,
        cantidad: 1,
        costo: costoSerivico
      }

      detalleObservable.push(lastValueFrom(this.citaService.postCitaDetalle(citaDetalle)));
    }

    await Promise.all(detalleObservable).then((value: any) => {
      //console.log("Se agergaron los servicios");
    })
  }

  async presentLoading() {
    /*this.loading = await this.loadingController.create({
      spinner: null,
      message: '<ion-img src="./assets/custom-icons/user/enfermera_loading.gif" alt="loading..."></ion-img>'
    });
    await this.loading.present();*/
  }

  async dismissLoading() {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = null;
    }
  }

  async presentAlert(header, message) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  filtrarServicios() {
    this.validationsForm.get('idServicio').setValue([]);
    let idEspecialidad = Number(this.validationsForm.get('idEspecialidad').value)
    this.serviciosFiltro = this.servicios.filter(x => x.idEspecialidad == idEspecialidad)
  }
}