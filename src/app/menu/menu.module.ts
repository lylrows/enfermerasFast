import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu.component';
import { ShellModule } from '../shell/shell.module';

@NgModule({
    imports: [
      CommonModule,
      IonicModule,
      ShellModule
      //RouterModule.forChild(routes),
      //ComponentsModule
    ],
    declarations: [MenuComponent]
  })

export class MenuModule {

}
