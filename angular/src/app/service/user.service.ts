import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dbPath = '/user_roles';

  userRef: AngularFirestoreCollection;

  constructor(private db: AngularFirestore) {
    this.userRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection {
    return this.userRef;
  }

  getUser(userId: string): AngularFirestoreDocument<User> {
    return this.db.collection("user_roles").doc(userId);
  }

}
