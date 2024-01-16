import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgFloorPipeModule } from 'angular-pipes';

import { TimeDifferencePipe } from './time-difference.pipe';
import { TimeAgoPipe } from './time-ago.pipe';
import { FiltroPipe } from './filtro.pipe';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    NgFloorPipeModule
  ],
  declarations: [
    TimeDifferencePipe,
    TimeAgoPipe,
    FiltroPipe
  ],
  exports: [
    NgFloorPipeModule,
    TimeDifferencePipe,
    TimeAgoPipe,
    FiltroPipe
  ]
})
export class PipesModule {}
