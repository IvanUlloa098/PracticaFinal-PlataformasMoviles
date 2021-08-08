import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisplayIngredientPageRoutingModule } from './display-ingredient-routing.module';

import { DisplayIngredientPage } from './display-ingredient.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisplayIngredientPageRoutingModule
  ],
  declarations: [DisplayIngredientPage]
})
export class DisplayIngredientPageModule {}
