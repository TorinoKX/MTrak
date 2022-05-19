import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedDetailsPageRoutingModule } from './med-details-routing.module';

import { MedDetailsPage } from './med-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedDetailsPageRoutingModule
  ],
  declarations: [MedDetailsPage]
})
export class MedDetailsPageModule {}
