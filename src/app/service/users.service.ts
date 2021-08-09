import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../domain/user';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private afs: AngularFirestore) { }
}
