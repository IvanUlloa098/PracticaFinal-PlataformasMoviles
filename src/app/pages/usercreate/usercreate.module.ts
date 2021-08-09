import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsercreatePageRoutingModule } from './usercreate-routing.module';

import { UsercreatePage } from './usercreate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsercreatePageRoutingModule
  ],
  declarations: [UsercreatePage]
})
export class UsercreatePageModule {}
