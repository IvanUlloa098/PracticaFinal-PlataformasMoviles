import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Comment } from '../domain/comment';
import { Rating } from '../domain/rating';

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

  getRating(user: string, id: string) {
    return this.afs.collection("rating",ref => ref.where("user", "==", user).where("idMeal", "==", id)).valueChanges()
  }

  saveRating(rating: Rating) {
    const refContactos = this.afs.collection("rating") 

    if(rating.id == null) {
      rating.id = this.afs.createId()

    }

    refContactos.doc(rating.id).set(Object.assign({}, rating))
  }

}
