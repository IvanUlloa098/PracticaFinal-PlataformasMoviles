import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { Ingredient } from '../domain/ingredient';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  ingredient: Ingredient = new Ingredient()
  ingredients: any
  establishments: any

  constructor(private http: HttpClient, public afs: AngularFirestore) { }

  async fillPrices() {

    const refContactos = this.afs.collection("ingredients") 
    this.ingredients = await this.http.get<any>(environment.WS_PATH + "/list.php?i=list").toPromise()

    for (let i = 0; i < 607; i++) {
      this.ingredient = new Ingredient()
      this.ingredient.id = this.afs.createId()
      this.ingredient.idIngredient = this.ingredients['meals'][i].idIngredient
      this.ingredient.price = Math.floor(Math.random() * (5 - 0.50)) + 0.50

      refContactos.doc(this.ingredient.id).set(Object.assign({}, this.ingredient))

    }

  }


}
