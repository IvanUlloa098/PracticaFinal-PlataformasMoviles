import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Address } from '../domain/address';

@Injectable({
  providedIn: 'root'
})

export class LocationService {

  constructor(public afs: AngularFirestore) { }

  saveLocation(address: Address) {
    const refContactos = this.afs.collection("address") 

    if(address.id == null) {
      address.id = this.afs.createId()
    }

    refContactos.doc(address.id).set(Object.assign({}, address))
  }

  getLocations(user: string) {
    return this.afs.collection("address",ref => ref.where("user", "==", user)).valueChanges()
  }
}

