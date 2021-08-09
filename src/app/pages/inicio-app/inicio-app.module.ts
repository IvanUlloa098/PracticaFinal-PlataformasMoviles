import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioAppPageRoutingModule } from './inicio-app-routing.module';

import { InicioAppPage } from './inicio-app.page';
import { TitulosPaginasComponent } from 'src/app/components/titulos-paginas/titulos-paginas.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioAppPageRoutingModule
  ],
  declarations: [InicioAppPage, TitulosPaginasComponent]
})
export class InicioAppPageModule {}
