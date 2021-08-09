import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AgmCoreModule, LazyMapsAPILoader } from '@agm/core';



import { LocationPage } from './location.page';
import { LocationPageRoutingModule } from './location-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocationPageRoutingModule,
    AgmCoreModule
  ],
  declarations: [LocationPage],
  exports: [
    LazyMapsAPILoader
  ]
})
export class LocationPageModule {}
