import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsercreatePage } from './usercreate.page';

const routes: Routes = [
  {
    path: '',
    component: UsercreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsercreatePageRoutingModule {}
