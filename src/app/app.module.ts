import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AgmCoreModule } from '@agm/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { IonicRatingComponentModule } from 'ionic-rating-component';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig), 
    AngularFirestoreModule, AngularFireAuthModule, 
    AngularFireStorageModule, 
    HttpClientModule, 
    AgmCoreModule.forRoot({apiKey: 'AIzaSyCT9wzsIIAkW95uHWVvCbBEP-xtjNbJPow', libraries: ['places', 'geometry']}),
    IonicRatingComponentModule,
    AppRoutingModule],
  providers: [CallNumber, GooglePlus, DatePipe,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
