import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../../components/components.module';
import { FormsValidationsPage } from './forms-validations.page';
import { CertificationsComponent } from './certification/certifications.component';
import { SpecializationComponent } from './specialization/specialization.component';
import { MapsComponent } from './maps/maps.component';
import { TermsComponent } from './terms/terms.component';

const routes: Routes = [
  {
    path: '',
    component: FormsValidationsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [FormsValidationsPage, CertificationsComponent, SpecializationComponent, MapsComponent, TermsComponent]
})
export class FormsValidationsPageModule {}
