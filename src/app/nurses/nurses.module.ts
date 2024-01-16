import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NursesPageRoutingModule } from './nurses-routing.module';

import { NursesPage } from './nurses.page';
import { ComponentsModule } from '../components/components.module';
import { NurseComponent } from './nurse/nurse.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NursesPageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [NursesPage,NurseComponent]
})
export class NursesPageModule {}
