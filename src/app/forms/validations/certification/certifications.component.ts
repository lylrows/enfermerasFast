import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CertificacionService } from '../../../services/certificacion.service';
import { certifications } from '../../../models/certification/certifications.model';
import { AuthService } from '../../../services/auth-service.service';
import { PerfilService } from "../../../services/perfil.service";

export interface Pais{
    id:number;
    namePais:string;
}

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.scss']
})
export class CertificationsComponent implements OnInit {
  
  certificationForm: FormGroup;
  countries: Array<Pais>;
  certification: certifications= new certifications;
  listCertification: any;
  user:any;

  validation_messages = {
    'namecertification': [
      { type: 'required', message: 'Nombre de certificado es requerido.' }
    ],
    'hourscertification': [
      { type: 'required', message: 'Horas de certificación es requerido.' }
    ],
    'nameinstitution': [
      { type: 'required', message: 'Nombre de la institución es requerido.' }
    ],
    'country': [
      { type: 'required', message: 'Ingresar nombre del país.' }
    ],
  };

  constructor(
    private modalCtrl: ModalController,
    public authService: AuthService,
    public certificacionService: CertificacionService,
    private perfilService: PerfilService
  ) { }

  ngOnInit(): void {

    //console.log(this.authService.usuario);
    
    this.user=JSON.parse(localStorage.getItem('currentUser'));

    this.getListCertifications();

    this.countries = [
      {id: 1, namePais: 'Perú'},
      {id: 2, namePais: 'EE.UU'},
      {id: 3, namePais: 'Rusia'},
      {id: 4, namePais: 'Other'},
    ];

    this.certificationForm = new FormGroup({
      'name_certification': new FormControl('',Validators.compose([
        Validators.required,
        Validators.maxLength(350)
      ])),
      'hours_certification': new FormControl('',Validators.compose([
        Validators.required,
        Validators.maxLength(3)
      ])),
      'name_institution': new FormControl('',Validators.compose([
        Validators.required,
        Validators.maxLength(450)
      ])),
      'country': new FormControl(this.countries[0].id,Validators.required),
    })
  }

  getSaveCertification(){
    //console.log(this.certificationForm.value);

    this.perfilService.getPerfilByUserId(this.user.id).subscribe(res=>{
      if(res.status==1){
        let perfil=res.objModel;
        if(this.certification.id==0){
          this.certification.idPerfil=perfil.id;
          this.certification.nombreCertificado=this.certificationForm.value.name_certification;
          this.certification.horasCertificadas=+this.certificationForm.value.hours_certification;
          this.certification.institucion=this.certificationForm.value.name_institution;
          this.certification.idPais=this.certificationForm.value.country;
          //console.log(this.certification);
          this.certificacionService.saveCertification(this.certification).subscribe(res => {
            if(res.status==1){
              let response=res.objModel;
              //console.log('Guardado',response);
              //this.certification=new certifications();
              this.getListCertifications();
            }else{
              //console.log(res.description);
            }
          })
        }else{
          this.certification.idPerfil=perfil.id;
          this.certification.nombreCertificado=this.certificationForm.value.name_certification;
          this.certification.horasCertificadas=+this.certificationForm.value.hours_certification;
          this.certification.institucion=this.certificationForm.value.name_institution;
          this.certification.idPais=this.certificationForm.value.country;
          this.certificacionService.updateCertification(this.certification).subscribe(res=>{
            if(res.status==1){
              //console.log('Actualizado',res.objModel);
              this.getListCertifications();
            }
          })
        }
        this.cleanForm()
      }
    })

  }

  updateCertificacion(item:any){
    //console.log(item);
    this.certification=new certifications();
    this.certification.id=item.id;
    this.certificationForm.get('name_certification').setValue(item.nombreCertificado);
    this.certificationForm.get('hours_certification').setValue(item.horasCertificadas);
    this.certificationForm.get('name_institution').setValue(item.institucion);
    this.certificationForm.get('country').setValue(item.idPais);

    // this.certification=new certifications();
    // this.certification.id=item.id;
    // this.certification.idPerfil=item.idPerfil;
    // this.certification.nombreCertificado=item.nombreCertificado;
    // this.certification.horasCertificadas=Number(item.horasCertificadas);
    // this.certification.institucion=item.institucion;
    // this.certification.idPais=item.idPais;
    // //console.log(this.certification);
  }

  cleanForm(){
    this.certificationForm.get('name_certification').setValue(' ');
    this.certificationForm.get('hours_certification').setValue(' ');
    this.certificationForm.get('name_institution').setValue(' ');
    this.certificationForm.get('country').setValue(1);
  }

  deleteCertification(item){
    this.certification=new certifications();
    this.certification.id=Number(item.idPerfilCertificado);
    this.certification.idPerfil=Number(item.idPerfil);
    this.certification.nombreCertificado=item.nombreCertificado;
    this.certification.horasCertificadas=Number(item.horasCertificadas);
    this.certification.institucion=item.institucion;
    this.certification.idPais=Number(item.idPais);
    //console.log(this.certification);
    
    this.certificacionService.deletePerfilCertificado(this.certification).subscribe(res=>{
      if(res.status==1){
        //console.log(res.objModel);
        this.getListCertifications();
      }
    })
  }

  getListCertifications(){
    this.certificacionService.getCertificadoDetalle(this.user.id).subscribe(res => {
      this.certificacionService.listCertification=res.objModel;
      //console.log(this.certificacionService.listCertification);
    } )
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }


}
