import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShoppingCartPageRoutingModule } from './shopping-cart-routing.module';

import { ShoppingCartPage } from './shopping-cart.page';
import { TitulosPaginasComponent } from 'src/app/components/titulos-paginas/titulos-paginas.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShoppingCartPageRoutingModule
  ],
  declarations: [ShoppingCartPage, TitulosPaginasComponent]
})
export class ShoppingCartPageModule {}
