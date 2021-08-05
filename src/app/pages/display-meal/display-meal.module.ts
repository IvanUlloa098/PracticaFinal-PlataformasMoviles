import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisplayMealPageRoutingModule } from './display-meal-routing.module';

import { DisplayMealPage } from './display-meal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisplayMealPageRoutingModule
  ],
  declarations: [DisplayMealPage]
})
export class DisplayMealPageModule {}
