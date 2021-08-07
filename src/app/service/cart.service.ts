import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Item } from '../domain/item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(public afs: AngularFirestore) { }

  addToCart(item: Item) {
    const refContactos = this.afs.collection("cart") 

    if(item.id == null) {
      item.id = this.afs.createId()
      item.active = true

    }

    refContactos.doc(item.id).set(Object.assign({}, item))

  }

}
