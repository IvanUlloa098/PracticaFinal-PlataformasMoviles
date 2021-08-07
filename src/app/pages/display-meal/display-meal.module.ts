import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AgmCoreModule } from '@agm/core';

import { DisplayMealPageRoutingModule } from './display-meal-routing.module';

import { DisplayMealPage } from './display-meal.page';
import { IonicRatingComponentModule } from 'ionic-rating-component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicRatingComponentModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyCT9wzsIIAkW95uHWVvCbBEP-xtjNbJPow'}),
    DisplayMealPageRoutingModule
  ],
  declarations: [DisplayMealPage]
})
export class DisplayMealPageModule {}
