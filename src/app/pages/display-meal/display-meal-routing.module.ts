import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisplayMealPage } from './display-meal.page';

const routes: Routes = [
  {
    path: '',
    component: DisplayMealPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisplayMealPageRoutingModule {}
