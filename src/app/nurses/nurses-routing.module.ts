import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NursesPage } from './nurses.page';

const routes: Routes = [
  {
    path: '',
    component: NursesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NursesPageRoutingModule {}
