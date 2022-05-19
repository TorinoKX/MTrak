import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedDetailsPage } from './med-details.page';

const routes: Routes = [
  {
    path: '',
    component: MedDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedDetailsPageRoutingModule {}
