import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Comment } from '../domain/comment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(public afs: AngularFirestore) { }

  addComment(item: Comment) {
    const refContactos = this.afs.collection("comment") 

    if(item.id == null) {
      item.id = this.afs.createId()

    }

    refContactos.doc(item.id).set(Object.assign({}, item))

  }

  getComments(id: string) {
    return this.afs.collection("comment",ref => ref.where("idMeal", "==", id)).valueChanges()
  }

}
