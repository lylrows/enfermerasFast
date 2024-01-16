import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppointmentPage } from './appointment.page';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { ObservationComponent } from './observation/observation/observation.component';
import { TriageComponent } from './triage/triage.component';
import { RatingComponent } from './rating/rating.component';
import { PipesModule } from '../pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: AppointmentPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    PipesModule
  ],
  declarations: [AppointmentPage,ObservationComponent,TriageComponent,RatingComponent]
})
export class AppointmentPageModule {}
