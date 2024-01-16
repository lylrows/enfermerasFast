import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../components/components.module';

import { FashionService } from '../fashion.service';
import { FashionListingPage } from './fashion-listing.page';
import { FashionListingResolver } from './fashion-listing.resolver';
import { ServiceComponent } from './service/service.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: FashionListingPage,
    resolve: {
      data: FashionListingResolver
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [FashionListingPage, ServiceComponent],
  providers: [
    FashionListingResolver,
    FashionService
  ]
})
export class FashionListingPageModule {}
