import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnfermeraCitasComponent } from './enfermera-citas.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapaDesplazamientoComponent } from './mapa-desplazamiento/mapa-desplazamiento.component';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [EnfermeraCitasComponent, MapaDesplazamientoComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EnfermeraCitasModule { }
