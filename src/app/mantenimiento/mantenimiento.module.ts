import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MantenimientoParametroComponent } from './mantenimiento-parametro/mantenimiento-parametro.component';
import { EditParametroComponent } from './mantenimiento-parametro/edit-parametro/edit-parametro.component';
import { ComponentsModule } from '../components/components.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MantenimientoEspecialidadComponent } from './mantenimiento-especialidad/mantenimiento-especialidad.component';
import { EditCreateEspecialidadComponent } from './mantenimiento-especialidad/edit-create-especialidad/edit-create-especialidad.component';



@NgModule({
  declarations: [
    MantenimientoParametroComponent,
    EditParametroComponent,
    MantenimientoEspecialidadComponent,
    EditCreateEspecialidadComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class MantenimientoModule { }
