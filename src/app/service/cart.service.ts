import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Item } from '../domain/item';
import { Observable } from 'rxjs';
import { Payment } from '../domain/payment';
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
      item.pagado = false;
    }
    item.pagado = false;
    refContactos.doc(item.id).set(Object.assign({}, item))

  }

  getCarShopping(id: string): Observable<any>{
    return this.afs.collection("cart", 
                             ref => ref.where("pagado", "==", false).where("active", "==", true).where("user", "==", id)).valueChanges();
  }


  eliminarIngredienteCompraCarrito(item: Item){
    this.afs.collection("cart").doc(item.id).delete();
  }

  confirmarPagoProductos(item: Item){
    const refContactos = this.afs.collection("cart") 
    item.pagado = true;
    refContactos.doc(item.id).set(Object.assign({}, item))
  }

  realizarPagoProductos(item: Payment){
    const refContactos = this.afs.collection("Payment") 
    if(item.id == null) {
      item.id = this.afs.createId()
    }
    refContactos.doc(item.id).set(Object.assign({}, item))
  }

}
